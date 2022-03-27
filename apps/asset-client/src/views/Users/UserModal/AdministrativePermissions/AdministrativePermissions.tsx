import { Box } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Skeleton, Theme, makeStyles } from 'catamaran/core/mui';
import {
  getUserAdditionalPermissions,
  updateUserAdditionalPermissions
} from 'store/slices/users/details/actions';
import {
  revertAdditionalPermissions,
  setInitialAdditionalPermissions
} from 'store/slices/users/details/slice';
import { useTypedDispatch } from 'hooks';
import DisplayMode from './DisplayMode/DisplayMode';
import EditMode from './EditMode/EditMode';
import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  disabled: {
    opacity: 0.3,
    pointerEvents: 'none'
  },
  root: {
    marginTop: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  disabled: boolean;
  editVisible: boolean;
  isActive: boolean;
  mode: DisplayType;
  onActivate: (active: boolean, cancel: boolean) => void;
  userId?: string;
};

function AdministrativePermissions(props: Props) {
  const classes = useStyles();
  const { className, disabled, editVisible, isActive, mode, onActivate, userId } = props;

  const dispatch = useTypedDispatch();
  const [permissionLoading, permissionLoadingDispatch] = useLoading();

  const handleConfirm = useCallback(async () => {
    if (mode === 'edit') {
      await dispatch(updateUserAdditionalPermissions());
    } else {
      dispatch(setInitialAdditionalPermissions());
    }
  }, [dispatch, mode]);

  const handleCancel = () => dispatch(revertAdditionalPermissions());

  const handleGoBack = () => onActivate(false, true);
  const handleEdit = () => onActivate(true, false);

  useEffect(() => {
    const fetchAuthorization = async () => {
      if (userId) {
        await permissionLoadingDispatch(getUserAdditionalPermissions(userId));
      }
    };
    fetchAuthorization();
  }, [permissionLoadingDispatch, userId]);

  let content = null;
  if (permissionLoading) {
    content = (
      <Box>
        <Box borderRadius="3px" mb={2}>
          <Skeleton height="28px" variant="rectangular" width="120px" />
        </Box>
      </Box>
    );
  } else if (isActive) {
    content = (
      <EditMode
        mode={mode}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onGoBack={handleGoBack}
      />
    );
  } else {
    content = <DisplayMode editVisible={editVisible} onEditClick={handleEdit} />;
  }

  return (
    <Box
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.disabled]: disabled
      })}
    >
      {content}
    </Box>
  );
}

export default AdministrativePermissions;
