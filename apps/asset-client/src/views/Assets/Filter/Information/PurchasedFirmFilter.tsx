import { CatAutocompleteAsync, CatCheckbox, CatTypography } from 'catamaran/core';
import { searchAssetPurchasedFirm } from 'store/slices/asset/filter/actions';
import {
  selectDraftFilterInformationNoPurchasedFirm,
  selectDraftFilterInformationPurchasedFirm
} from 'store/slices/asset/filter/selectors';
import {
  setFilterInformationNoPurchasedFirm,
  setFilterInformationPurchasedFirms
} from 'store/slices/asset/filter/slice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';

function PurchasedFirmFilter() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedIds = useTypedSelector(selectDraftFilterInformationPurchasedFirm);
  const noPurchaseFirm = useTypedSelector(selectDraftFilterInformationNoPurchasedFirm);

  const handleChange = (values: string[] | string) => {
    dispatch(setFilterInformationPurchasedFirms(values as string[]));
  };

  const fetchFirms = useCallback(
    (searchText: string) => dispatch(searchAssetPurchasedFirm(searchText)),
    [dispatch]
  );

  const handleCheckboxClick = () => {
    dispatch(setFilterInformationNoPurchasedFirm(!noPurchaseFirm));
  };

  return (
    <div className="grid align-items-center w-full grid-template-columns-1-1">
      <CatAutocompleteAsync
        fetchResults={fetchFirms}
        getOptionValue={(option) => option}
        label={t('assets.assetFilter.purchased_firm')}
        multiple
        onChange={handleChange}
        selectedValues={selectedIds}
      />
      <label className="flex align-items-center mb12 cursor-pointer" htmlFor="purchasedFirm">
        <CatCheckbox
          checked={noPurchaseFirm}
          id="purchasedFirm"
          onChange={handleCheckboxClick}
          paddingSize="large"
        />
        <CatTypography variant="body2">{t('assets.assetFilter.no_purchased_firm')}</CatTypography>
      </label>
    </div>
  );
}

export default PurchasedFirmFilter;
