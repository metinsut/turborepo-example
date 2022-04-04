import { Box, CatTypography } from 'catamaran/core';
import { Grid, Skeleton, Theme, makeStyles } from 'catamaran/core/mui';
import { Plan } from 'store/slices/plans/types';
import {
  createPlanBasicInformation,
  getPlanBasicInformation,
  updatePlanBasicInformation
} from 'store/slices/plans/actions';
import { selectInitialPlan, selectPlanDraft } from 'store/slices/plans/selectors';
import { setPlanForm } from 'store/slices/plans/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import EditMode from './Edit/EditMode';
import React, { useCallback, useEffect } from 'react';
import ReadonlyMode from './Readonly/ReadonlyMode';
import TitleIcon from 'catamaran/icons/Title';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  disabled: {
    opacity: 0.3,
    pointerEvents: 'none'
  },
  root: {
    padding: theme.spacing(2, 3, 2, 2)
  }
}));

type Props = {
  className?: string;
  planId?: string;
  disabled: boolean;
  isActive: boolean;
  onActivate: (active: boolean) => void;
};

function BasicPlanInformation(props: Props) {
  const classes = useStyles();
  const { className, disabled, planId, isActive, onActivate } = props;

  const editPlan = useTypedSelector(selectPlanDraft);
  const displayPlan = useTypedSelector(selectInitialPlan);
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [planLoading, planLoadingDispatch] = useLoading<Plan>();

  useEffect(() => {
    if (planId) {
      planLoadingDispatch(getPlanBasicInformation(planId));
    }
  }, [planId, planLoadingDispatch]);

  const handleCancel = useCallback(() => {
    dispatch(setPlanForm(displayPlan));
  }, [dispatch, displayPlan]);

  const handleSave = useCallback(async () => {
    if (planId) {
      await dispatch(updatePlanBasicInformation());
    } else {
      await dispatch(createPlanBasicInformation());
    }
  }, [planId, dispatch]);

  const handleEdit = () => onActivate(true);
  const handleGoBack = () => onActivate(false);

  let componentContent = null;
  if (planLoading) {
    componentContent = (
      <Box>
        <Box borderRadius="6px" mb={1}>
          <Skeleton height="24px" variant="rectangular" width="400px" />
        </Box>
        <Box alignItems="center" flex mb={2} ml={-5}>
          <TitleIcon
            color="darkGrey"
            contained={false}
            hoverable={false}
            style={{ opacity: '80%' }}
          />
          <Box ml={2}>
            <CatTypography variant="subtitle1">
              {t('plans.edit.basic_information_header')}
            </CatTypography>
          </Box>
        </Box>
        <Box borderRadius="6px" mb={2}>
          <Skeleton height="24px" variant="rectangular" width="300px" />
        </Box>
        <Box borderRadius="6px" mb={2}>
          <Skeleton height="24px" variant="rectangular" width="300px" />
        </Box>
        <Box borderRadius="6px" mb={2}>
          <Skeleton height="24px" variant="rectangular" width="300px" />
        </Box>
        <Box borderRadius="8px">
          <Skeleton height="24px" variant="rectangular" width="120px" />
        </Box>
      </Box>
    );
  } else if (isActive) {
    componentContent = (
      <EditMode
        editPlan={editPlan}
        onCancel={handleCancel}
        onGoBack={handleGoBack}
        onSave={handleSave}
      />
    );
  } else {
    componentContent = <ReadonlyMode onEditClick={handleEdit} plan={displayPlan} />;
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
      <Box ml={5} width="100%">
        {componentContent}
      </Box>
    </Grid>
  );
}

export default BasicPlanInformation;
