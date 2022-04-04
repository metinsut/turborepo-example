import { PagedRequestOptions } from 'store/common';
import { searchUsersByBranches } from 'store/slices/persons';
import { selectRequestedPersonnelId } from 'store/slices/breakdown/open/selector';
import { setRequestedPersonnelId } from 'store/slices/breakdown/open/slice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import SinglePersonSelector from 'components/PersonCards/Selector/SinglePersonSelector';

type Props = {
  branchId?: string;
};

function RequestedPersonnel({ branchId }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const requestedPersonnelId = useTypedSelector(selectRequestedPersonnelId);

  const handlePersonnelSelect = (personnelId: string) => {
    dispatch(setRequestedPersonnelId(personnelId));
  };

  const fetchPersons = useCallback(
    async (options: PagedRequestOptions, searchText?: string) =>
      dispatch(searchUsersByBranches([branchId], searchText, options)),
    [branchId, dispatch]
  );

  return (
    <SinglePersonSelector
      addButtonText={t('tasks.breakdowns.open_breakdown.requested_personnel.not_assigned')}
      fetchPersons={fetchPersons}
      onPersonSelect={handlePersonnelSelect}
      personCardTitle={t('tasks.breakdowns.open_breakdown.requested_personnel.card_title')}
      personId={requestedPersonnelId}
      personSelectorDescription={t(
        'tasks.breakdowns.open_breakdown.requested_personnel.selector_description'
      )}
      personSelectorTitle={t('tasks.breakdowns.open_breakdown.requested_personnel.selector_title')}
      removable={false}
      transparentBackground
    />
  );
}

export default RequestedPersonnel;
