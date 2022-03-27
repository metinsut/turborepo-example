import { CatChip, CatTypography } from 'catamaran/core';
import { DateFilterType } from 'components/DateFilter/types';
import { DefinitionPlanTypes } from 'store/slices/asset/filter/types';
import { removeDefinitionEndDate } from 'store/slices/asset/filter/slice';
import { useDateFilterChipText } from 'components/DateFilter/hooks';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  value?: DateFilterType;
  modal?: boolean;
  planType?: DefinitionPlanTypes;
}

const DefinitionEndDateChip = ({ value, modal, planType }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const filterChipText = useDateFilterChipText(value);

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t(`assets.protection.${planType}_field`) + t('assets.assetFilter.plan_ending_date')}:
      </CatTypography>
      <CatChip
        key={value.type}
        label={filterChipText}
        onDelete={() => dispatch(removeDefinitionEndDate(planType))}
      />
    </div>
  );
};

export default DefinitionEndDateChip;
