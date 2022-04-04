import {
  getBreakdownCostTypes,
  selectExpandedCostTypeIds
} from 'store/slices/taskConfiguration/breakdown/breakdownCosts';
import { useEffect } from 'react';
import { useTypedSelector } from 'hooks';
import CostGroup from './CostGroup';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = {
  className?: string;
  mainCategoryId: string;
};

function BreakdownCosts({ className, mainCategoryId }: Props) {
  const [breakdownCostTypesLoading, breakdownCostTypesLoadingDispatch] = useLoading();

  const expandedCostIds = useTypedSelector(selectExpandedCostTypeIds);

  useEffect(() => {
    if (mainCategoryId) {
      breakdownCostTypesLoadingDispatch(getBreakdownCostTypes(mainCategoryId));
    }
  }, [breakdownCostTypesLoadingDispatch, mainCategoryId]);

  return (
    <div className="flex">
      {expandedCostIds.map((parentId, index) => (
        <CostGroup
          className={clsx({ className, ml32: index > 0 })}
          key={parentId}
          loading={breakdownCostTypesLoading}
          mainCategoryId={mainCategoryId}
          parentCostId={parentId}
        />
      ))}
    </div>
  );
}

export default BreakdownCosts;
