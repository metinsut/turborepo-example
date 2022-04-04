import { Box } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Skeleton, Theme, makeStyles } from 'catamaran/core/mui';
import { User } from 'store/slices/users/details/types';
import {
  getUserPersonalInformation,
  updateUserPersonalInformation
} from 'store/slices/users/details/actions';
import { revertUserPersonalInformation } from 'store/slices/users/details/slice';
import { selectInitialUserPersonalInformation } from 'store/slices/users/details/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
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
  onModalClose: () => void;
  userId?: string;
};

function PersonalInformation(props: Props) {
  const classes = useStyles();
  const { className, disabled, editVisible, isActive, mode, onActivate, onModalClose, userId } =
    props;

  const dispatch = useTypedDispatch();
  const [userLoading, userLoadingDispatch] = useLoading<User>();

  useEffect(() => {
    async function fetchPersonalInformation() {
      if (userId) {
        try {
          await userLoadingDispatch(getUserPersonalInformation(userId));
        } catch (error) {
          onModalClose();
        }
      }
    }

    fetchPersonalInformation();
  }, [onModalClose, userId, userLoadingDispatch]);

  const displayPersonalInformation = useTypedSelector(selectInitialUserPersonalInformation);
  const handleGoBack = () => onActivate(false, true);
  const handleNext = () => onActivate(false, false);
  const handleEdit = () => onActivate(true, false);

  const handleCancel = useCallback(() => {
    dispatch(revertUserPersonalInformation(displayPersonalInformation));
  }, [dispatch, displayPersonalInformation]);

  const handleConfirm = useCallback(async () => {
    await dispatch(updateUserPersonalInformation());
  }, [dispatch]);

  let componentContent = null;
  if (userLoading) {
    componentContent = (
      <Box>
        <Box borderRadius="3px" mb={1}>
          <Skeleton height="20px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="3px" mb={1}>
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
        mode={mode}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onGoBack={handleGoBack}
        onNext={handleNext}
      />
    );
  } else {
    componentContent = <DisplayMode editVisible={editVisible} onEditClick={handleEdit} />;
  }

  return (
    <Box
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.disabled]: disabled
      })}
    >
      {componentContent}
    </Box>
  );
}

export default PersonalInformation;
