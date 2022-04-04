import { CatChip, CatTypography } from 'catamaran/core';
import { removePartsPolicy } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

const PartsPolicyChips = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.parts_policy')}:
      </CatTypography>
      {values.map((policy) => (
        <CatChip
          key={policy}
          label={t(`contracts.edit.parts.types.${policy}`)}
          onDelete={() => dispatch(removePartsPolicy(policy))}
        />
      ))}
    </div>
  );
};

export default PartsPolicyChips;
