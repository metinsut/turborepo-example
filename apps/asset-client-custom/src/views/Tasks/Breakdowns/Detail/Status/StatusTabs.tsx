import {
  CatMenu,
  CatMenuDivider,
  CatMenuItem,
  CatTab,
  CatTabs,
  CatTypography
} from 'catamaran/core';
import { Colors } from 'catamaran/colors/colorMap';
import { StatusKeys } from 'store/slices/tasks/common/type';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { getStatusIconComponent } from 'views/Tasks/Breakdowns/Common/StatusIcon';
import { isArrayNullOrEmpty } from 'utils';
import { selectAllBreakdownStatuses } from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import { updateTaskStatus } from 'store/slices/breakdown/taskDetail/action';
import { useLoading, useTypedSelector } from 'hooks';
import LoadingIcon from 'catamaran/icons/Loading';
import React, { useState } from 'react';

type Props = {
  status: StatusKeys;
};

const keyColorPairs: Partial<Record<StatusKeys, Colors>> = {
  closed: 'darkGrey',
  inProgress: 'green',
  open: 'blue',
  paused: 'orange'
};

function StatusTabs({ status }: Props) {
  const { t } = useTranslation();
  const statuses = useTypedSelector(selectAllBreakdownStatuses);
  const [updateLoading, updateLoadingDispatch] = useLoading();

  const [selectedTaskStatus, setSelectedTaskStatus] = useState<StatusKeys>(undefined);

  const popupState = usePopupState({ popupId: 'taskDetailStatusTabs', variant: 'popover' });

  const handleTabClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: number) => {
    const statusInfo = statuses[value];
    const { substatuses: taskSubStatuses } = statusInfo;
    setSelectedTaskStatus(statusInfo.key);
    if (!isArrayNullOrEmpty(taskSubStatuses) && taskSubStatuses.length > 1) {
      popupState.open(e.currentTarget);
      e.preventDefault();
    } else {
      const substatus = isArrayNullOrEmpty(taskSubStatuses) ? undefined : taskSubStatuses[0];
      await updateLoadingDispatch(updateTaskStatus(statusInfo.key, substatus));
    }
  };

  const handlePopoverClose = () => {
    popupState.close();
  };

  const handleSubstatusItemClick = async (substatusId: string) => {
    const statusInfo = statuses.find((i) => i.key === selectedTaskStatus);
    const substatus = statusInfo.substatuses.find((i) => i.id === substatusId);

    await updateLoadingDispatch(updateTaskStatus(selectedTaskStatus, substatus));
    handlePopoverClose();
  };

  const getStatusTabIcon = (key: StatusKeys) => {
    if (status === key) {
      return null;
    }
    if (updateLoading && selectedTaskStatus === key) {
      return <LoadingIcon fontSize="small" />;
    }
    const StatusIcon = getStatusIconComponent(key);
    return <StatusIcon fontSize="small" />;
  };

  const renderPopoverContent = () => {
    const statusInfo = statuses.find((i) => i.key === selectedTaskStatus);

    if (!(statusInfo && selectedTaskStatus)) {
      return null;
    }

    const StatusIcon = getStatusIconComponent(selectedTaskStatus);

    return (
      <>
        <div className="px16">
          <CatTypography variant="caption">
            {t(`tasks.detail.status.status_present.${selectedTaskStatus}`)}
          </CatTypography>
          <CatTypography className="opacity-6" variant="body1">
            <Trans
              i18nKey="tasks.detail.status.sub_status_desc"
              t={t}
              values={{ status: statusInfo.name }}
            />
          </CatTypography>
        </div>
        <CatMenuDivider />
        {statusInfo.substatuses.map((substatus) => (
          <CatMenuItem
            dense
            disabled={updateLoading}
            key={substatus.id}
            onClick={() => handleSubstatusItemClick(substatus.id)}
          >
            <StatusIcon fontSize="small" />
            <CatTypography variant="body2">
              {`${statusInfo.name} / `} <b> {substatus.name}</b>
            </CatTypography>
          </CatMenuItem>
        ))}
      </>
    );
  };

  return (
    <>
      <CatTabs value={statuses.findIndex((i) => i.key === status)}>
        {statuses.map((status, index) => (
          <CatTab
            {...bindTrigger(popupState)}
            color={keyColorPairs[status.key]}
            disabled={updateLoading}
            icon={getStatusTabIcon(status.key)}
            iconPosition="start"
            key={status.key}
            label={t(`tasks.common.statuses.${status.key}`)}
            onClick={(e) => handleTabClick(e, index)}
          />
        ))}
      </CatTabs>
      <CatMenu {...bindMenu(popupState)} addEmptyFirstItem width="352px">
        {renderPopoverContent()}
      </CatMenu>
    </>
  );
}

export default StatusTabs;
