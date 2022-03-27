import { CatDialogCheckBox, CatTypography } from 'catamaran/core';
import { CheckedListType } from 'store/slices/categories/types';
import { Trans, useTranslation } from 'react-i18next';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';

interface Props {
  checkList: CheckedListType;
  handleCheckBoxClick: (id: CheckListKey) => void;
}

type CheckListKey = keyof CheckedListType;

const checkListKeysOrdered: CheckListKey[] = [
  'subcategories',
  'brand_model',
  'sub_statuses',
  'breakdown_types',
  'breakdown_costs',
  'maintenance_costs',
  'retirement_reasons',
  'auto_flow',
  'department',
  'form_builder'
];

const CheckAllItemsForDeleteCategory = ({ checkList, handleCheckBoxClick }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="divider-horizontal my16" />
      <div className="flex align-items-center gap-16 mb16">
        <InfoCautionIcon />
        <CatTypography variant="body1">
          <Trans
            i18nKey="asset_configurations.categories.main_category_delete_modal.check_list_title"
            t={t}
          />
        </CatTypography>
      </div>
      <div className="grid gap-8">
        {checkListKeysOrdered.map((key) => (
          <CatDialogCheckBox
            checked={checkList[key]}
            index={key}
            key={key}
            onClick={() => handleCheckBoxClick(key)}
            text={
              <Trans
                i18nKey={`asset_configurations.categories.main_category_delete_modal.${key}`}
                t={t}
              />
            }
          />
        ))}
      </div>
    </>
  );
};

export default CheckAllItemsForDeleteCategory;
