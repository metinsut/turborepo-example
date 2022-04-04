import {
  CatCheckbox,
  CatIconButton,
  CatMenu,
  CatMenuDivider,
  CatMenuItem,
  CatRadio,
  CatToggleButton,
  CatTypography
} from 'catamaran/core';
import { PagedRequestOptions } from 'store/common';
import { Person, selectPersonsByIds } from 'store/slices/persons';
import { PersonFilter, PersonFilterType } from 'store/slices/tasks/common/type';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { compareSortedArray, isArrayNullOrEmpty } from 'utils';
import {
  defaultTaskListFilter,
  personFilterTypes,
  searchTaskUsersByBranches,
  selectBranch,
  selectPersonnel,
  updatePersonFilter
} from 'store/slices/tasks/taskList/taskListFilter';
import { selectIsUserAuthorized } from 'store/slices/session';
import { useCallback, useEffect, useState } from 'react';
import { useDialogState, useTypedDispatch, useTypedSelector } from 'hooks';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import PersonGroupIcon from 'catamaran/icons/PersonGroup';
import PersonSelectorDialog from 'views/Persons/PersonSelectorDialog';
import SmartOffIcon from 'catamaran/icons/SmartOff';
import SmartOnIcon from 'catamaran/icons/SmartOn';
import clsx from 'clsx';

