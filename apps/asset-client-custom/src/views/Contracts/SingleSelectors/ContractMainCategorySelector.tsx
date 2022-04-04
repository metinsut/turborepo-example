import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { selectContractMainCategoryId } from 'store/slices/contracts/selectors';
import { updateMainCategoryId } from 'store/slices/contracts/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import MainCategorySelector from 'components/SingleSelector/MainCategorySelector';
import React, { useCallback } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  contractId?: string;
};

function ContractMainCategorySelector(props: Props) {
  const classes = useStyles();
  const { className, contractId, ...rest } = props;

  const dispatch = useTypedDispatch();
  const mainCategoryId = useTypedSelector(selectContractMainCategoryId);
  const asset = useTypedSelector(selectAsset);

  const handleMainCategoryIdChanged = useCallback(
    (categoryId: string) => {
      dispatch(updateMainCategoryId(categoryId));
    },
    [dispatch]
  );

  return (
    <MainCategorySelector
      className={clsx(classes.root, className)}
      disabled={!!asset.id || !!contractId}
      fullWidth
      onMainCategoryIdChange={handleMainCategoryIdChanged}
      selectedMainCategoryId={mainCategoryId}
      {...rest}
    />
  );
}

export default ContractMainCategorySelector;
