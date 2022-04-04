import { Asset } from 'store/slices/asset/detail/types';
import { CatDatePicker, CatTypography, useLocalizationHelpers } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import { withReadonlyMode } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import DownloadIcon from 'catamaran/icons/Download';

type Props = {
  asset: Asset;
  formHelper?: FormHelper<Asset>;
};

const CatDatePickerWithReadonly = withReadonlyMode(CatDatePicker);

const CreationInfoItems = (props: Props) => {
  const { asset, formHelper } = props;
  const { t } = useTranslation();

  const { formatDateAndTime } = useLocalizationHelpers();

  return (
    <div className="grid gap-8">
      <div className="flex align-items-center gap-4">
        <DownloadIcon className="mr4" fontSize="small" />
        <CatTypography variant="body1">{t('assets.asset_edit.creation_info_title')}</CatTypography>
      </div>
      <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <CatamaranTextField
          disabled
          formHelper={formHelper}
          label={t('assets.asset_edit.created_user_field_hint')}
          name="createdByUser"
        />
        <CatDatePickerWithReadonly
          disabled
          editable={false}
          formatValue={formatDateAndTime}
          label={t('assets.asset_edit.created_date_field_hint')}
          onChange={() => {}}
          readonly
          value={asset.createdDate}
        />
      </div>
    </div>
  );
};

export default CreationInfoItems;
