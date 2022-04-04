import { Asset } from 'store/slices/asset/detail/types';
import { FormHelper } from 'hooks/useFormState';
import { SectionMode } from 'utils';
import { setAssetPurchasedFirm } from 'store/slices/asset/detail/slice';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import React from 'react';

type Props = {
  className?: string;
  formHelper: FormHelper<Asset>;
  mode?: SectionMode;
  onEditClick?: () => void;
};

function PurchaseFirmItem(props: Props) {
  const { className, formHelper, mode, onEditClick } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useDebounce(
    () => {
      dispatch(setAssetPurchasedFirm(formHelper.formState.values.purchasedFirm));
    },
    500,
    [dispatch, formHelper.formState.values.purchasedFirm]
  );

  return (
    <CatamaranTextField
      className={className}
      deletable={false}
      formHelper={formHelper}
      label={t('assets.asset_edit.purchased_firm_field_hint')}
      mode={mode === 'edit' ? 'editOnly' : 'editAndConfirm'}
      name="purchasedFirm"
      onEdit={onEditClick}
    />
  );
}

export default PurchaseFirmItem;
