import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import {
  removeAssistantPersonnelIds,
  removeResponsiblePersonnelId,
  setAssistantPersonnelIds,
  setResponsiblePersonnelId
} from 'store/slices/breakdown/open/slice';
import {
  selectAssistantPersonnelIds,
  selectResponsiblePersonnelId
} from 'store/slices/breakdown/open/selector';
import { selectIsUserAuthorized } from 'store/slices/session';
import { useCallback } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AssistantPerson from '../../Common/PersonnelInformation/AssistantPerson';
import ResponsiblePerson from '../../Common/PersonnelInformation/ResponsiblePerson';
import clsx from 'clsx';
import styles from '../Breakdowns.module.scss';

type Props = {
  assetId?: string;
};

const WhoIsHandleIt = ({ assetId }: Props) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const responsiblePersonnelId = useTypedSelector(selectResponsiblePersonnelId);
  const assistantPersonnelIds = useTypedSelector(selectAssistantPersonnelIds);

  const handleResponsiblePersonnelIdChange = useCallback(
    (personId: string) => {
      dispatch(setResponsiblePersonnelId(personId));
    },
    [dispatch]
  );

  const handleClearResponsiblePersonnelId = useCallback(() => {
    dispatch(removeResponsiblePersonnelId());
  }, [dispatch]);

  const handleAssistantPersonnelIdChange = useCallback(
    (personIds: string[]) => {
      dispatch(setAssistantPersonnelIds(personIds));
    },
    [dispatch]
  );

  const handleClearAssistantPersonnelId = useCallback(() => {
    dispatch(removeAssistantPersonnelIds());
  }, [dispatch]);

  const assistantEditable = useTypedSelector((state) =>
    selectIsUserAuthorized(state, 'taskOpen_AssignPersonnel')
  );

  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelHeader
        title={<Trans i18nKey="tasks.breakdowns.open_breakdown.who_is_handle_it.title" t={t} />}
      />
      <CatPanelContent
        className={clsx('grid align-items-center gap-20', styles.who_is_handle_content)}
      >
        <ResponsiblePerson
          assetId={assetId}
          assistantPersonnelIds={assistantPersonnelIds}
          onClearResponsiblePersonnel={handleClearResponsiblePersonnelId}
          onResponsiblePersonnelIdChange={handleResponsiblePersonnelIdChange}
          responsiblePersonnelId={responsiblePersonnelId}
        />
        <AssistantPerson
          assetId={assetId}
          assistantPersonnelIds={assistantPersonnelIds}
          disabledPersonIds={[responsiblePersonnelId]}
          editable={assistantEditable}
          onAssistantPersonnelChange={handleAssistantPersonnelIdChange}
          onClearAssistantPersonnel={handleClearAssistantPersonnelId}
          responsiblePersonnelId={responsiblePersonnelId}
        />
      </CatPanelContent>
    </CatPanel>
  );
};

export default WhoIsHandleIt;
