import { CatPaperSelector, CatTooltip, CatTypography } from 'catamaran/core';
import {
  getBreakdownTypes,
  maxBreakdownTypeNumber,
  selectAllBreakdownTypeIds
} from 'store/slices/taskConfiguration/breakdown/breakdownTypes';
import { isArrayNullOrEmpty } from 'utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import InfoIcon from 'catamaran/icons/Info';
import NoItem from 'catamaran/icons/NoItem';
import RemainingChip from 'components/RemainingChip';
import TypeItem from './TypeItem';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = {
  className?: string;
  mainCategoryId: string;
};

function BreakdownTypes({ className, mainCategoryId }: Props) {
  const { t } = useTranslation();
  const [breakdownTypesLoading, breakdownTypesLoadingDispatch] = useLoading();
  const allIds = useTypedSelector(selectAllBreakdownTypeIds);

  const [addMode, setAddMode] = useState(false);

  useEffect(() => {
    if (mainCategoryId) {
      breakdownTypesLoadingDispatch(getBreakdownTypes(mainCategoryId));
    }
  }, [breakdownTypesLoadingDispatch, mainCategoryId]);

  const handleBreakdownTypeAddClick = () => {
    setAddMode(true);
  };

  const availableTypeCount = maxBreakdownTypeNumber - allIds.length;

  return (
    <div className="flex">
      <CatPaperSelector
        buttonText={t('task_configuration.breakdown.type.selector_add_new')}
        className={className}
        content={
          (!isArrayNullOrEmpty(allIds) || addMode) && (
            <>
              {allIds.map((id) => (
                <TypeItem id={id.toString()} key={id} mainCategoryId={mainCategoryId} />
              ))}
              {addMode && (
                <TypeItem
                  id=""
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
            <div>{t('task_configuration.breakdown.type.no_type_description')}</div>
          </>
        }
        handleAddClick={handleBreakdownTypeAddClick}
        hasTemporary={addMode}
        isAddDisabled={availableTypeCount <= 0}
        loading={breakdownTypesLoading}
        title={
          <div className={clsx('w-full px16 align-items-center flex justify-content-between')}>
            <div className="flex align-items-center">
              <BreakdownIcon fontSize="large" />
              <div className="ml8 flex align-items-start flex-auto-flow-column">
                <CatTypography className="three-dot" maxWidth={240} textAlign="center" variant="h2">
                  {t('task_configuration.breakdown.type.selector_header')}
                </CatTypography>
                <RemainingChip
                  className="mt4"
                  maxCount={maxBreakdownTypeNumber}
                  remainingCount={availableTypeCount}
                />
              </div>
            </div>
            <CatTooltip arrow title={t('task_configuration.breakdown.type.tooltip_info')}>
              <div>
                <InfoIcon className="cursor-pointer" color="darkGrey" contained />
              </div>
            </CatTooltip>
          </div>
        }
        titleHeight={64}
      />
    </div>
  );
}

export default BreakdownTypes;
