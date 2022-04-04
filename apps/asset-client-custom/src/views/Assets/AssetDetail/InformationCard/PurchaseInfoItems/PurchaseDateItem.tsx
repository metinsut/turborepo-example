import { Asset } from 'store/slices/asset/detail/types';
import { CatDatePicker, useLocalizationHelpers } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { SectionMode } from 'utils';
import { setAssetPurchasedDate } from 'store/slices/asset/detail/slice';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, withFormHelper, withReadonlyMode } from 'hooks';

type Props = {
  formHelper: FormHelper<Asset>;
  mode?: SectionMode;
  onEditClick?: () => void;
};

const CatDatePickerWithReadonly = withReadonlyMode(CatDatePicker);
const CatDatePickerWithFormHelper = withFormHelper(CatDatePickerWithReadonly);

function PurchaseDateItem(props: Props) {
  const { formHelper, mode, onEditClick } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useDebounce(
    () => {
      dispatch(setAssetPurchasedDate(formHelper.formState.values.purchasedDate));
    },
    300,
    [dispatch, formHelper.formState.values.purchasedDate]
  );

  const handleEdit = () => {
    onEditClick();
  };

  const { formatDate } = useLocalizationHelpers();

  return (
    <CatDatePickerWithFormHelper
      formatValue={formatDate}
      formHelper={formHelper}
      label={t('assets.asset_edit.purchased_date_field_hint')}
      name="purchasedDate"
      onEditClick={handleEdit}
      readonly={mode === 'readonly'}
    />
  );
}

export default PurchaseDateItem;
