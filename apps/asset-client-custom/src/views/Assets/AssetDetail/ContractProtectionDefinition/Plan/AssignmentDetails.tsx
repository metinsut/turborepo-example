import { Box, CatAvatarGroup, CatTypography } from 'catamaran/core';
import { Skeleton, Theme, makeStyles } from 'catamaran/core/mui';
import {
  getPersonById,
  getPersonsByIds,
  selectPersonById,
  selectPersonsByIds
} from 'store/slices/persons';
import { getPersonnelAssignment } from 'store/slices/plans/actions';
import { selectPersonnelAssignmentsOfPlan } from 'store/slices/plans/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import CancelIcon from 'catamaran/icons/Cancel';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import theme from 'catamaran/theme';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  customTitle: {
    opacity: 0.8
  },
  root: {}
}));

type Props = {
  className?: string;
  planId: string;
};

function AssignmentDetails(props: Props) {
  const classes = useStyles();
  const { className, planId } = props;
  const { t } = useTranslation();
  const [personLoading, personDispatch] = useLoading();

  useEffect(() => {
    personDispatch(getPersonnelAssignment(planId));
  }, [personDispatch, planId]);

  const personnelAssignment = useTypedSelector((state) =>
    selectPersonnelAssignmentsOfPlan(state, planId)
  );

  useEffect(() => {
    if (personnelAssignment?.responsiblePersonnelId) {
      personDispatch(getPersonById(personnelAssignment.responsiblePersonnelId));
    }

    if (
      personnelAssignment?.assistantPersonnelIds &&
      personnelAssignment.assistantPersonnelIds.length > 0
    ) {
      personDispatch(getPersonsByIds(personnelAssignment.assistantPersonnelIds));
    }
  }, [personDispatch, personnelAssignment]);

  const responsiblePerson = useTypedSelector((state) =>
    selectPersonById(state, personnelAssignment?.responsiblePersonnelId)
  );
  const assistantPersons = useTypedSelector((state) =>
    selectPersonsByIds(state, personnelAssignment?.assistantPersonnelIds)
  );

  const noAssignment = personLoading ? (
    <Skeleton height="100%" />
  ) : (
    <Box alignItems="center" flex>
      <CancelIcon fontSize="small" />
      <CatTypography variant="body2">{t('plans.edit.personnel_none')}</CatTypography>
    </Box>
  );

  return (
    <Box className={clsx(className, classes.root)} flex>
      <Box col flex>
        <CatTypography className={classes.customTitle} variant="caption">
          <b>{t('plans.edit.responsible_personnel_field')}</b>
        </CatTypography>
        <Box height={2} />
        {responsiblePerson ? (
          <Box alignItems="center" flex>
            <AvatarItem person={responsiblePerson} size="small" />
            <Box width={4} />
            <CatTypography style={{ opacity: 0.8 }} variant="body2">
              {`${responsiblePerson.firstName} ${responsiblePerson.lastName}`}
            </CatTypography>
          </Box>
        ) : (
          noAssignment
        )}
      </Box>
      <Box bg={theme.palette.darkGrey.main} flex mx={1} opacity={0.25} width="1px" />
      <Box col flex>
        <CatTypography className={classes.customTitle} variant="caption">
          <b>{t('plans.edit.assistant_personnel_field')}</b>
        </CatTypography>
        <Box height={2} />
        {assistantPersons && assistantPersons.length > 0 ? (
          <Box alignItems="center" flex>
            <CatAvatarGroup maxCount={4}>
              {assistantPersons.map((person) => (
                <AvatarItem key={person.id} person={person} size="small" />
              ))}
            </CatAvatarGroup>
            <Box width="4px" />
            <CatTypography style={{ opacity: 0.8 }} variant="body2">
              {assistantPersons.length === 1 ? (
                `${assistantPersons[0].firstName} ${assistantPersons[0].lastName}`
              ) : (
                <i>
                  {'<'}
                  {t('plans.edit.multi_person_display', { count: assistantPersons.length })}
                  {'>'}
                </i>
              )}
            </CatTypography>
          </Box>
        ) : (
          noAssignment
        )}
      </Box>
    </Box>
  );
}

export default AssignmentDetails;
