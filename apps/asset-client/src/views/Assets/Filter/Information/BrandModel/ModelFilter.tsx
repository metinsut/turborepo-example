import { CatAutocomplete, CatTypography } from 'catamaran/core';
import { FilterModelWithBrand } from 'store/slices/asset/filter/types';
import { Trans, useTranslation } from 'react-i18next';
import { getModelsByBrandIds } from 'store/slices/asset/filter/actions';
import { isArrayNullOrEmpty } from 'utils';
import {
  selectDraftFilterInformationBrands,
  selectDraftFilterInformationModels
} from 'store/slices/asset/filter/selectors';
import { setFilterInformationBrandModels } from 'store/slices/asset/filter/slice';
import { useDeepCompareEffect } from 'react-use';
import { useMemo, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import InfoIcon from 'catamaran/icons/Info';

function ModelFilter() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedModelIds = useTypedSelector(selectDraftFilterInformationModels);
  const selectedBrandIds = useTypedSelector(selectDraftFilterInformationBrands);

  const [selectableModels, setSelectableModels] = useState<FilterModelWithBrand[]>([]);

  useDeepCompareEffect(() => {
    const fetchBrandModels = async () => {
      const selectableModels = await dispatch(getModelsByBrandIds(selectedBrandIds));
      setSelectableModels(selectableModels);
    };
    fetchBrandModels();
  }, [dispatch, selectedBrandIds]);

  const isBrandIdsSelected = useMemo(
    () => !isArrayNullOrEmpty(selectedBrandIds),
    [selectedBrandIds]
  );

  const onChangeModel = (modelIds: string[] | string) => {
    const selectedModels = selectableModels.filter((model) => modelIds.includes(model.id));
    dispatch(setFilterInformationBrandModels(selectedModels));
  };

  const customEndAdornment = (
    <div className="flex align-items-center gap-8">
      <CatTypography className="opacity-8" variant="body2">
        <Trans i18nKey="assets.assetFilter.specify_brand_first" t={t} />
      </CatTypography>
      <InfoIcon alwaysHovered color="darkGrey" fontSize="small" hoverable={false} />
    </div>
  );

  return (
    <CatAutocomplete
      className="mb12"
      disabled={!isBrandIdsSelected}
      endAdornment={!isBrandIdsSelected && customEndAdornment}
      forcePopupIcon={false}
      getOptionLabel={(option: FilterModelWithBrand) => option.name}
      getOptionValue={(option: FilterModelWithBrand) => option.id}
      groupByFirstLetter
      label={t('assets.assetFilter.model')}
      multiple
      onChange={onChangeModel}
      options={selectableModels}
      selectedValues={selectedModelIds}
    />
  );
}

export default ModelFilter;
