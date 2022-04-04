import { Box, CatAreaButton } from 'catamaran/core';
import { PagedRequestOptions, PagedResult } from 'store/common';
import { Person, selectPersonsByIds } from 'store/slices/persons';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AddPersonIcon from 'catamaran/icons/AddPerson';
import PersonCard from '../Card/PersonCard';
import PersonSelectorDialog from 'views/Persons/PersonSelectorDialog';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';

export type Props = {
  addButtonText?: string | React.ReactElement;
  allowEmptySelection?: boolean;
  className?: string;
  disabled?: boolean;
  disabledPersonIds?: string[];
  editable?: boolean;
  fetchPersons?: (
    options: PagedRequestOptions,
    searchText?: string
  ) => Promise<PagedResult<Person>>;
  loading?: boolean;
  multiSelect?: boolean;
  onPersonsRemove?: () => void;
  onPersonSelect?: (personIds: string[]) => void;
  personCardTitle?: string | React.ReactElement;
  personIds?: string[];
  personSelectorDescription?: string | React.ReactElement;
  personSelectorTitle?: string | React.ReactElement;
  removable?: boolean;
  transparentBackground?: boolean;
};

function MultiPersonSelector(props: Props) {
  const {
    addButtonText,
    allowEmptySelection = false,
    className,
    editable,
    fetchPersons,
    personIds,
    loading = false,
    multiSelect = true,
    onPersonSelect,
    onPersonsRemove,
    personCardTitle,
    personSelectorDescription,
    personSelectorTitle,
    disabledPersonIds,
    transparentBackground,
    removable = true,
    disabled = false
  } = props;

  const persons = useTypedSelector((state) => selectPersonsByIds(state, personIds));

  const handleDialogConfirm = async (persons: Person[]) => {
    await onPersonSelect(persons.map((i) => i.id));
  };

  const handleDialogDelete = async () => {
    await onPersonsRemove?.();
  };

  const [personSelectDialogOpen, setPersonSelectDialogOpen] = React.useState(false);

  const handleEditButtonClicked = () => {
    setPersonSelectDialogOpen(true);
  };

  const handleClose = () => {
    setPersonSelectDialogOpen(false);
  };

  const assigned = !!personIds && personIds.length > 0;
  return (
    <Box className={className}>
      {assigned ? (
        <>
          <PersonCard
            cardTitle={personCardTitle}
            editable={editable}
            loading={loading}
            onDelete={handleDialogDelete}
            onEdit={handleEditButtonClicked}
            personIds={personIds}
            removable={removable}
            transparentBackground={transparentBackground}
          />
        </>
      ) : (
        <CatAreaButton
          disabled={disabled}
          onClick={handleEditButtonClicked}
          startIcon={(hovered) => (hovered ? <PlusIcon /> : <AddPersonIcon />)}
          style={{
            height: 112,
            width: 336
          }}
        >
          {addButtonText}
        </CatAreaButton>
      )}
      <PersonSelectorDialog
        allowEmptySelection={allowEmptySelection}
        defaultSelectedPersons={persons}
        description={personSelectorDescription}
        disabledPersonIds={disabledPersonIds}
        fetchPersons={fetchPersons}
        multiSelect={multiSelect}
        onClose={handleClose}
        onConfirm={handleDialogConfirm}
        open={personSelectDialogOpen}
        title={personSelectorTitle}
      />
    </Box>
  );
}

export default MultiPersonSelector;
