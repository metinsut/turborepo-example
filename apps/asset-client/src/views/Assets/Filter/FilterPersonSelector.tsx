import { Box, CatIconButton } from 'catamaran/core';
import { PagedRequestOptions } from 'store/common';
import { Person, searchUsersByBranches, selectPersonsByIds } from 'store/slices/persons';
import { selectDraftFilterInformationBranches } from 'store/slices/asset/filter/selectors';
import { useCallback } from 'react';
import { useDialogState, useTypedDispatch, useTypedSelector } from 'hooks';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import PersonSelectorDialog from 'views/Persons/PersonSelectorDialog';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';
import clsx from 'clsx';

type Props = {
  className?: string;
  disabled?: boolean;
  onPersonIdsChange: (persons: Person[]) => void;
  personIds: string[];
  label: string;
  title: string | React.ReactElement;
  description: string | React.ReactElement;
};

function FilterPersonSelector(props: Props) {
  const {
    className,
    disabled = false,
    onPersonIdsChange,
    personIds,
    label,
    title,
    description
  } = props;

  const dispatch = useTypedDispatch();
  const persons = useTypedSelector((state) => selectPersonsByIds(state, personIds));

  const { isOpen, togglePopup } = useDialogState();

  const handleEditPerson = () => {
    togglePopup(true);
  };

  const handleClose = () => {
    togglePopup(false);
  };

  const branchIds = useTypedSelector(selectDraftFilterInformationBranches);

  const fetchPersons = useCallback(
    (options: PagedRequestOptions, searchText?: string) =>
      dispatch(searchUsersByBranches(branchIds, searchText, options)),
    [branchIds, dispatch]
  );

  return (
    <Box className={clsx('w-full', className)}>
      <PersonSelectorDialog
        defaultSelectedPersons={persons}
        description={description}
        fetchPersons={fetchPersons}
        multiSelect
        onClose={handleClose}
        onConfirm={onPersonIdsChange}
        open={isOpen}
        title={title}
      />
      <Box flex mb="12px" onClick={handleEditPerson}>
        <ReadonlyTextField
          disabled={disabled}
          endAdornment={
            <CatIconButton onClick={handleEditPerson}>
              <ArrowRightIcon
                color="darkGrey"
                contained={false}
                fontSize="medium"
                hoverable={false}
              />
            </CatIconButton>
          }
          text={label}
        />
      </Box>
    </Box>
  );
}

export default FilterPersonSelector;
