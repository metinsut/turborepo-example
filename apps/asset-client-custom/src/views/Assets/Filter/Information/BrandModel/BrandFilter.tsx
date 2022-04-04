import { Brand } from 'store/slices/brands/types';
import { CatAutocomplete } from 'catamaran/core';
import { selectAllBrands } from 'store/slices/brands/selectors';
import { selectDraftFilterInformationBrands } from 'store/slices/asset/filter/selectors';
import { setFilterInformationBrandIds } from 'store/slices/asset/filter/slice';
import { useGetAllBrands } from 'views/Brands/Brands';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';

function BrandFilter() {
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();
  useGetAllBrands();

  const brands = useTypedSelector(selectAllBrands);
  const selectedBrandIds = useTypedSelector(selectDraftFilterInformationBrands);

  const onChange = (value: string[] | string) => {
    dispatch(setFilterInformationBrandIds(value as string[]));
  };

  return (
    <CatAutocomplete
      className="mb12"
      getOptionLabel={(option: Brand) => option.name}
      getOptionValue={(option: Brand) => option.id}
      groupByFirstLetter
      label={t('assets.assetFilter.brand')}
      multiple
      onChange={onChange}
      options={brands}
      selectedValues={selectedBrandIds}
    />
  );
}

export default BrandFilter;
