import { selectAsset } from 'store/slices/asset/detail/selectors';
import { selectPlanMainCategoryId } from 'store/slices/plans/selectors';
import { updateMainCategoryId } from 'store/slices/plans/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import MainCategorySelector from 'components/SingleSelector/MainCategorySelector';
import React, { useCallback, useEffect } from 'react';

type Props = {
  className?: string;
  associatedContractCategoryId: string;
  planId?: string;
};

function PlanMainCategorySelector(props: Props) {
  const { className, planId, associatedContractCategoryId, ...rest } = props;

  const dispatch = useTypedDispatch();
  const mainCategoryId = useTypedSelector(selectPlanMainCategoryId);
  const asset = useTypedSelector(selectAsset);

  const handleMainCategoryIdChanged = useCallback(
    (categoryId: string) => {
      dispatch(updateMainCategoryId(categoryId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (associatedContractCategoryId) {
      handleMainCategoryIdChanged(associatedContractCategoryId);
    }
  }, [associatedContractCategoryId, handleMainCategoryIdChanged]);

  return (
    <MainCategorySelector
      className={className}
      disabled={!!asset.id || !!planId || !!associatedContractCategoryId}
      fullWidth
      onMainCategoryIdChange={handleMainCategoryIdChanged}
      selectedMainCategoryId={mainCategoryId}
      {...rest}
    />
  );
}

export default PlanMainCategorySelector;
