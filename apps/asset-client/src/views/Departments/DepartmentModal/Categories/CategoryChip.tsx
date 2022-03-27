import { CatToggleCardChip, CatToggleCardChipProps } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectMainCategoryById } from 'store/slices/session';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = CatToggleCardChipProps & {
  className?: string;
  categoryId: string;
};

function CategoryChip(props: Props) {
  const classes = useStyles();
  const { className, categoryId, ...rest } = props;

  const category = useTypedSelector((state) => selectMainCategoryById(state, categoryId));

  return (
    <CatToggleCardChip
      className={clsx(classes.root, className)}
      text={category?.name ?? ''}
      {...rest}
    />
  );
}

export default CategoryChip;
