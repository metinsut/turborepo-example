import { PagedRequestOptions, PagedResult } from 'store/common';
import { Person } from 'store/slices/persons';
import Assigned from './Assigned';
import NotAssigned from './NotAssigned';
import PersonSelectorDialog from '../PersonSelectorDialog';
import React from 'react';

type Props = {
  className?: string;
  description: string;
  fetchPersons?: (
    options: PagedRequestOptions,
    searchText?: string
  ) => Promise<PagedResult<Person>>;
  multiSelect?: boolean;
  onDelete?: Function;
  onConfirm?: (person: Person) => void;
  onMultiConfirm?: (persons: Person[]) => void;
  person?: Person;
  persons?: Person[];
  title: string;
};

function PersonSelectorItem(props: Props) {
  const {
    className,
    description,
    fetchPersons,
    multiSelect = false,
    onConfirm,
    onMultiConfirm,
    person,
    persons,
    title,
    onDelete
  } = props;

  const [personSelectDialogOpen, setPersonSelectDialogOpen] = React.useState(false);

  const handleEditButtonClicked = () => {
    setPersonSelectDialogOpen(true);
  };

  const handleClose = () => {
    setPersonSelectDialogOpen(false);
  };

  const handleConfirm = (selectedPersons: Person[]) => {
    if (multiSelect) {
      onMultiConfirm(selectedPersons);
    } else {
      onConfirm(selectedPersons[0]);
    }
  };

  const singleAssigned = !!person?.id;
  // TODO: can't undersdtand the usage of multi-assigned
  // const multiAssigned = persons && persons.length > 0;
  // const assigned = multiSelect ? multiAssigned : singleAssigned;

  const signleSelectedPerson = person?.id ? [person] : [];
  const multiSelectedPerson = persons || [];
  const defaultSelectedPersons = multiSelect ? multiSelectedPerson : signleSelectedPerson;

  return (
    <div className={className}>
      <PersonSelectorDialog
        defaultSelectedPersons={defaultSelectedPersons}
        description={description}
        fetchPersons={fetchPersons}
        multiSelect={multiSelect}
        onClose={handleClose}
        onConfirm={handleConfirm}
        open={personSelectDialogOpen}
        title={title}
      />
      {singleAssigned ? (
        <Assigned onDelete={onDelete} onEdit={handleEditButtonClicked} person={person} />
      ) : (
        <NotAssigned onEdit={handleEditButtonClicked} />
      )}
    </div>
  );
}

export default PersonSelectorItem;
