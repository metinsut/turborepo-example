import { Box } from 'catamaran/core';
import { Department } from 'store/slices/users/departments/types';
import { DisplayType } from 'utils';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { setDepartmentBasicInfo } from 'store/slices/users/departments/slice';
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
};

function BasicInformation(props: Props) {
  const classes = useStyles();
  const {
    className,
    department,
    disabled,
    isActive,
    initialDepartment,
    onActivate,
    onDepartmentChanged
  } = props;

  const dispatch = useTypedDispatch();

  const handleConfirm = (name: string, notes: string) => {
    dispatch(setDepartmentBasicInfo({ name, notes }));
    onDepartmentChanged();
  };

  const handleGoBack = () => onActivate(false, true);
  const handleNext = () => onActivate(false, false);
  const handleEdit = () => onActivate(true, false);

  const sectionMode: DisplayType = !initialDepartment.name ? 'add' : 'edit';

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
          onConfirm={handleConfirm}
          onGoBack={handleGoBack}
          onNext={handleNext}
          sectionMode={sectionMode}
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

export default BasicInformation;
