import { Theme, makeStyles } from 'catamaran/core/mui';
import {
  selectSelectedMainCategoryId,
  updateSelectedMainCategory
} from 'store/slices/contractplans/wizard/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import MainCategorySelector from 'components/SingleSelector/MainCategorySelector';
import React, { useCallback } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

function WizardMainCategorySelector(props: Props) {
  const classes = useStyles();
  const { className, ...rest } = props;

  const dispatch = useTypedDispatch();
  const mainCategoryId = useTypedSelector(selectSelectedMainCategoryId);

  const handleMainCategoryIdChanged = useCallback(
    (categoryId: string) => {
      dispatch(updateSelectedMainCategory(categoryId));
    },
    [dispatch]
  );

  return (
    <MainCategorySelector
      className={clsx(classes.root, className)}
      fullWidth
      onMainCategoryIdChange={handleMainCategoryIdChanged}
      selectedMainCategoryId={mainCategoryId}
      {...rest}
    />
  );
}

export default WizardMainCategorySelector;
