import { PagedRequestOptions } from 'store/common';
import { Trans, useTranslation } from 'react-i18next';
import { searchAuthorizedUsersByAssetId } from 'store/slices/persons';
import { useCallback } from 'react';
import { useTypedDispatch } from 'hooks';
import MultiPersonSelector from 'components/PersonCards/Selector/MultiPersonSelector';

type Props = {
  assetId?: string;
  assistantPersonnelIds: string[];
  deletable?: boolean;
  disabledPersonIds: string[];
  editable?: boolean;
  responsiblePersonnelId: string;
  onAssistantPersonnelChange: (personIds: string[]) => void;
  onClearAssistantPersonnel: () => void;
};

const AssistantPerson = ({
  assetId,
  assistantPersonnelIds,
  deletable = true,
  disabledPersonIds,
  editable = true,
  responsiblePersonnelId,
  onAssistantPersonnelChange,
  onClearAssistantPersonnel
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const fetchPersons = useCallback(
    async (options: PagedRequestOptions, searchText?: string) =>
      dispatch(searchAuthorizedUsersByAssetId(assetId, searchText, options)),
    [dispatch, assetId]
  );

  const onAssistantRemove = async () => {
    await onClearAssistantPersonnel();
  };

  const onAssistantSelect = async (personIds: string[]) => {
    await onAssistantPersonnelChange(personIds);
  };

  return (
    <MultiPersonSelector
      addButtonText={t('tasks.breakdowns.open_breakdown.who_is_handle_it.add_assistant_person')}
      allowEmptySelection
      disabled={!responsiblePersonnelId || !editable}
      disabledPersonIds={disabledPersonIds}
      editable={editable}
      fetchPersons={fetchPersons}
      onPersonSelect={onAssistantSelect}
      onPersonsRemove={onAssistantRemove}
      personCardTitle={t('tasks.detail.assignment_information.assistant_card_title', {
        count: assistantPersonnelIds.length
      })}
      personIds={assistantPersonnelIds}
      personSelectorDescription={
        <Trans
          i18nKey="tasks.breakdowns.open_breakdown.who_is_handle_it.assistant_person_assign"
          t={t}
        />
      }
      personSelectorTitle={t('tasks.breakdowns.open_breakdown.who_is_handle_it.assistant_person')}
      removable={deletable}
      transparentBackground
    />
  );
};

export default AssistantPerson;
