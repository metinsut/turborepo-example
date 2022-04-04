import { Box } from 'catamaran/core';
import { DisplayType, isArrayNullOrEmpty } from 'utils';
import { Skeleton, Theme, makeStyles } from 'catamaran/core/mui';
import {
  getUserBranchAuthorization,
  updateUserBranchAuthorization
} from 'store/slices/users/details/actions';
import { revertBranches, setInitialBranches } from 'store/slices/users/details/slice';
import { selectAllBranches } from 'store/slices/branches';
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
  userId?: string;
};

function Branches(props: Props) {
  const classes = useStyles();
  const { className, disabled, editVisible, isActive, mode, onActivate, userId } = props;

  const dispatch = useTypedDispatch();
  const [branchAuthorizationLoading, branchAuthorizationLoadingDispatch] = useLoading();
  const branches = useTypedSelector(selectAllBranches);

  const handleCancel = () => dispatch(revertBranches());
  const handleConfirm = useCallback(async () => {
    if (mode === 'edit') {
      await dispatch(updateUserBranchAuthorization());
    } else {
      dispatch(setInitialBranches());
    }
  }, [dispatch, mode]);

  const handleGoBack = () => onActivate(false, true);
  const handleNext = () => onActivate(false, false);
  const handleEdit = () => onActivate(true, false);

  useEffect(() => {
    const fetchAuthorization = async () => {
      if (userId) {
        await branchAuthorizationLoadingDispatch(getUserBranchAuthorization(userId));
      }
    };
    fetchAuthorization();
  }, [branchAuthorizationLoadingDispatch, userId]);

  let content = null;
  if (branchAuthorizationLoading || isArrayNullOrEmpty(branches)) {
    content = (
      <Box>
        <Box borderRadius="3px" mb={2}>
          <Skeleton height="24px" width="75px" />
        </Box>
        <Box borderRadius="3px" mb={2} ml={1}>
          <Skeleton height="24px" width="75px" />
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
        onNext={handleNext}
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

export default Branches;
