import { CatPaperSelector, CatTooltip, CatTypography } from 'catamaran/core';
import { isArrayNullOrEmpty } from 'utils';
import {
  maxBreakdownCostNumber,
  selectBreakdownCostTypeById,
  selectBreakdownCostTypesByParentId
} from 'store/slices/taskConfiguration/breakdown/breakdownCosts';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks';
import CalculationIcon from 'catamaran/icons/Calculation';
import CostTypeItem from './CostTypeItem';
import InfoIcon from 'catamaran/icons/Info';
import NoItem from 'catamaran/icons/NoItem';
import React, { useState } from 'react';
import RemainingChip from 'components/RemainingChip';
import clsx from 'clsx';

type Props = {
  className?: string;
  loading?: boolean;
  mainCategoryId?: string;
  parentCostId?: string;
};

function CostGroup({ className, loading, mainCategoryId, parentCostId }: Props) {
  const { t } = useTranslation();
  const [addMode, setAddMode] = useState(false);

  const parentCost = useTypedSelector((state) => selectBreakdownCostTypeById(state, parentCostId));

  const breakdownCostTypes = useTypedSelector((state) =>
    selectBreakdownCostTypesByParentId(state, parentCostId)
  );

  const handleCostTypeAddClick = () => {
    setAddMode(true);
  };

  const availableCostCount = maxBreakdownCostNumber - breakdownCostTypes.length;
  return (
    <CatPaperSelector
      buttonText={
        parentCost
          ? t('task_configuration.breakdown.cost.selector_add_new_subCost', {
              parentName: parentCost.name
            })
          : t('task_configuration.breakdown.cost.selector_add_new_cost')
      }
      className={className}
      content={
        (!isArrayNullOrEmpty(breakdownCostTypes) || addMode) && (
          <>
            {breakdownCostTypes.map((costType) => (
              <CostTypeItem
                breakdownCostType={costType}
                key={costType.id}
                mainCategoryId={mainCategoryId}
              />
            ))}
            {addMode && (
              <CostTypeItem
                breakdownCostType={{ id: '', name: '', parentCostTypeId: parentCostId }}
                key=""
                mainCategoryId={mainCategoryId}
                onAddCompleted={() => setAddMode(false)}
              />
            )}
          </>
        )
      }
      emptyContent={
        <>
          <NoItem color="darkGrey" contained />
          <div>{t('task_configuration.breakdown.cost.no_type_description')}</div>
        </>
      }
      handleAddClick={handleCostTypeAddClick}
      hasTemporary={addMode}
      isAddDisabled={availableCostCount <= 0}
      key={parentCostId}
      loading={loading}
      title={
        <div className={clsx('w-full px16 align-items-center flex justify-content-between')}>
          <div className="flex align-items-center">
            <CalculationIcon fontSize="large" />
            <div className="ml8 flex align-items-start flex-auto-flow-column">
              <CatTypography className="three-dot" maxWidth={240} textAlign="center" variant="h2">
                {parentCost
                  ? t('task_configuration.breakdown.cost.selector_header_subCost', {
                      parentName: parentCost.name
                    })
                  : t('task_configuration.breakdown.cost.selector_header')}
              </CatTypography>
              <RemainingChip
                className="mt4"
                maxCount={maxBreakdownCostNumber}
                remainingCount={availableCostCount}
              />
            </div>
          </div>
          <CatTooltip arrow title={t('task_configuration.breakdown.cost.tooltip_info')}>
            <div>
              <InfoIcon className="cursor-pointer" color="darkGrey" contained />
            </div>
          </CatTooltip>
        </div>
      }
      titleHeight={64}
    />
  );
}

export default CostGroup;
