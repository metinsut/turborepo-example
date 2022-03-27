import { Theme, makeStyles } from 'catamaran/core/mui';

import { CatToggleCardChip, CatToggleCardChipProps } from 'catamaran/core';
import { selectDepartmentById } from 'store/slices/users/departments/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = CatToggleCardChipProps & {
  className?: string;
  departmentId: string;
};

function DepartmentChip(props: Props) {
  const classes = useStyles();
  const { className, departmentId, ...rest } = props;

  const department = useTypedSelector((state) => selectDepartmentById(state, departmentId));

  return (
    <CatToggleCardChip
      className={clsx(classes.root, className)}
      text={department?.name ?? ''}
      {...rest}
    />
  );
}

export default DepartmentChip;
