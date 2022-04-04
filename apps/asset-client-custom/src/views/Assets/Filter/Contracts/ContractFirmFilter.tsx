import { CatAutocompleteAsync, CatCheckbox, CatTypography } from 'catamaran/core';
import { searchContractFirm } from 'store/slices/asset/filter/actions';
import {
  selectDraftFilterContractFirms,
  selectDraftFilterNoContractFirm
} from 'store/slices/asset/filter/selectors';
import { setFilterContractFirms, setFilterNoContractFirm } from 'store/slices/asset/filter/slice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import clsx from 'clsx';

type Props = {
  disabled?: boolean;
};

function ContractFirmFilter(props: Props) {
  const { disabled = false } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedFirms = useTypedSelector(selectDraftFilterContractFirms);
  const noContractFirm = useTypedSelector(selectDraftFilterNoContractFirm);

  const handleChange = (values: string[] | string) => {
    dispatch(setFilterContractFirms(values as string[]));
  };

  const fetchFirms = useCallback(
    (searchText: string) => dispatch(searchContractFirm(searchText)),
    [dispatch]
  );

  const handleCheckboxClick = () => {
    dispatch(setFilterNoContractFirm(!noContractFirm));
  };

  return (
    <div className="grid align-items-center w-full grid-template-columns-1-1">
      <CatAutocompleteAsync
        className="mb12"
        disabled={disabled}
        fetchResults={fetchFirms}
        getOptionValue={(option) => option}
        label={t('assets.assetFilter.contract_firm')}
        multiple
        onChange={handleChange}
        selectedValues={selectedFirms}
      />
      <label className="flex align-items-center mb12 cursor-pointer" htmlFor="contractFirm">
        <CatCheckbox
          checked={noContractFirm}
          disabled={disabled}
          id="contractFirm"
          onChange={handleCheckboxClick}
          paddingSize="large"
        />
        <CatTypography className={clsx({ 'opacity-4': disabled })} variant="body2">
          {t('assets.assetFilter.no_contract_firm')}
        </CatTypography>
      </label>
    </div>
  );
}

export default ContractFirmFilter;
