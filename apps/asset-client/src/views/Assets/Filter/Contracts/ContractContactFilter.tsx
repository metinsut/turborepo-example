import { CatAutocompleteAsync, CatCheckbox, CatTypography } from 'catamaran/core';
import { searchContractContact } from 'store/slices/asset/filter/actions';
import {
  selectDraftFilterContractContacts,
  selectDraftFilterNoContractContact
} from 'store/slices/asset/filter/selectors';
import {
  setFilterContractContacts,
  setFilterNoContractContact
} from 'store/slices/asset/filter/slice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';

function ContractContactFilter() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedContacts = useTypedSelector(selectDraftFilterContractContacts);
  const noContractContact = useTypedSelector(selectDraftFilterNoContractContact);

  const handleChange = (values: string[] | string) => {
    dispatch(setFilterContractContacts(values as string[]));
  };

  const fetchContacts = useCallback(
    (searchText: string) => dispatch(searchContractContact(searchText)),
    [dispatch]
  );

  const handleCheckboxClick = () => {
    dispatch(setFilterNoContractContact(!noContractContact));
  };

  return (
    <div className="grid align-items-center w-full grid-template-columns-1-1 mb12">
      <CatAutocompleteAsync
        fetchResults={fetchContacts}
        getOptionValue={(option) => option}
        label={t('assets.assetFilter.contract_contact')}
        multiple
        onChange={handleChange}
        selectedValues={selectedContacts}
      />
      <label className="flex align-items-center cursor-pointer" htmlFor="contractContact">
        <CatCheckbox
          checked={noContractContact}
          id="contractContact"
          onChange={handleCheckboxClick}
          paddingSize="large"
        />
        <CatTypography variant="body2">{t('assets.assetFilter.no_contract_contact')}</CatTypography>
      </label>
    </div>
  );
}

export default ContractContactFilter;
