import { PagedRequestOptions, PagedResult } from 'store/common';
import { Person } from 'store/slices/persons';
import { Theme, makeStyles } from 'catamaran/core/mui';
import Assigned from './AssignedOld';
import NotAssigned from './NotAssignedOld';
import PersonSelectorDialog from '../PersonSelectorDialog';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  assignedTitle?: string;
  className?: string;
  description: string | React.ReactElement;
  deleteWarningText: string;
  fetchPersons: (options: PagedRequestOptions, searchText?: string) => Promise<PagedResult<Person>>;
  leftIcon: React.ReactNode;
  multiSelect?: boolean;
  notAssignedTitle: string;
  notAssignedHoverTitle?: string;
  onConfirm?: (person: Person) => void;
  onMultiConfirm?: (persons: Person[]) => void;
  onDelete: () => void;
  person?: Person;
  persons?: Person[];
  title: string;
};

function PersonSelectorItem(props: Props) {
  const classes = useStyles();
  const {
    assignedTitle,
    className,
    description,
    deleteWarningText,
    fetchPersons,
    leftIcon,
    multiSelect = false,
    notAssignedTitle,
    notAssignedHoverTitle,
    onConfirm,
    onMultiConfirm,
    onDelete,
    person,
    persons,
    title
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
  const multiAssigned = persons && persons.length > 0;
  const assigned = multiSelect ? multiAssigned : singleAssigned;

  const signleSelectedPerson = person?.id ? [person] : [];
  const multiSelectedPerson = persons || [];
  const defaultSelectedPersons = multiSelect ? multiSelectedPerson : signleSelectedPerson;

  return (
    <div className={clsx(classes.root, className)}>
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
      {assigned ? (
        <Assigned
          deleteWarningText={deleteWarningText}
          leftIcon={leftIcon}
          onDelete={onDelete}
          onEditButtonClick={handleEditButtonClicked}
          persons={defaultSelectedPersons}
          title={assignedTitle}
        />
      ) : (
        <NotAssigned
          leftIcon={leftIcon}
          notAssignedHoverTitle={notAssignedHoverTitle}
          notAssignedTitle={notAssignedTitle}
          onEditButtonClick={handleEditButtonClicked}
        />
      )}
    </div>
  );
}

export default PersonSelectorItem;
