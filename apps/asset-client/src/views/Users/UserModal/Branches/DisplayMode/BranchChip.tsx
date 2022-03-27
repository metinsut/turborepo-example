import { CatToggleCardChip, CatToggleCardChipProps } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectBranchById } from 'store/slices/branches';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = CatToggleCardChipProps & {
  className?: string;
  branchId: string;
};

function BranchChip(props: Props) {
  const classes = useStyles();
  const { className, branchId, ...rest } = props;

  const branch = useTypedSelector((state) => selectBranchById(state, branchId));
  return (
    <CatToggleCardChip
      className={clsx(classes.root, className)}
      text={branch?.name ?? ''}
      {...rest}
    />
  );
}

export default BranchChip;
