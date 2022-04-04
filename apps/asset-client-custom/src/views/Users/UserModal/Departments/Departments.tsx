import { Box } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { getDepartments } from 'store/slices/users/departments/actions';
import DisplayMode from './DisplayMode';
import EditMode from './EditMode';
import React, { useEffect } from 'react';

import { SectionType } from '../helpers';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  disabled: {
    opacity: 0.3,
    pointerEvents: 'none'
  },
  root: {
    margin: theme.spacing(2, 0, 0, 5)
  }
}));

type Props = {
  className?: string;
  activeSection: SectionType;
  disabled: boolean;
  editVisible: boolean;
  isActive: boolean;
  loading: boolean;
  mode: DisplayType;
  onActivate: (active: boolean, cancel: boolean) => void;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

function Departments(props: Props) {
  const classes = useStyles();
  const {
    className,
    activeSection,
    disabled,
    editVisible,
    isActive,
    mode,
    loading,
    onActivate,
    onCancel,
    onConfirm
  } = props;

  const handleGoBack = () => onActivate(false, true);
  const handleNext = () => onActivate(false, false);
  const handleEdit = () => onActivate(true, false);

  const [departmentsLoading, departmentsLoadingDispatch] = useLoading();
  useEffect(() => {
    departmentsLoadingDispatch(getDepartments());
  }, [departmentsLoadingDispatch]);

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
          loading={loading || departmentsLoading}
          mode={mode}
          onCancel={onCancel}
          onConfirm={onConfirm}
          onGoBack={handleGoBack}
          onNext={handleNext}
        />
      ) : (
        <DisplayMode
          activeSection={activeSection}
          editVisible={editVisible}
          loading={loading || departmentsLoading}
          onEditClick={handleEdit}
        />
      )}
    </Box>
  );
}

export default Departments;
