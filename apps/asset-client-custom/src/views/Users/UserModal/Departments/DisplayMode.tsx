import { Box, CatButton } from 'catamaran/core';
import { SectionType } from '../helpers';
import { Skeleton, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import {
  selectDraftUserDepartments,
  selectInitialUserDepartments
} from 'store/slices/users/details/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DepartmentChip from './DepartmentChip';
import DisplayHeader from 'components/Sections/DisplayHeader';
import EditIcon from 'catamaran/icons/Edit';
import HomeIcon from 'catamaran/icons/Home';
import React, { useMemo } from 'react';

import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  activeSection?: SectionType;
  editVisible?: boolean;
  loading?: boolean;
  onEditClick?: () => void;
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { className, activeSection, editVisible = true, loading, onEditClick } = props;
  const { t } = useTranslation();

  const departmentIds = useTypedSelector(selectDraftUserDepartments);
  const initialDepartmentIds = useTypedSelector(selectInitialUserDepartments);

  const displayedDepartmentIds = useMemo(() => {
    if (activeSection === 'role') {
      return departmentIds;
    }

    return initialDepartmentIds;
  }, [activeSection, departmentIds, initialDepartmentIds]);

  return (
    <Box className={clsx(classes.root, className)}>
      <DisplayHeader
        headerIcon={<HomeIcon contained={false} hoverable={false} opacity={0.8} />}
        headerText={
          <Trans components={{ bold: <b /> }} i18nKey="users.modal.departments.title" t={t} />
        }
      />
      <Box ml={4}>
        <Box alignItems="center" flex flexWrap="wrap" my={2}>
          {loading && (
            <>
              <Skeleton height="24px" width="75px" />
              <Skeleton height="24px" style={{ marginLeft: '8px' }} width="75px" />
            </>
          )}
          {!loading &&
            displayedDepartmentIds.map((id) => (
              <Box key={id} mb={1} mr={1}>
                <DepartmentChip departmentId={id} />
              </Box>
            ))}
          <Box mb={1}>
            <Typography variant="caption">
              {t('users.modal.departments.department_selected', {
                count: initialDepartmentIds.length
              })}
            </Typography>
          </Box>
        </Box>
        {editVisible && (
          <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
            {t('common.edit')}
          </CatButton>
        )}
      </Box>
    </Box>
  );
}

export default DisplayMode;
