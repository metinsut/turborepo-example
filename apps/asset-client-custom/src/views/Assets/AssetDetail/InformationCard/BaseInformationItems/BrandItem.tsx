import { Box, CatTypography } from 'catamaran/core';
import { Brand } from 'store/slices/brands/types';
import { SectionMode } from 'store/slices/asset/detail/types';
import { Trans, useTranslation } from 'react-i18next';
import { addBrand } from 'store/slices/brands/actions';
import { useFormState, useTypedDispatch } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import SearchDropdownHelper from 'components/CatamaranTextField/SearchDropdownHelper';
import Searchable from 'components/CatamaranTextField/Searchable';
import brandValidator from 'helpers/validations/BrandValidator';

type Props = {
  brand: Brand;
  mode: SectionMode;
  onConfirm: (brand: Brand) => Promise<Brand>;
  onEditClick: () => void;
  searchableBrands: Brand[];
};

function BrandItem(props: Props) {
  const { brand = { name: '' }, mode, onConfirm, onEditClick, searchableBrands } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const formHelper = useFormState(brand, brandValidator);

  const handleAddNew = async (brand: Brand) => {
    const finalBrand = await dispatch(addBrand(brand, undefined, { showSnackBar: false }));
    await onConfirm(finalBrand);

    return finalBrand;
  };

  return (
    <Searchable
      formHelper={formHelper}
      mode={mode === 'edit' ? 'editOnly' : 'editAndConfirm'}
      name="name"
      noItemElement={
        <Box display="flex">
          <CatTypography variant="body1">
            <Trans i18nKey="brands.no_brand_add_hint" t={t} />
          </CatTypography>
        </Box>
      }
      onAddNew={handleAddNew}
      onConfirm={onConfirm}
      primaryKey="id"
      renderInput={(props) => (
        <CatamaranTextField
          deletable={false}
          isRequired
          label={t('assets.asset_edit.brand_field_hint')}
          onEdit={onEditClick}
          validatable
          {...props}
        />
      )}
      searchHelperText={<SearchDropdownHelper messageKey="assets.asset_edit.brand_dropdown_hint" />}
      searchOptions={searchableBrands}
      showSearchHelperText
    />
  );
}

export default BrandItem;
