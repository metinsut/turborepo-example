import { PagedRequestOptions } from 'store/common';
import { searchAuthorizedUsersByAssetId } from 'store/slices/persons';
import { useCallback } from 'react';
import { useTypedDispatch } from 'hooks';
import ResponsibleAssigned from './ResponsibleAssigned';
import ResponsibleNotAssigned from './ResponsibleNotAssigned';

type Props = {
  assetId?: string;
  assistantPersonnelIds: string[];
  editable?: boolean;
  deletable?: boolean;
  responsiblePersonnelId: string;
  onClearResponsiblePersonnel: () => void;
  onResponsiblePersonnelIdChange: (personId: string) => void;
};

const ResponsiblePerson = ({
  assistantPersonnelIds,
  assetId,
  deletable = true,
  editable = true,
  onResponsiblePersonnelIdChange,
  onClearResponsiblePersonnel,
  responsiblePersonnelId
}: Props) => {
  const dispatch = useTypedDispatch();

  const fetchPersons = useCallback(
    async (options: PagedRequestOptions, searchText?: string) =>
      dispatch(searchAuthorizedUsersByAssetId(assetId, searchText, options)),
    [dispatch, assetId]
  );

  const handleClear = async () => {
    await onClearResponsiblePersonnel();
  };

  const handleChange = async (personId: string) => {
    await onResponsiblePersonnelIdChange(personId);
  };

  return responsiblePersonnelId ? (
    <ResponsibleAssigned
      assistantPersonnelIds={assistantPersonnelIds}
      deletable={deletable}
      editable={editable}
      fetchPersons={fetchPersons}
      onClearResponsiblePersonnel={handleClear}
      onResponsiblePersonnelIdChange={handleChange}
      responsiblePersonnelId={responsiblePersonnelId}
    />
  ) : (
    <ResponsibleNotAssigned
      assistantPersonnelIds={assistantPersonnelIds}
      fetchPersons={fetchPersons}
      onResponsiblePersonnelIdChange={handleChange}
    />
  );
};

export default ResponsiblePerson;
