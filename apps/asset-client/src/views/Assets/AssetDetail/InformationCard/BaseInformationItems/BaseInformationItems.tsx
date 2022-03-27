import { Asset, SectionMode } from 'store/slices/asset/detail/types';
import { Brand } from 'store/slices/brands/types';
import { FormHelper } from 'hooks/useFormState';
import { Model, selectSearchModels } from 'store/slices/models';
import { selectAllBrands } from 'store/slices/brands/selectors';
import { setAssetBrand, setAssetModel } from 'store/slices/asset/detail/actions';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import BrandItem from './BrandItem';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import CategoryItem from './CategoryItem/CategoryItem';
import CustodyItem from './CustodyItem/CustodyItem';
import EditDisableIcon from 'catamaran/icons/EditDisable';
import LocationItem from './LocationItem/LocationItem';
import ModelItem from './ModelItem/ModelItem';

type Props = {
  asset: Asset;
  brand: Brand;
  model: Model;
  sectionMode: SectionMode;
  formHelper?: FormHelper<Asset>;
  onEditClick?: () => void;
};

const BaseInformationItems = (props: Props) => {
  const { asset, sectionMode, formHelper, onEditClick, brand, model } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const modelRef = useRef<HTMLDivElement>();

  const searchableBrands = useTypedSelector(selectAllBrands);
  const searchableModels = useTypedSelector(selectSearchModels);

  const handleBrandConfirm = useCallback(
    async (brand: Brand): Promise<Brand> => {
      const finalBrand = await dispatch(setAssetBrand(brand));
      formHelper.setFormState((prev) => ({
        ...prev,
        brand: finalBrand,
        brandId: finalBrand.id,
        model: undefined,
        modelId: undefined
      }));

      modelRef.current?.focus();
      return finalBrand;
    },
    [dispatch, formHelper]
  );

  const handleModelConfirm = useCallback(
    async (model: Model): Promise<Model> => {
      const finalModel = await dispatch(setAssetModel(model));
      formHelper.setFormState((prev) => ({
        ...prev,
        model: finalModel,
        modelId: finalModel.id
      }));

      return finalModel;
    },
    [dispatch, formHelper]
  );

  return (
    <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
      <BrandItem
        brand={brand}
        key={asset.brandId}
        mode={sectionMode}
        onConfirm={handleBrandConfirm}
        onEditClick={onEditClick}
        searchableBrands={searchableBrands}
      />
      <ModelItem
        brandId={asset.brandId}
        displaySectionMode={sectionMode}
        model={model}
        onConfirm={handleModelConfirm}
        onEditClick={onEditClick}
        ref={modelRef}
        searchableModels={searchableModels}
      />
      <CatamaranTextField
        adornments={[
          {
            child: <EditDisableIcon className="opacity-6" key={1} />,
            hover: 'always',
            position: 'end',
            show: 'always'
          }
        ]}
        disabled
        editMode={false}
        formHelper={formHelper}
        label={t('assets.asset_edit.auto_code')}
        name="code"
      />
      <CategoryItem asset={asset} onEditClick={onEditClick} />
      <LocationItem asset={asset} onEditClick={onEditClick} />
      <CustodyItem asset={asset} onEditClick={onEditClick} />
    </div>
  );
};

export default BaseInformationItems;
