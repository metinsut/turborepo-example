import { CatCheckbox, CatTypography } from 'catamaran/core';
import { Person } from 'store/slices/persons';
import { getAssetFilterCustodianPersons } from 'store/slices/asset/filter/actions';
import {
  selectDraftFilterInformationCustodian,
  selectDraftFilterInformationNoCustody,
  selectSelectedFilterId
} from 'store/slices/asset/filter/selectors';
import {
  setFilterInformationCustodies,
  setFilterInformationNoCustody
} from 'store/slices/asset/filter/slice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import FilterPersonSelector from '../FilterPersonSelector';
import useLoading from 'hooks/useLoading';

function CustodyFilter() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const personIds = useTypedSelector(selectDraftFilterInformationCustodian);
  const noCustody = useTypedSelector(selectDraftFilterInformationNoCustody);
  const selectedFilterId = useTypedSelector(selectSelectedFilterId);

  const [custodianPersonsLoading, custodianPersonsDispatch] = useLoading<Person[]>();

  useEffect(() => {
    const fetchCustodianPersons = async () => {
      if (selectedFilterId) {
        custodianPersonsDispatch(getAssetFilterCustodianPersons());
      }
    };

    fetchCustodianPersons();
  }, [custodianPersonsDispatch, selectedFilterId]);

  const handleCustodianCheckConfirm = (persons: Person[]) => {
    const selectedPersonIds = persons.map((person) => person.id);
    dispatch(setFilterInformationCustodies(selectedPersonIds));
  };

  const handleCheckboxClick = () => {
    dispatch(setFilterInformationNoCustody(!noCustody));
  };

  let label = t('assets.assetFilter.custodian_person');
  if (personIds.length > 0) {
    label = t('assets.assetFilter.person_selected', { count: personIds.length });
  }

  return (
    <div className="grid align-items-center w-full grid-template-columns-1-1">
      <FilterPersonSelector
        description={t('assets.assetFilter.select_filter_custodian')}
        disabled={custodianPersonsLoading}
        label={label}
        onPersonIdsChange={handleCustodianCheckConfirm}
        personIds={personIds}
        title={t('assets.assetFilter.select_custodian')}
      />
      <label className="flex align-items-center mb12 cursor-pointer" htmlFor="custodyFilter">
        <CatCheckbox
          checked={noCustody}
          id="custodyFilter"
          onChange={handleCheckboxClick}
          paddingSize="large"
        />
        <CatTypography variant="body2">{t('assets.assetFilter.no_custody')}</CatTypography>
      </label>
    </div>
  );
}

export default CustodyFilter;
