import { CancelButton, ConfirmButton, GoBackButton } from 'catamaran/core/Button';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { PagedRequestOptions, PagedResult } from 'store/common';
import { Person } from 'store/slices/persons';
import { Trans, useTranslation } from 'react-i18next';
import {
  clearPersonSelector,
  getInitialState,
  incrementPage,
  personSelectorReducer,
  removeAllSelectedPersons,
  removeSelectedPersonById,
  removeSinglePerson,
  selectAllPersons,
  selectPage,
  selectPageSize,
  selectPerson,
  selectSearchText,
  selectSelectedPersons,
  selectSinglePerson,
  selectTotalNumberOfPersons,
  setPersons,
  setSelectedPersons,
  updateSearchText
} from './personSelectorReducer';
import { compareSortedArray, isArrayNullOrEmpty } from 'utils';
import { useDialogState, useFormState, withDialogWrapper } from 'hooks';
import AddPersonIcon from 'catamaran/icons/AddPerson';
import AssignPersonIcon from 'catamaran/icons/AssignPerson';
import CancelIcon from 'catamaran/icons/Cancel';
import EditableTextField from 'components/CatamaranTextField/EditableTextField';
import PersonDialogItem from './PersonDialogItem';
import PersonDialogLoadingItem from './PersonDialogLoadingItem';
import React, { useCallback, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import SearchIcon from 'catamaran/icons/Search';
import SelectCounter from 'components/SelectCounter';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props = {
  allowEmptySelection?: boolean;
  defaultSelectedPersons: Person[];
  description: string | React.ReactElement;
  disabledPersonIds?: string[];
  fetchPersons?: (
    options: PagedRequestOptions,
    searchText?: string
  ) => Promise<PagedResult<Person>>;
  onClose: () => void;
  onConfirm: (persons: Person[]) => void;
  open: boolean;
  multiSelect?: boolean;
  title: string | React.ReactElement;
};

function PersonSelectorDialog(props: Props) {
  const {
    allowEmptySelection = false,
    defaultSelectedPersons,
    description,
    disabledPersonIds = [],
    fetchPersons,
    multiSelect = false,
    onClose,
    onConfirm,
    open,
    title
  } = props;

  const { t } = useTranslation();
  const [state, personDispatch] = React.useReducer(personSelectorReducer, null, () =>
    getInitialState(defaultSelectedPersons)
  );

  const selectedPersons = selectSelectedPersons(state);
  const allPersons = selectAllPersons(state);
  const pageNumber = selectPage(state);
  const pageSizeNumber = selectPageSize(state);
  const searchText = selectSearchText(state);
  const searchForm = useFormState({ value: '' });
  const availablePersonCount = selectTotalNumberOfPersons(state);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(
    () => () => {
      // cleaning
      personDispatch(removeAllSelectedPersons());
    },
    []
  );

  useEffect(() => {
    const getAvailablePersons = async (page: number, size: number, text: string) => {
      setLoadingMore(true);
      const { items: persons, total } = await fetchPersons({ page, size }, text);

      personDispatch(
        setPersons({
          persons,
          searchText: text,
          total
        })
      );
      setLoadingMore(false);
    };

    if (open) {
      getAvailablePersons(pageNumber, pageSizeNumber, searchText);
    }
  }, [open, pageNumber, pageSizeNumber, searchText, fetchPersons]);

  const handleBack = useCallback(async () => {
    personDispatch(clearPersonSelector());
    onClose();
  }, [onClose]);

  const [confirmLoading, confirmLoadingAsync] = useLoadingWithoutDispatch<void>();

  const handleConfirm = useCallback(async () => {
    await confirmLoadingAsync(onConfirm(selectedPersons));
    personDispatch(clearPersonSelector());
    onClose();
  }, [onClose, confirmLoadingAsync, onConfirm, selectedPersons]);

  const handlePersonItemClick = useCallback(
    (selected: Person) => {
      if (multiSelect) {
        if (selectedPersons.some((p) => p.id === selected.id)) {
          personDispatch(removeSelectedPersonById(selected.id));
        } else {
          personDispatch(selectPerson(selected));
        }
      } else if (allowEmptySelection && selectedPersons.some((p) => p.id === selected.id)) {
        personDispatch(removeSinglePerson());
      } else {
        personDispatch(selectSinglePerson(selected));
      }
    },
    [allowEmptySelection, multiSelect, selectedPersons]
  );

  const handleSearchTextChange = (event: any) => {
    personDispatch(updateSearchText(event.target.value));
  };

  const handleSeeMore = useCallback(async () => {
    personDispatch(incrementPage());
  }, []);

  const goBackDisabled = !compareSortedArray(defaultSelectedPersons, selectedPersons, 'id');

  const cancelDisabled = !goBackDisabled;
  const confirmDisabled =
    cancelDisabled || (!allowEmptySelection && isArrayNullOrEmpty(selectedPersons));

  const { isOpen: cancelDialogOpen, togglePopup: toggleCancelDialog } = useDialogState();

  const handleCancelConfirmed = async () => {
    await personDispatch(clearPersonSelector());
    await personDispatch(setSelectedPersons(defaultSelectedPersons));
    toggleCancelDialog(false);
    await onClose();
  };

  const handleCancelClosed = () => {
    toggleCancelDialog(false);
  };

  const openCancelDialog = async () => {
    toggleCancelDialog(true);
  };

  let selectionDescription: string | React.ReactElement = description;
  if (selectedPersons.length === 1) {
    selectionDescription = (
      <Trans
        components={{ bold: <b /> }}
        i18nKey="assets.asset_edit.person_selected_text"
        t={t}
        values={{ personName: `${selectedPersons[0].firstName} ${selectedPersons[0].lastName}` }}
      />
    );
  }
  if (selectedPersons.length > 1) {
    selectionDescription = t('assets.asset_edit.person_selected_multi');
  }

  const infiniteScrollRef = useInfiniteScroll({
    fetchMore: handleSeeMore,
    hasMore: availablePersonCount > allPersons.length,
    loading: loadingMore
  });

  return (
    <>
      <CatDialog
        onAction={handleConfirm}
        onClose={goBackDisabled ? openCancelDialog : handleBack}
        open={open}
      >
        <CatDialogTitle iconComponent={AddPersonIcon} title={title} />
        <CatDialogContent>
          <div>
            <div className="grid grid-auto-flow-column align-items-center justify-content-start mb8 opacity-8">
              <AssignPersonIcon />
              <SelectCounter count={selectedPersons.length} />
              <CatTypography className="three-dot opacity-6" variant="subtitle1">
                {selectionDescription}
              </CatTypography>
            </div>
            <EditableTextField
              endAdornment={<SearchIcon />}
              formHelper={searchForm}
              fullWidth
              label={t('assets.asset_edit.person_search')}
              name="value"
              onChange={handleSearchTextChange}
            />
          </div>
          <Scrollbars style={{ height: '388px' }}>
            {defaultSelectedPersons.map((person) => (
              <PersonDialogItem
                disabled={disabledPersonIds.includes(person.id)}
                key={person.id}
                onClick={handlePersonItemClick}
                person={person}
                selected={selectedPersons.some((p) => p.id === person.id)}
              />
            ))}
            {allPersons &&
              allPersons.map((person, index) => {
                if (defaultSelectedPersons.some((p) => p.id === person.id)) {
                  return null;
                }
                return (
                  <PersonDialogItem
                    disabled={disabledPersonIds.includes(person.id)}
                    key={person.id}
                    onClick={handlePersonItemClick}
                    person={person}
                    ref={index === allPersons.length - 1 ? infiniteScrollRef : null}
                    selected={selectedPersons.some((p) => p.id === person.id)}
                  />
                );
              })}
            {loadingMore && <PersonDialogLoadingItem />}
          </Scrollbars>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton
            component={goBackDisabled ? CancelButton : GoBackButton}
            variant="close"
          />
          <CatDialogButton
            component={ConfirmButton}
            disabled={confirmDisabled}
            loading={confirmLoading}
            variant="action"
          />
        </CatDialogAction>
      </CatDialog>
      <CatDialog
        onAction={handleCancelConfirmed}
        onClose={handleCancelClosed}
        open={cancelDialogOpen}
      >
        <CatDialogTitle iconComponent={CancelIcon} title={t('common.warning')} />
        <CatDialogContent>
          <CatTypography variant="body1">
            {t('assets.asset_edit.custody_dialog_cancel')}
          </CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={CancelButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
    </>
  );
}

export default withDialogWrapper(PersonSelectorDialog);
