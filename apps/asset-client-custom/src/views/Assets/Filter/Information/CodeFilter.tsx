import { CatAutocompleteAsync } from 'catamaran/core';
import { searchAssetCode } from 'store/slices/asset/filter/actions';
import { selectDraftFilterInformationAssetCodes } from 'store/slices/asset/filter/selectors';
import { setFilterAssetIds } from 'store/slices/asset/filter/slice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';

function IdFilter() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedIds = useTypedSelector(selectDraftFilterInformationAssetCodes);

  const handleChange = (values: string[] | string) => {
    dispatch(setFilterAssetIds(values as string[]));
  };

  const fetchCodes = useCallback(
    (searchText: string) => dispatch(searchAssetCode(searchText)),
    [dispatch]
  );

  return (
    <CatAutocompleteAsync
      className="mb12"
      fetchResults={fetchCodes}
      getOptionValue={(option) => option}
      label={t('assets.assetFilter.code')}
      multiple
      onChange={handleChange}
      selectedValues={selectedIds}
    />
  );
}

export default IdFilter;
