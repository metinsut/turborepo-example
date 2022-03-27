import { ASSET_DETAIL } from 'routes/constant-route';
import { Asset, DisplayMode, SectionMode } from 'store/slices/asset/detail/types';
import { Box, CatPaper, CatTypography } from 'catamaran/core';
import { Collapse } from 'catamaran/core/mui';
import { FormHelper } from 'hooks/useFormState';
import { clearInSessionCategories } from 'store/slices/categories/slice';
import { dequal } from 'dequal';
import { getModelsForBrand, selectModelById } from 'store/slices/models';
import { resetAssetForm } from 'store/slices/asset/detail/slice';
import { saveAsset } from 'store/slices/asset/detail/actions';
import { selectBrandById } from 'store/slices/brands/selectors';
import { selectInitialAsset } from 'store/slices/asset/detail/selectors';
import { useAreAssetFormFieldsValid } from './DynamicItems/useAreAssetFormFieldsValid';
import { useCallback, useEffect } from 'react';
import { useGetAllBrands } from 'views/Brands/Brands';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import BaseInformationItems from './BaseInformationItems/BaseInformationItems';
import BottomActionButtons from 'components/BottomActionButtons';
import CollapsableButton from 'components/CollapsableButton';
import CreationInfoItems from './CreationInfoItems/CreationInfoItems';
import DeviceInfoItems from './DeviceInfoItems/DeviceInfoItems';
import DevicePhotoItems from './DevicePhotoItems/DevicePhotoItems';
import IdentificationItems from './IdentificationItems/IdentificationItems';
import NoteItems from './NoteItems/NoteItems';
import PurchaseInfoItems from './PurchaseInfoItems/PurchaseInfoItems';

type Props = {
  asset?: Asset;
  formHelper?: FormHelper<Asset>;
  isEditing?: boolean;
  mode?: DisplayMode;
  onSectionEditingChange: (isEditing: boolean) => void;
  seeMoreOpen: boolean;
  onSeeMoreToggle: () => void;
};

function InformationCard(props: Props) {
  const {
    asset,
    formHelper,
    isEditing,
    mode,
    onSectionEditingChange,
    seeMoreOpen,
    onSeeMoreToggle
  } = props;

  useGetAllBrands();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const initialAsset = useTypedSelector(selectInitialAsset);
  const brand = useTypedSelector((state) => selectBrandById(state, asset.brandId));
  const model = useTypedSelector((state) => selectModelById(state, asset.modelId));

  const sectionMode: SectionMode = isEditing ? 'edit' : 'readonly';

  useEffect(() => {
    if (asset.brandId) {
      dispatch(getModelsForBrand(asset.brandId, asset.mainCategoryId));
    }
  }, [asset.brandId, asset.mainCategoryId, dispatch]);

  useEffect(
    () => () => {
      dispatch(clearInSessionCategories());
    },
    [dispatch]
  );

  const isAssetFormFieldValid = useAreAssetFormFieldsValid();
  const isFormValid =
    formHelper.formState.isValid &&
    asset.categoryId &&
    asset.categoryBrandModelId &&
    isAssetFormFieldValid;

  const handleCancel = useCallback(async () => {
    dispatch(resetAssetForm());
    formHelper.reset(initialAsset);
    onSectionEditingChange(false);
  }, [dispatch, formHelper, initialAsset, onSectionEditingChange]);

  const handleSave = useCallback(async () => {
    const savedAsset = await dispatch(saveAsset());
    if (mode === 'add') {
      history.push(`${ASSET_DETAIL.replace(':id', savedAsset.id)}`);
    } else {
      formHelper.reset(savedAsset);
    }
    onSectionEditingChange(false);
  }, [dispatch, formHelper, history, mode, onSectionEditingChange]);

  const handleGoBack = useCallback(async () => {
    onSectionEditingChange(false);
    formHelper.clear();
  }, [formHelper, onSectionEditingChange]);

  const handleItemEditClick = useCallback(() => {
    onSectionEditingChange(true);
  }, [onSectionEditingChange]);

  const assetChanged = !dequal(asset, initialAsset);

  return (
    <CatPaper className="grid align-content-start gap-16 px24 py16">
      <CatTypography variant="h2">{t('assets.asset_edit.information_title')}</CatTypography>
      <BaseInformationItems
        asset={asset}
        brand={brand}
        formHelper={formHelper}
        model={model}
        onEditClick={handleItemEditClick}
        sectionMode={sectionMode}
      />
      <IdentificationItems
        isEditing={isEditing}
        onEditClick={handleItemEditClick}
        sectionMode={sectionMode}
        seeMoreOpen={seeMoreOpen}
      />
      <CollapsableButton
        buttonInvisible={isEditing}
        className="gap-16"
        open={isEditing || seeMoreOpen}
        setOpen={onSeeMoreToggle}
      >
        <div className="grid gap-16">
          {model?.photoPath && <DevicePhotoItems brand={brand} model={model} />}
          <DeviceInfoItems
            formHelper={formHelper}
            onEditClick={handleItemEditClick}
            sectionMode={sectionMode}
          />
          <PurchaseInfoItems
            formHelper={formHelper}
            onEditClick={handleItemEditClick}
            sectionMode={sectionMode}
          />
          <NoteItems
            formHelper={formHelper}
            onEditClick={handleItemEditClick}
            sectionMode={sectionMode}
          />
          <Collapse in={sectionMode === 'readonly'}>
            <CreationInfoItems asset={asset} formHelper={formHelper} />
          </Collapse>
        </div>
      </CollapsableButton>
      {isEditing && (
        <Box alignItems="center" flex justifyContent="center" mb={2}>
          <BottomActionButtons
            isConfirmDisabled={!isFormValid || !assetChanged}
            mode={mode}
            onCancel={handleCancel}
            onConfirm={handleSave}
            onGoBack={handleGoBack}
            touched={assetChanged}
          />
        </Box>
      )}
    </CatPaper>
  );
}

export default InformationCard;
