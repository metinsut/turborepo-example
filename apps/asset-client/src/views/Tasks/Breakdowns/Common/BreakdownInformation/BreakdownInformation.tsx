import { BreakdownInformation } from 'store/slices/breakdown/common/types';
import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import ExplanationCard from './ExplanationCard';
import Files from 'views/Tasks/Breakdowns/Common/Files';
import Photos from 'views/Tasks/Breakdowns/Common/Photos';
import React from 'react';
import SinglePersonSelector from 'components/PersonCards/Selector/SinglePersonSelector';
import clsx from 'clsx';
import styles from '../BreakdownCommon.module.scss';

type Props = {
  breakdownInformation: BreakdownInformation;
  requesterVisible?: boolean;
};

function BreakdownInformationPanel({ breakdownInformation, requesterVisible = true }: Props) {
  const { t } = useTranslation();

  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelHeader title={t('tasks.waiting_for_confirmation.breakdown_information.header')} />
      <CatPanelContent>
        <div className={clsx('grid align-items-center', styles.breakdown_info_content)}>
          <div className={clsx(!requesterVisible && styles.panel_wrapper)}>
            <ExplanationCard
              explanation={breakdownInformation.explanation}
              usability={breakdownInformation.requesterUsability}
            />
          </div>
          {requesterVisible && breakdownInformation.requesterPerson && (
            <SinglePersonSelector
              editable={false}
              personCardTitle={t(
                'tasks.waiting_for_confirmation.breakdown_information.requester_card_title'
              )}
              personId={breakdownInformation.requesterPerson.id}
              removable={false}
              transparentBackground
            />
          )}
        </div>
        <div className="flex flex-auto-flow-column">
          <div className="my16">
            <Photos />
          </div>
          <div>
            <Files />
          </div>
        </div>
      </CatPanelContent>
    </CatPanel>
  );
}

export default BreakdownInformationPanel;
