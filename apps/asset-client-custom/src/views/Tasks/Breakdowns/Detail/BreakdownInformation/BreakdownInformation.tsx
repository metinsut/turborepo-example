import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { TaskDetailInformation } from 'store/slices/breakdown/taskDetail/types';
import { useTranslation } from 'react-i18next';
import ExplanationUsability from './ExplanationUsability';
import Files from 'views/Tasks/Breakdowns/Common/Files';
import NoteFromManager from './NoteFromManager';
import Photos from 'views/Tasks/Breakdowns/Common/Photos';
import PriorityBasic from '../../Common/Priority/PriorityBasic';
import SinglePersonSelector from 'components/PersonCards/Selector/SinglePersonSelector';
import clsx from 'clsx';
import styles from '../Detail.module.scss';

type Props = {
  taskDetail: TaskDetailInformation;
};

function BreakdownInformationPanel({ taskDetail }: Props) {
  const { t } = useTranslation();

  const noteFromManager = taskDetail.breakdownInformation.assignerNote;

  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelHeader title={t('tasks.detail.breakdown_information.header')} />
      <CatPanelContent>
        <div className={clsx('grid align-items-center', styles.breakdown_info_content)}>
          <ExplanationUsability
            explanation={taskDetail.breakdownInformation.explanation}
            requesterUsability={taskDetail.breakdownInformation.requesterUsability}
            usability={taskDetail.breakdownInformation.usability}
          />
          <SinglePersonSelector
            editable={false}
            personCardTitle={t('tasks.detail.breakdown_information.requester_card_title')}
            personId={taskDetail.breakdownInformation.requesterPerson.id}
            removable={false}
            transparentBackground
          />
          <Photos />
          <SinglePersonSelector
            editable={false}
            personCardTitle={t('tasks.detail.breakdown_information.apporved_by_card_title')}
            personId={taskDetail.breakdownInformation.responsibleManager.id}
            removable={false}
            transparentBackground
          />
          <Files />
          <PriorityBasic
            firstName={taskDetail.breakdownInformation.responsibleManager?.firstName}
            lastName={taskDetail.breakdownInformation.responsibleManager?.lastName}
            priority={taskDetail.taskStatusInformation.priority}
          />
          {noteFromManager && <NoteFromManager noteFromManager={noteFromManager} />}
        </div>
      </CatPanelContent>
    </CatPanel>
  );
}

export default BreakdownInformationPanel;