function PersonFilterButton() {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const selectedFilter = useTypedSelector(selectPersonnel);
  const selectedBranchIds = useTypedSelector(selectBranch);
  const [localFilter, setLocalFilter] = useState<PersonFilter[]>([]);

  const isUserAuthorizedToSelectPerson = useTypedSelector((state) =>
    selectIsUserAuthorized(state, 'taskList_Filter_PersonSelect')
  );

  const selectedPersonIds =
    localFilter.find((filter) => filter.type === 'specificPersons')?.personnelIds ?? [];
  const selectedPersons = useTypedSelector((state) => selectPersonsByIds(state, selectedPersonIds));

  useEffect(() => {
    setLocalFilter(selectedFilter);
  }, [selectedFilter]);

  const { isOpen: isPersonDialogOpen, togglePopup: togglePersonPopup } = useDialogState();

  const handleClose = () => {
    dispatch(updatePersonFilter(localFilter));
  };

  const handleCheck = (type: PersonFilterType) => {
    setLocalFilter((prevState: PersonFilter[]) => {
      let newState: PersonFilter[] = [];
      const hasType = prevState.some((filter) => filter.type === type);
      const filteredState = prevState.filter((filter) => filter.type !== 'specificPersons');

      if (hasType) {
        newState = filteredState.filter((filter: PersonFilter) => filter.type !== type);
      } else {
        newState = [
          ...filteredState,
          {
            type
          }
        ];
      }

      return newState;
    });
  };

  const isInitialFilter = compareSortedArray(defaultTaskListFilter.personnel, localFilter, 'type');

  const renderFilterButtonText = () => {
    if (isArrayNullOrEmpty(localFilter)) {
      return '';
    }

    if (isInitialFilter) {
      return t('tasks.common.filter.smart');
    }

    if (localFilter[0].type === 'specificPersons') {
      return t('tasks.list.filter.person_filter.selected_person', {
        count: localFilter[0].personnelIds.length
      });
    }

    return t(`tasks.list.filter.person_filter.type.${localFilter[0].type}`);
  };

  const renderSmartButtonText = () => {
    switch (isInitialFilter) {
      case true:
        return (
          <span className="flex gap-4">
            <Trans i18nKey="tasks.common.filter.smart_is_on" />
          </span>
        );
      default:
        return t('tasks.common.filter.reset_filter');
    }
  };

  const handleSetSmartClick = () => {
    if (!isInitialFilter) {
      setLocalFilter(defaultTaskListFilter.personnel);
    }
  };

  const handleSpecificPersonsClick = (e: React.MouseEvent<HTMLLIElement>) => {
    togglePersonPopup(true);
    e.preventDefault();
  };

  const handlePersonSelectorConfirm = (selectedPersons: Person[]) => {
    setLocalFilter([
      {
        personnelIds: selectedPersons.map((person) => person.id),
        type: 'specificPersons'
      }
    ]);
  };

  const handlePersonSelectorClose = () => {
    togglePersonPopup(false);
  };

  const fetchPersons = useCallback(
    async (options: PagedRequestOptions, searchText?: string) =>
      dispatch(searchTaskUsersByBranches(selectedBranchIds, searchText, options)),
    [selectedBranchIds, dispatch]
  );

  const popupState = usePopupState({ popupId: 'ListPersonFilter', variant: 'popover' });

  return (
    <>
      <CatToggleButton
        {...bindTrigger(popupState)}
        color="darkGrey"
        icon={<PersonGroupIcon />}
        keepIconColor
        reverse
        title={renderFilterButtonText()}
      />
      <CatMenu
        {...bindMenu(popupState)}
        addEmptyFirstItem
        onClose={() => {
          bindMenu(popupState).onClose();
          handleClose();
        }}
        width="292px"
      >
        <CatTypography className="mx16" variant="body1">
          <Trans i18nKey="tasks.list.filter.person_filter.desc" t={t} />
        </CatTypography>
        <div className="mx8 mt16">
          <CatToggleButton
            className="radius-24"
            color={isInitialFilter ? 'grey' : 'red'}
            disabled={isInitialFilter}
            icon={
              isInitialFilter ? <SmartOffIcon fontSize="small" /> : <SmartOnIcon fontSize="small" />
            }
            keepIconColor
            onClick={handleSetSmartClick}
            reverse
            size="large"
            title={
              <span className="flex w-full align-items-center justify-content-between">
                {renderSmartButtonText()}
                <InfoCautionIcon color="darkGrey" fontSize="small" />
              </span>
            }
          />
        </div>
        <CatMenuDivider />
        {personFilterTypes.map((type) => {
          const checked = localFilter.length === 0 || localFilter.some((i) => i.type === type);
          const disabled = localFilter.length === 1 && localFilter.some((i) => i.type === type);
          return type === 'specificPersons' ? (
            isUserAuthorizedToSelectPerson && (
              <CatMenuItem
                key={type}
                onClick={handleSpecificPersonsClick}
                style={{ padding: '4px 16px' }}
              >
                <CatRadio checked={checked} id={type} zeroPadding />
                <CatTypography
                  className={clsx(checked ? 'font-bold' : '', 'three-dot')}
                  variant="body2"
                >
                  {t(`tasks.list.filter.person_filter.type.${type}`)}
                </CatTypography>
                <CatIconButton>
                  <ArrowRightIcon color="darkGrey" />
                </CatIconButton>
              </CatMenuItem>
            )
          ) : (
            <CatMenuItem disabled={disabled} key={type} onClick={() => handleCheck(type)}>
              <CatCheckbox checked={checked} id={type} paddingSize="none" />
              <CatTypography
                className={clsx(checked ? 'font-bold' : '', 'three-dot')}
                variant="body2"
              >
                {t(`tasks.list.filter.person_filter.type.${type}`)}
              </CatTypography>
            </CatMenuItem>
          );
        })}
      </CatMenu>
      {isPersonDialogOpen && (
        <PersonSelectorDialog
          defaultSelectedPersons={selectedPersons}
          description={t('tasks.list.filter.person_filter.dialog_desc')}
          fetchPersons={fetchPersons}
          multiSelect
          onClose={handlePersonSelectorClose}
          onConfirm={handlePersonSelectorConfirm}
          open={isPersonDialogOpen}
          title={t('tasks.list.filter.person_filter.dialog_title')}
        />
      )}
    </>
  );
}

export default PersonFilterButton;
