import { Asset, SectionMode } from 'store/slices/asset/detail/types';
import { CatTypography } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { useDynamicFieldSection } from '../DynamicItems/useDynamicFieldSection';
import { useTranslation } from 'react-i18next';
import CostIcon from 'catamaran/icons/Cost';
import PurchaseCostItem from './PurchaseCostItem';
import PurchaseDateItem from './PurchaseDateItem';
import PurchaseFirmItem from './PurchaseFirmItem';

type Props = {
  formHelper?: FormHelper<Asset>;
  onEditClick?: () => void;
  sectionMode: SectionMode;
};

const PurchaseInfoItems = (props: Props) => {
  const { sectionMode, formHelper, onEditClick } = props;
  const { t } = useTranslation();

  const { dynamicFieldSectionElement } = useDynamicFieldSection(
    'purchaseInfo',
    sectionMode,
    onEditClick
  );

  return (
    <div className="grid gap-8">
      <div className="flex align-items-center gap-4">
        <CostIcon className="mr4" fontSize="small" />
        <CatTypography variant="body1">{t('assets.asset_edit.purchase_info_title')}</CatTypography>
      </div>
      <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <PurchaseFirmItem formHelper={formHelper} mode={sectionMode} onEditClick={onEditClick} />
        <PurchaseCostItem formHelper={formHelper} mode={sectionMode} onEditClick={onEditClick} />
        <PurchaseDateItem formHelper={formHelper} mode={sectionMode} onEditClick={onEditClick} />
        {dynamicFieldSectionElement}
      </div>
    </div>
  );
};

export default PurchaseInfoItems;
