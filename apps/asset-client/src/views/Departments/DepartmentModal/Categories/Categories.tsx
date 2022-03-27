import { Box, Theme, makeStyles } from 'catamaran/core/mui';
import { Department } from 'store/slices/users/departments/types';
import { isArrayNullOrEmpty } from 'utils';
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
  onActivate: (active: boolean, cancel: boolean, close?: boolean) => void;
  onDepartmentChanged: () => void;
  touched: boolean;
};

function Categories(props: Props) {
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

  const categoryExists = isArrayNullOrEmpty(initialDepartment.mainCategories);

  const handleGoBack = () => onActivate(false, true, categoryExists);
  const handleNext = () => onActivate(false, false);
  const handleEdit = () => onActivate(true, false);

  const sectionMode = categoryExists ? 'add' : 'edit';

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
        <DisplayMode displayDepartment={initialDepartment} onEditClick={handleEdit} />
      )}
    </Box>
  );
}

export default Categories;
