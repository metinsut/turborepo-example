import { Box } from 'catamaran/core';
import { DisplayType } from 'utils';
import { SectionProps, SectionType } from './helpers';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import {
  getUserAssetAuthorization,
  updateUserAssetAuthorization
} from 'store/slices/users/details/actions';
import {
  revertUserDepartment,
  revertUserRole,
  setInitialDepartment,
  setInitialUserRole
} from 'store/slices/users/details/slice';
import { selectUser } from 'store/slices/users/details/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AssetManIcon from 'catamaran/icons/AssetMan';
import AssetRoles from './AssetRoles/AssetRoles';
import Departments from './Departments/Departments';
import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2)
  }
}));

type Props = {
  activeSection?: SectionType;
  className?: string;
  departmentVisible?: boolean;
  getSectionProps: (sectionType: SectionType) => SectionProps;
  mode: DisplayType;
  userId?: string;
};

function AssetSpecifications(props: Props) {
  const classes = useStyles();
  const { activeSection, className, departmentVisible, getSectionProps, mode, userId } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector(selectUser);

  const [authorizationLoading, authorizationLoadingDispatch] = useLoading();
  const isDisabled =
    activeSection !== 'role' && activeSection !== 'department' && activeSection !== '';

  useEffect(() => {
    if (userId) {
      authorizationLoadingDispatch(getUserAssetAuthorization(userId));
    }
  }, [authorizationLoadingDispatch, userId]);

  const handleConfirm = useCallback(async () => {
    if (activeSection === 'department') {
      if (mode === 'edit') {
        await dispatch(updateUserAssetAuthorization());
      } else {
        dispatch(setInitialUserRole());
        dispatch(setInitialDepartment());
      }
    } else if (activeSection === 'role' && user?.assetRole?.name === 'RequestOnly') {
      if (mode === 'edit') {
        await dispatch(updateUserAssetAuthorization());
      } else {
        dispatch(setInitialUserRole());
      }
    }
  }, [activeSection, dispatch, mode, user?.assetRole?.name]);

  const handleCancel = useCallback(() => {
    if (activeSection === 'role') {
      dispatch(revertUserRole());
      dispatch(revertUserDepartment());
    }
  }, [activeSection, dispatch]);

  return (
    <>
      <Box
        className={clsx(classes.root, className)}
        flex
        flexDirection="column"
        opacity={isDisabled ? 0.2 : 1}
      >
        <Box flex>
          <AssetManIcon contained={false} hoverable={false} opacity={0.8} />
          <Box flex flexDirection="column" ml={2}>
            <Typography variant="h2">{t('users.modal.asset_specifications_title')}</Typography>
          </Box>
        </Box>
      </Box>
      <AssetRoles
        activeSection={activeSection}
        loading={authorizationLoading}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        {...getSectionProps('role')}
      />
      {departmentVisible && (
        <Departments
          activeSection={activeSection}
          loading={authorizationLoading}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          {...getSectionProps('department')}
        />
      )}
    </>
  );
}

export default AssetSpecifications;
