import { Asset } from 'store/slices/asset/detail/types';
import { CatDatePicker, useLocalizationHelpers } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { SectionMode } from 'utils';
import { setAssetProductionDate } from 'store/slices/asset/detail/slice';
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

function ProductionDateItem({ formHelper, mode, onEditClick }: Props) {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useDebounce(
    () => {
      dispatch(setAssetProductionDate(formHelper.formState.values.productionDate));
    },
    300,
    [dispatch, formHelper.formState.values.productionDate]
  );

  const handleEdit = () => {
    onEditClick();
  };

  const { formatMonth } = useLocalizationHelpers();

  return (
    <CatDatePickerWithFormHelper
      formatValue={formatMonth}
      formHelper={formHelper}
      label={t('assets.asset_edit.production_date_field_hint')}
      name="productionDate"
      onEditClick={handleEdit}
      readonly={mode === 'readonly'}
      views={['year', 'month']}
    />
  );
}

export default ProductionDateItem;
