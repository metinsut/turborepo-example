import { CatChip, CatTypography } from 'catamaran/core';
import { DateFilterType } from 'components/DateFilter/types';
import { removeLastUpdate } from 'store/slices/users/filter/slice';
import { useDateFilterChipText } from 'components/DateFilter/hooks';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: DateFilterType;
  modal?: boolean;
}

const LastUpdateChip = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const filterChipText = useDateFilterChipText(values);

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" noWrap variant="body2">
        {t('users.filter.last_update')}:
      </CatTypography>
      <CatChip label={filterChipText} onDelete={() => dispatch(removeLastUpdate())} />
    </div>
  );
};

export default LastUpdateChip;
