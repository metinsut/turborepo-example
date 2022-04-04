import { AssignmentAuthorization } from 'store/slices/breakdown/common/types';
import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { TASKLIST } from 'routes/constant-route';
import {
  getDisabledAssistantPersonnelIds,
  getIsUserAuthorizedToAssign,
  removeAssistantPersonnels,
  removeResponsiblePersonnel,
  updateAssistantPersonnels,
  updateResponsiblePersonnel
} from 'store/slices/breakdown/taskDetail/assignmentActions';
import {
  selectAssistantPersonIds,
  selectBreakdownAssetId,
  selectBreakdownId,
  selectResponsiblePersonId
} from 'store/slices/breakdown/taskDetail/selector';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AssistantPerson from '../../Common/PersonnelInformation/AssistantPerson';
import React, { useCallback, useEffect, useState } from 'react';
import ResponsiblePerson from '../../Common/PersonnelInformation/ResponsiblePerson';
import clsx from 'clsx';
import styles from '../Detail.module.scss';

function AssignmentInformation() {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const history = useHistory();

  const breakdownId = useTypedSelector(selectBreakdownId);
  const assetId = useTypedSelector(selectBreakdownAssetId);
  const responsiblePersonId = useTypedSelector(selectResponsiblePersonId);
  const assistantPersonIds = useTypedSelector(selectAssistantPersonIds);

  const [assignAuthorization, setAssignAuthorization] = useState<AssignmentAuthorization>({});

  useEffect(() => {
    async function fetchAssignmentAuthorization() {
      if (breakdownId) {
        const auths = await dispatch(
          getIsUserAuthorizedToAssign(responsiblePersonId, assistantPersonIds)
        );
        if (!auths.canSeeAssignments) {
          history.push(TASKLIST);
        }

        setAssignAuthorization(auths);
      }
    }
    fetchAssignmentAuthorization();
  }, [assistantPersonIds, breakdownId, dispatch, history, responsiblePersonId]);

  const handleResponsiblePersonnelIdChange = useCallback(
    async (personId: string) => {
      await dispatch(updateResponsiblePersonnel(personId));
    },
    [dispatch]
  );

  const handleClearResponsiblePersonnelId = useCallback(async () => {
    await dispatch(removeResponsiblePersonnel());
  }, [dispatch]);

  const handleAssistantPersonnelIdChange = useCallback(
    async (personIds: string[]) => {
      await dispatch(updateAssistantPersonnels(personIds));
    },
    [dispatch]
  );

  const handleClearAssistantPersonnelId = useCallback(async () => {
    await dispatch(removeAssistantPersonnels());
  }, [dispatch]);

  const [disabledAssistantPersonnelIds, setDisabledAssistantPersonnelIds] = useState<string[]>([]);

  useEffect(() => {
    async function getDisabledAssistantPersonnels() {
      if (breakdownId) {
        const disabledIds = await dispatch(
          getDisabledAssistantPersonnelIds(responsiblePersonId, assistantPersonIds)
        );
        setDisabledAssistantPersonnelIds(disabledIds);
      }
    }
    getDisabledAssistantPersonnels();
  }, [assistantPersonIds, breakdownId, dispatch, responsiblePersonId]);

  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelHeader title={t('tasks.detail.assignment_information.header')} />
      <CatPanelContent
        className={clsx('grid align-items-center gap-20', styles.assignment_grid_content)}
      >
        <ResponsiblePerson
          assetId={assetId}
          assistantPersonnelIds={assistantPersonIds}
          deletable={assignAuthorization.canDeleteResponsible}
          editable={assignAuthorization.canEditResponsible}
          onClearResponsiblePersonnel={handleClearResponsiblePersonnelId}
          onResponsiblePersonnelIdChange={handleResponsiblePersonnelIdChange}
          responsiblePersonnelId={responsiblePersonId}
        />
        <AssistantPerson
          assetId={assetId}
          assistantPersonnelIds={assistantPersonIds}
          deletable={assignAuthorization.canDeleteAssistant}
          disabledPersonIds={disabledAssistantPersonnelIds}
          editable={assignAuthorization.canEditAssistant}
          onAssistantPersonnelChange={handleAssistantPersonnelIdChange}
          onClearAssistantPersonnel={handleClearAssistantPersonnelId}
          responsiblePersonnelId={responsiblePersonId}
        />
      </CatPanelContent>
    </CatPanel>
  );
}

export default AssignmentInformation;
