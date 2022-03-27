import { Box } from 'catamaran/core';
import { Department } from 'store/slices/users/departments/types';
import { DisplayType } from 'utils';
import { Theme, makeStyles } from 'catamaran/core/mui';
import {
  revertDepartmentCategories,
  setInitialDepartmentCategories
} from 'store/slices/users/departments/slice';
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
  root: {}
}));

type Props = {
  className?: string;
  department: Department;
  disabled: boolean;
  initialDepartment: Department;
  isActive: boolean;
  onActivate: (active: boolean, cancel: boolean) => void;
  onDepartmentChanged: () => void;
  touched: boolean;
};

function WorkTypes(props: Props) {
  const classes = useStyles();
  const {
    className,
    department,
    disabled,
    isActive,
    initialDepartment,
    onActivate,
    onDepartmentChanged,
    touched
  } = props;

  const dispatch = useTypedDispatch();

  const handleConfirm = () => {
    dispatch(setInitialDepartmentCategories());
    onDepartmentChanged();
  };

  const handleCancel = () => {
    dispatch(revertDepartmentCategories());
  };

  const handleGoBack = () => onActivate(false, true);
  const handleNext = () => onActivate(false, false);
  const handleEdit = () => onActivate(true, false);

  const workTypeExists = initialDepartment.mainCategories.some((i) => i.workTypes.length > 0);
  const sectionMode: DisplayType = workTypeExists ? 'edit' : 'add';

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
          department={department}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onGoBack={handleGoBack}
          onNext={handleNext}
          sectionMode={sectionMode}
          touched={touched}
        />
      ) : (
        <DisplayMode
          displayDepartment={initialDepartment}
          onEditClick={handleEdit}
          sectionMode={sectionMode}
        />
      )}
    </Box>
  );
}

export default WorkTypes;
