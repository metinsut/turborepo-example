import { Asset, SectionMode } from 'store/slices/asset/detail/types';
import { CatTypography } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { useDynamicFieldSection } from '../DynamicItems/useDynamicFieldSection';
import { useTranslation } from 'react-i18next';
import InfoIcon from 'catamaran/icons/Info';
import ProductionDateItem from './ProductionDateItem';

type Props = {
  formHelper: FormHelper<Asset>;
  onEditClick?: () => void;
  sectionMode: SectionMode;
};

const DeviceInfoItems = ({ formHelper, onEditClick, sectionMode }: Props) => {
  const { t } = useTranslation();

  const { dynamicFieldSectionElement } = useDynamicFieldSection(
    'deviceInfo',
    sectionMode,
    onEditClick
  );

  return (
    <div className="grid gap-8">
      <div className="flex align-items-center gap-4">
        <InfoIcon fontSize="small" />
        <CatTypography variant="body1">{t('assets.asset_edit.device_info_title')}</CatTypography>
      </div>
      <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <ProductionDateItem formHelper={formHelper} mode={sectionMode} onEditClick={onEditClick} />
        {dynamicFieldSectionElement}
      </div>
    </div>
  );
};

export default DeviceInfoItems;
