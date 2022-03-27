import { BreakdownInformation, TaskStatusInformation } from 'store/slices/breakdown/common/types';
import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import AllStaffPersonCard from '../../Common/PersonnelInformation/AllStaffPersonCard';
import ExplanationOfDenyingCard from './ExplanationOfDenyingCard';
import React, { useMemo } from 'react';
import SinglePersonSelector from 'components/PersonCards/Selector/SinglePersonSelector';
import StatusCard from './StatusCard';
import clsx from 'clsx';
import styles from '../../Common/BreakdownCommon.module.scss';

type Props = {
  breakdownInformation: BreakdownInformation;
  statusInformation: TaskStatusInformation;
};

function StatusInformation({ breakdownInformation, statusInformation }: Props) {
  const { t } = useTranslation();

  const personnelItemElement = useMemo(() => {
    if (statusInformation.status === 'denied') {
      return (
        <SinglePersonSelector
          editable={false}
          personCardTitle={t('tasks.breakdowns.my_request.denied_by')}
          personId={breakdownInformation.deniedByPersonnel.id}
          removable={false}
          transparentBackground
        />
      );
    }
    if (statusInformation.status === 'waitingForConfirmation') {
      return <></>;
    }
    if (statusInformation.responsiblePerson) {
      return (
        <SinglePersonSelector
          editable={false}
          personCardTitle={t('tasks.breakdowns.my_request.responsible')}
          personId={statusInformation.responsiblePerson.id}
          removable={false}
          transparentBackground
        />
      );
    }

    return <AllStaffPersonCard />;
  }, [
    breakdownInformation.deniedByPersonnel,
    statusInformation.responsiblePerson,
    statusInformation.status,
    t
  ]);

  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelHeader title={t('tasks.breakdowns.my_request.status_task')} />
      <CatPanelContent>
        <div className={clsx('grid align-items-center', styles.asset_info_content)}>
          <StatusCard taskStatusInformation={statusInformation} />
          {statusInformation.status === 'denied' && (
            <ExplanationOfDenyingCard denyExplanation={breakdownInformation.denyExplanation} />
          )}
          {personnelItemElement}
        </div>
      </CatPanelContent>
    </CatPanel>
  );
}

export default StatusInformation;
