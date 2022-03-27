import {
  CatCheckbox,
  CatMenu,
  CatMenuDivider,
  CatMenuItem,
  CatToggleButton,
  CatTypography
} from 'catamaran/core';
import { Priority } from 'store/slices/breakdown/common/types';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { compareSortedArray } from 'utils';
import {
  defaultTaskListFilter,
  priorityKeys,
  selectPriority,
  updatePriority
} from 'store/slices/tasks/taskList/taskListFilter';
import { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ExclamationIcon from 'catamaran/icons/Exclamation';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import SmartOffIcon from 'catamaran/icons/SmartOff';
import SmartOnIcon from 'catamaran/icons/SmartOn';
import clsx from 'clsx';

const PriorityFilter = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const selectedFilterItems = useTypedSelector(selectPriority);
  const [localFilteredIds, setLocalFilteredIds] = useState<Priority[]>(selectedFilterItems);

  useEffect(() => {
    setLocalFilteredIds(selectedFilterItems);
  }, [selectedFilterItems]);

  const handleClose = () => {
    dispatch(updatePriority(localFilteredIds));
  };

  const handleSelect = (priority: Priority) => {
    setLocalFilteredIds((prevState: Priority[]) => {
      let newState: Priority[] = [];
      const hasStatus = prevState.includes(priority);
      if (!hasStatus && prevState.length === 0) {
        newState = priorityKeys.filter((priorityKey) => priorityKey !== priority);
        return newState;
      }
      if (hasStatus) {
        newState = prevState.filter((priorityKey: Priority) => priorityKey !== priority);
        return newState;
      }
      return [...prevState, priority];
    });
  };

  const renderFilterButtonText = (priorities: Priority[]) => {
    if (priorities.length === 1) {
      return t(`tasks.common.priorities.${priorities[0]}`);
    }
    const initialCase = compareSortedArray(defaultTaskListFilter.priorities, priorities);
    if (initialCase) {
      return t('tasks.common.filter.smart');
    }
    return t('tasks.common.filter.priority_filtered_count', { count: priorities.length });
  };

  const renderAllSelectButtonText = (isInitialFilter: boolean) => {
    switch (isInitialFilter) {
      case true:
        return (
          <span className="flex gap-4">
            <Trans i18nKey="tasks.common.filter.smart_is_on" />
          </span>
        );
      default:
        return t('tasks.common.filter.reset_filter');
    }
  };

  const isInitialFilter = compareSortedArray(defaultTaskListFilter.priorities, localFilteredIds);

  const handleSelectAll = () => {
    if (!isInitialFilter) {
      setLocalFilteredIds(defaultTaskListFilter.priorities);
    }
  };

  const popupState = usePopupState({ popupId: 'listPriorityFilter', variant: 'popover' });

  return (
    <>
      <CatToggleButton
        {...bindTrigger(popupState)}
        color="darkGrey"
        icon={<ExclamationIcon />}
        keepIconColor
        reverse
        title={renderFilterButtonText(localFilteredIds)}
      />
      <CatMenu
        {...bindMenu(popupState)}
        addEmptyFirstItem
        onClose={() => {
          bindMenu(popupState).onClose();
          handleClose();
        }}
        width="292px"
      >
        <CatTypography className="mx16" variant="body1">
          <Trans i18nKey="tasks.common.filter.priority_filter" t={t} />
        </CatTypography>
        <div className="mx8 mt16">
          <CatToggleButton
            className="radius-24"
            color={isInitialFilter ? 'grey' : 'red'}
            disabled={isInitialFilter}
            icon={
              isInitialFilter ? <SmartOffIcon fontSize="small" /> : <SmartOnIcon fontSize="small" />
            }
            keepIconColor
            onClick={handleSelectAll}
            reverse
            size="large"
            title={
              <span className="flex w-full align-items-center justify-content-between">
                {renderAllSelectButtonText(isInitialFilter)}
                <InfoCautionIcon color="darkGrey" hoverable={false} />
              </span>
            }
          />
        </div>
        <CatMenuDivider />
        {priorityKeys.map((priority: Priority) => {
          const checked = localFilteredIds.length === 0 || localFilteredIds.includes(priority);
          const disabled = localFilteredIds.length === 1 && localFilteredIds.includes(priority);
          return (
            <CatMenuItem disabled={disabled} key={priority} onClick={() => handleSelect(priority)}>
              <CatCheckbox checked={checked} id={priority} paddingSize="none" />
              <CatTypography
                className={clsx(checked ? 'font-bold' : '', 'three-dot')}
                variant="body2"
              >
                {t(`tasks.common.priorities.${priority}`)}
              </CatTypography>
            </CatMenuItem>
          );
        })}
      </CatMenu>
    </>
  );
};

export default PriorityFilter;
