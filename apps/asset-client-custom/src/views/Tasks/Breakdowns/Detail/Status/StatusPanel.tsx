import { CatPanel, CatPanelContent, CatTypography } from 'catamaran/core';
import { TaskStatusInformation } from 'store/slices/breakdown/common/types';
import { Trans, useTranslation } from 'react-i18next';
import { getStatusIconComponent } from 'views/Tasks/Breakdowns/Common/StatusIcon';
import React from 'react';
import StatusTabs from './StatusTabs';
import styles from '../Detail.module.scss';

type Props = {
  taskStatusInformation: TaskStatusInformation;
};

function StatusPanel({ taskStatusInformation }: Props) {
  const { t } = useTranslation();

  const StatusIcon = getStatusIconComponent(taskStatusInformation.status);
  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelContent className="flex justify-content-between w-full">
        <div className="grid grid-auto-flow-column align-items-center gap-16">
          <StatusIcon />
          <CatTypography className="opacity-8" variant="subtitle1">
            <Trans
              i18nKey="tasks.detail.status.task_status"
              t={t}
              values={{
                status: taskStatusInformation.substatus
                  ? `${t(`tasks.common.statuses.${taskStatusInformation.status}`)} 
                    / ${taskStatusInformation.substatus}`
                  : t(`tasks.common.statuses.${taskStatusInformation.status}`)
              }}
            />
          </CatTypography>
        </div>
        <StatusTabs status={taskStatusInformation.status} />
      </CatPanelContent>
    </CatPanel>
  );
}

export default StatusPanel;
