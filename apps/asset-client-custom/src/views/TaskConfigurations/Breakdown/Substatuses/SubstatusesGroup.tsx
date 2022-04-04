import { CatPaperSelector, CatTypography } from 'catamaran/core';
import {
  Status,
  maxBreakdownSubstatusNumber
} from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import { isArrayNullOrEmpty } from 'utils';
import { useTranslation } from 'react-i18next';
import NoItem from 'catamaran/icons/NoItem';
import React, { useState } from 'react';
import RemainingChip from 'components/RemainingChip';
import SubstatusHeaderIcon from './HeaderIcon';
import SubstatusItem from './SubstatusItem';
import clsx from 'clsx';

type Props = {
  className?: string;
  loading: boolean;
  mainCategoryId: string;
  status: Status;
};

function SubstatusesGroup(props: Props) {
  const { className, loading, mainCategoryId, status } = props;
  const { t } = useTranslation();
  const [addMode, setAddMode] = useState(false);

  const handleSubstatusAddClick = () => {
    setAddMode(true);
  };

  if (!status) {
    return null;
  }

  const availableSubstatusCount = maxBreakdownSubstatusNumber - status.substatuses.length;

  return (
    <CatPaperSelector
      buttonText={t('task_configuration.breakdown.substatuses.selector_add_new')}
      className={className}
      content={
        (!isArrayNullOrEmpty(status?.substatuses) || addMode) && (
          <>
            {status.substatuses.map((substatus) => (
              <SubstatusItem
                key={substatus.id}
                mainCategoryId={mainCategoryId}
                statusId={status.id}
                substatus={substatus}
              />
            ))}
            {addMode && (
              <SubstatusItem
                key="new_item"
                mainCategoryId={mainCategoryId}
                onAddCompleted={() => setAddMode(false)}
                statusId={status.id}
                substatus={{ id: '', name: '' }}
              />
            )}
          </>
        )
      }
      emptyContent={
        <>
          <NoItem color="darkGrey" contained />
          <div>{t('task_configuration.breakdown.substatuses.no_type_description')}</div>
        </>
      }
      handleAddClick={handleSubstatusAddClick}
      hasTemporary={addMode}
      isAddDisabled={availableSubstatusCount <= 0}
      key={status.key}
      loading={loading}
      title={
        <div className={clsx('w-full px16 align-items-center flex justify-content-start')}>
          <SubstatusHeaderIcon statusKey={status.key} />
          <div className="ml8 flex align-items-start flex-auto-flow-column">
            <CatTypography className="three-dot" maxWidth={240} textAlign="center" variant="h2">
              {t(`task_configuration.breakdown.substatuses.titles.${status.key}`)}
            </CatTypography>
            <RemainingChip
              className="mt4"
              maxCount={maxBreakdownSubstatusNumber}
              remainingCount={availableSubstatusCount}
            />
          </div>
        </div>
      }
      titleHeight={64}
    />
  );
}

export default SubstatusesGroup;
