import { PagedRequestOptions, PagedResult } from 'store/common';
import { Person } from 'store/slices/persons';
import { Trans, useTranslation } from 'react-i18next';
import SinglePersonSelector from 'components/PersonCards/Selector/SinglePersonSelector';

type Props = {
  assistantPersonnelIds: string[];
  editable?: boolean;
  deletable?: boolean;
  fetchPersons: (options: PagedRequestOptions, searchText?: string) => Promise<PagedResult<Person>>;
  onClearResponsiblePersonnel: () => void;
  onResponsiblePersonnelIdChange: (personId: string) => void;
  responsiblePersonnelId: string;
};

const ResponsibleAssigned = (props: Props) => {
  const {
    assistantPersonnelIds,
    editable = true,
    deletable = true,
    fetchPersons,
    onClearResponsiblePersonnel,
    onResponsiblePersonnelIdChange,
    responsiblePersonnelId
  } = props;
  const { t } = useTranslation();

  const onPersonRemove = async () => {
    await onClearResponsiblePersonnel();
  };

  const onPersonSelect = async (personId: string) => {
    await onResponsiblePersonnelIdChange(personId);
  };

  return (
    <SinglePersonSelector
      addButtonText={t('tasks.breakdowns.open_breakdown.who_is_handle_it.add_responsible_person')}
      allowEmptySelection
      disabledPersonIds={assistantPersonnelIds}
      editable={editable}
      fetchPersons={fetchPersons}
      onPersonRemove={onPersonRemove}
      onPersonSelect={onPersonSelect}
      personCardTitle={t('tasks.detail.assignment_information.responsible_card_title')}
      personId={responsiblePersonnelId}
      personSelectorDescription={
        <Trans
          i18nKey="tasks.breakdowns.open_breakdown.who_is_handle_it.responsible_person_assign"
          t={t}
        />
      }
      personSelectorTitle={t('tasks.breakdowns.open_breakdown.who_is_handle_it.responsible_person')}
      removable={deletable}
      transparentBackground
    />
  );
};

export default ResponsibleAssigned;
