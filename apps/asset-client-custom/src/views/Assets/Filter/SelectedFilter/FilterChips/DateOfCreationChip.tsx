import { CatChip, CatTypography } from 'catamaran/core';
import { DateFilterType } from 'components/DateFilter/types';
import { removeInformationCreatedDate } from 'store/slices/asset/filter/slice';
import { useDateFilterChipText } from 'components/DateFilter/hooks';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  value?: DateFilterType;
  modal?: boolean;
}

const DateOfCreationChip = ({ value, modal }: Props) => {
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
        {t('assets.assetFilter.date_of_creation')}:
      </CatTypography>
      <CatChip
        key={value.type}
        label={filterChipText}
        onDelete={() => dispatch(removeInformationCreatedDate())}
      />
    </div>
  );
};

export default DateOfCreationChip;
