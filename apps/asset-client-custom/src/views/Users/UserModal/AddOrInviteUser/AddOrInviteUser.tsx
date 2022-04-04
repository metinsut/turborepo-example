import { Box } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { UserModalType } from '../helpers';
import { clearUserDetail } from 'store/slices/users/details/slice';
import { useTypedDispatch } from 'hooks';
import DisplayMode from './DisplayMode';
import EditMode from './EditMode';
import React from 'react';
import clsx from 'clsx';

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
  editDisabled: boolean;
  isActive: boolean;
  onActivate: (active: boolean, cancel: boolean) => void;
  onClose: () => void;
  onConfirm: () => void;
  userModalType: UserModalType;
};

function AddOrInviteUser(props: Props) {
  const classes = useStyles();
  const {
    className,
    disabled,
    editDisabled,
    isActive,
    onActivate,
    onClose,
    onConfirm,
    userModalType
  } = props;

  const dispatch = useTypedDispatch();

  const handleConfirm = () => {
    onConfirm();
    dispatch(clearUserDetail());
  };

  const handleGoBack = () => {
    if (userModalType === 'standardUser') {
      onActivate(false, true);
    } else {
      onClose();
    }
  };
  const handleNext = () => onActivate(false, false);
  const handleEdit = () => onActivate(true, false);

  return (
    <Box
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.disabled]: disabled
      })}
    >
      {isActive ? (
        <EditMode
          onConfirm={handleConfirm}
          onGoBack={handleGoBack}
          onNext={handleNext}
          userModalType={userModalType}
        />
      ) : (
        <DisplayMode editDisabled={editDisabled} onEditClick={handleEdit} />
      )}
    </Box>
  );
}

export default AddOrInviteUser;
