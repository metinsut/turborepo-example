import {
  CatCheckbox,
  CatMenu,
  CatMenuDivider,
  CatMenuItem,
  CatToggleButton,
  CatTypography
} from 'catamaran/core';
import { StatusKeys } from 'store/slices/tasks/common/type';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { compareSortedArray } from 'utils';
import {
  defaultTaskListFilter,
  selectStatus,
  statusKeys,
  updateStatues
} from 'store/slices/tasks/taskList/taskListFilter';
import { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import SmartOffIcon from 'catamaran/icons/SmartOff';
import SmartOnIcon from 'catamaran/icons/SmartOn';
import StatusBadgeIcon from 'catamaran/icons/StatusBadge';
import StatusIcon from 'views/Tasks/Breakdowns/Common/StatusIcon';
import clsx from 'clsx';

const StatusFilter = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const selectedFilterItems = useTypedSelector(selectStatus);
  const [localFilteredIds, setLocalFilteredIds] = useState<StatusKeys[]>(selectedFilterItems);

  useEffect(() => {
    setLocalFilteredIds(selectedFilterItems);
  }, [selectedFilterItems]);

  const handleClose = () => {
    dispatch(updateStatues(localFilteredIds));
  };

  const handleSelect = (statusKey: StatusKeys) => {
    setLocalFilteredIds((prevState: StatusKeys[]) => {
      let newState: StatusKeys[] = [];
      const hasStatus = prevState.includes(statusKey);
      if (!hasStatus && prevState.length === 0) {
        newState = statusKeys.filter((status) => status !== statusKey);
        return newState;
      }
      if (hasStatus) {
        newState = prevState.filter((status: StatusKeys) => status !== statusKey);
        return newState;
      }
      return [...prevState, statusKey];
    });
  };

  const renderFilterButtonText = (statuses: StatusKeys[]) => {
    const initialCase = compareSortedArray(defaultTaskListFilter.statuses, statuses);
    if (initialCase) {
      return t('tasks.common.filter.smart');
    }
    return null;
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

  const isInitialFilter = compareSortedArray(defaultTaskListFilter.statuses, localFilteredIds);

  const handleSelectAll = () => {
    if (!isInitialFilter) {
      setLocalFilteredIds(defaultTaskListFilter.statuses);
    }
  };

  const renderIcons = (statuses: StatusKeys[]) => {
    if (isInitialFilter) {
      return <StatusBadgeIcon />;
    }
    return statuses.map((status) => <StatusIcon key={status} statusType={status} />);
  };

  const popupState = usePopupState({ popupId: 'listStatusFilter', variant: 'popover' });

  return (
    <>
      <CatToggleButton
        {...bindTrigger(popupState)}
        color="darkGrey"
        icon={renderIcons(localFilteredIds)}
        keepIconColor
        reverse
        selected={!isInitialFilter}
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
          <Trans i18nKey="tasks.common.filter.status_filter" t={t} />
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
        {statusKeys.map((filter: StatusKeys) => {
          const checked = localFilteredIds.length === 0 || localFilteredIds.includes(filter);
          const disabled = localFilteredIds.length === 1 && localFilteredIds.includes(filter);
          return (
            <CatMenuItem disabled={disabled} key={filter} onClick={() => handleSelect(filter)}>
              <CatCheckbox checked={checked} id={filter} paddingSize="none" />
              <CatTypography
                className={clsx(checked ? 'font-bold' : '', 'three-dot')}
                variant="body2"
              >
                {t(`tasks.common.statuses.${filter}`)}
              </CatTypography>
            </CatMenuItem>
          );
        })}
      </CatMenu>
    </>
  );
};

export default StatusFilter;
