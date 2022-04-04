import { Box } from 'catamaran/core';
import { Grid, Skeleton, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Person, getPersonsByIds } from 'store/slices/persons';
import { PersonnelAssignment } from 'store/slices/plans/types';
import { getPersonnelAssignment, savePersonnelAssignments } from 'store/slices/plans/actions';
import { isObjectNullOrEmpty } from 'utils/index';
import {
  selectInitialPersonnelAssignments,
  selectPersonnelAssignments,
  selectPlanDraft
} from 'store/slices/plans/selectors';
import { updatePersonnelAssignment } from 'store/slices/plans/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import EditMode from './Edit/EditMode';
import PersonIcon from 'catamaran/icons/Person';
import React, { useCallback, useEffect } from 'react';
import ReadonlyMode from './Readonly/ReadonlyMode';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  disabled: {
    opacity: 0.3,
    pointerEvents: 'none'
  },
  root: {
    padding: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  planId?: string;
  disabled: boolean;
  isActive: boolean;
  onActivate: (active: boolean) => void;
};

function PersonnelAssignments(props: Props) {
  const classes = useStyles();
  const { className, disabled, planId, isActive, onActivate } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [personnelAssignmentLoading, personnelAssignmentLoadingDispatch] =
    useLoading<PersonnelAssignment>();
  const [personnelsLoading, personnelsLoadingDispatch] = useLoading<Person[]>();

  const readonlyPersonnelAssignment = useTypedSelector(selectInitialPersonnelAssignments);
  const editPersonnelAssignment = useTypedSelector(selectPersonnelAssignments);

  const mode = isObjectNullOrEmpty(readonlyPersonnelAssignment.responsiblePersonnelId)
    ? 'add'
    : 'edit';
  const plan = useTypedSelector(selectPlanDraft);
  const planTypeResource = t(`plans.types.${plan.type}`);

  useEffect(() => {
    if (planId) {
      personnelAssignmentLoadingDispatch(getPersonnelAssignment(planId, true));
    }
  }, [personnelAssignmentLoadingDispatch, planId]);

  useEffect(() => {
    if (readonlyPersonnelAssignment) {
      const personnelIds = readonlyPersonnelAssignment.responsiblePersonnelId
        ? [readonlyPersonnelAssignment.responsiblePersonnelId]
        : [];
      if (readonlyPersonnelAssignment.assistantPersonnelIds) {
        personnelIds.push(...readonlyPersonnelAssignment.assistantPersonnelIds);
      }
      personnelsLoadingDispatch(getPersonsByIds(personnelIds));
    }
  }, [personnelsLoadingDispatch, readonlyPersonnelAssignment]);

  const handleEdit = () => onActivate(true);
  const handleGoBack = () => {
    onActivate(false);
  };

  const handleCancel = useCallback(() => {
    dispatch(updatePersonnelAssignment(readonlyPersonnelAssignment));
  }, [dispatch, readonlyPersonnelAssignment]);

  const handleSave = useCallback(
    async (assignment: PersonnelAssignment) => {
      const finalAssignment = await dispatch(savePersonnelAssignments(planId, assignment));
      return finalAssignment;
    },
    [dispatch, planId]
  );

  let componentContent = null;
  if (personnelAssignmentLoading || personnelsLoading) {
    componentContent = (
      <Box>
        <Box borderRadius="3px" mb={2}>
          <Skeleton height="20px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="3px" mb={2}>
          <Skeleton height="20px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="8px">
          <Skeleton height="20px" variant="rectangular" width="120px" />
        </Box>
      </Box>
    );
  } else if (isActive) {
    componentContent = (
      <EditMode
        editPersonnelAssignment={editPersonnelAssignment}
        initialPersonnelAssignment={readonlyPersonnelAssignment}
        mode={mode}
        onCancel={handleCancel}
        onGoBack={handleGoBack}
        onSave={handleSave}
      />
    );
  } else {
    componentContent = (
      <ReadonlyMode
        mode={mode}
        onEditClick={handleEdit}
        personnelAssignment={readonlyPersonnelAssignment}
      />
    );
  }

  return (
    <Grid
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.disabled]: disabled
      })}
      container
      direction="row"
    >
      <Grid alignItems="center" container direction="row">
        <PersonIcon
          color="darkGrey"
          contained={false}
          hoverable={false}
          style={{ marginLeft: '8px', opacity: '80%' }}
        />
        <Grid item>
          <Box ml={2}>
            <Typography className="opacity-8" variant="subtitle1">
              {t('plans.edit.assignment_person_field', { planType: planTypeResource })}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box ml={5} width="100%">
        {componentContent}
      </Box>
    </Grid>
  );
}

export default PersonnelAssignments;
