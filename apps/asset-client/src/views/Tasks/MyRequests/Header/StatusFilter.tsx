import {
  CatCheckbox,
  CatMenu,
  CatMenuDivider,
  CatMenuItem,
  CatToggleButton,
  CatTypography
} from 'catamaran/core';
import { StatusGroup } from 'store/slices/tasks/common/type';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { compareSortedArray } from 'utils';
import {
  defaultState,
  selectStatusFilters,
  statusGroups,
  updateStatusFilters
} from 'store/slices/tasks/myRequests';
import { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import SmartOffIcon from 'catamaran/icons/SmartOff';
import SmartOnIcon from 'catamaran/icons/SmartOn';
import StatusBadgeIcon from 'catamaran/icons/StatusBadge';
import clsx from 'clsx';

const StatusFilter = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const selectedFilterItems = useTypedSelector(selectStatusFilters);
  const [localFilteredIds, setLocalFilteredIds] = useState<StatusGroup[]>(selectedFilterItems);

  useEffect(() => {
    setLocalFilteredIds(selectedFilterItems);
  }, [selectedFilterItems]);

  const handleClose = () => {
    dispatch(updateStatusFilters(localFilteredIds));
  };

  const handleSelect = (statusKey: StatusGroup) => {
    setLocalFilteredIds((prevState: StatusGroup[]) => {
      let newState: StatusGroup[] = [];
      const hasStatus = prevState.includes(statusKey);
      if (!hasStatus && prevState.length === 0) {
        newState = statusGroups.filter((status) => status !== statusKey);
        return newState;
      }
      if (hasStatus) {
        newState = prevState.filter((status: StatusGroup) => status !== statusKey);
        return newState;
      }
      return [...prevState, statusKey];
    });
  };

  const renderFilterButtonText = (value: StatusGroup[]) => {
    switch (value.length) {
      case 1:
        return t(`tasks.common.statusGroup.${value[0]}`);
      default: {
        const initialCase = compareSortedArray(defaultState.statusFilters, value);
        if (initialCase) {
          return t('tasks.common.filter.smart');
        }
        return t('tasks.common.filter.status_filtered_count', { count: value.length });
      }
    }
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

  const isInitialFilter = compareSortedArray(defaultState.statusFilters, localFilteredIds);

  const handleSelectAll = () => {
    if (!isInitialFilter) {
      setLocalFilteredIds(defaultState.statusFilters);
    }
  };

  const popupState = usePopupState({ popupId: 'myRequestStatusFilter', variant: 'popover' });

  return (
    <>
      <CatToggleButton
        {...bindTrigger(popupState)}
        color="darkGrey"
        icon={<StatusBadgeIcon />}
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
        {statusGroups.map((filter: StatusGroup) => {
          const checked = localFilteredIds.length === 0 || localFilteredIds.includes(filter);
          const disabled = localFilteredIds.length === 1 && localFilteredIds.includes(filter);
          return (
            <CatMenuItem disabled={disabled} key={filter} onClick={() => handleSelect(filter)}>
              <CatCheckbox checked={checked} id={filter} paddingSize="none" />
              <CatTypography
                className={clsx(checked ? 'font-bold' : '', 'three-dot')}
                variant="body2"
              >
                {t(`tasks.common.statusGroup.${filter}`)}
              </CatTypography>
            </CatMenuItem>
          );
        })}
      </CatMenu>
    </>
  );
};

export default StatusFilter;
