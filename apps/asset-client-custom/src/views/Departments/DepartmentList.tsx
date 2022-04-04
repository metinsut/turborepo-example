import { Box, CatAreaButton } from 'catamaran/core';
import { Department } from 'store/slices/users/departments/types';
import { Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useDialogState } from 'hooks';
import { useTranslation } from 'react-i18next';
import AssetManIcon from 'catamaran/icons/AssetMan';
import DepartmentCard from './DepartmentCard/DepartmentCard';
import DepartmentCardSkeleton from './DepartmentCard/DepartmentCardSkeleton';
import DepartmentPageModal from './DepartmentModal/DepartmentPageModal';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3)
  },
  skeleton: {
    margin: theme.spacing(0, 2, 2, 0)
  }
}));

type Props = {
  className?: string;
  departments?: Department[];
  loading?: boolean;
};

function DepartmentList(props: Props) {
  const classes = useStyles();
  const { className, departments, loading } = props;

  const { t } = useTranslation();
  const { isOpen, togglePopup } = useDialogState();

  const handleAddConfirm = React.useCallback(async () => {
    togglePopup();
  }, [togglePopup]);

  return (
    <>
      <Box className={clsx(classes.root, className)} component={Paper}>
        <Box alignItems="flex-start" flex mb={3}>
          <AssetManIcon color="darkGrey" contained={false} hoverable={false} />
          <Box flexDirection="row" ml={1}>
            <Box mb={1}>
              <Typography style={{ opacity: 0.8 }} variant="h2">
                {t('users.departments.department_list.asset_management_departments_title')}
              </Typography>
            </Box>
            <Box>
              <Typography style={{ opacity: 0.6 }} variant="body1">
                {t('users.departments.department_list.asset_management_departments_title')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <div
            className="grid gap-16"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 220px))' }}
          >
            {loading ? (
              <>
                <DepartmentCardSkeleton className={classes.skeleton} />
                <DepartmentCardSkeleton className={classes.skeleton} />
              </>
            ) : (
              <>
                {departments.map((department) => (
                  <DepartmentCard
                    departmentId={department.id}
                    disabled={department.autoAdded}
                    editable={!department.autoAdded}
                    key={department.id}
                  />
                ))}
                <CatAreaButton
                  loading={loading}
                  onClick={() => togglePopup(true)}
                  style={{ height: 272 }}
                >
                  {t('users.departments.department_add')}
                </CatAreaButton>
              </>
            )}
          </div>
        </Box>
      </Box>
      <DepartmentPageModal
        onClose={() => togglePopup()}
        onConfirm={handleAddConfirm}
        open={isOpen}
      />
    </>
  );
}

export default DepartmentList;
