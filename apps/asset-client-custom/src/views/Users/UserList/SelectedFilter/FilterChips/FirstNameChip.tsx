import { CatChip, CatTypography } from 'catamaran/core';
import { removeFirstName } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  value?: string;
  modal?: boolean;
}

const FirstNameChip = ({ value, modal }: Props) => {
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
        {t('users.filter.first_name')}:
      </CatTypography>
      <CatChip label={value} onDelete={() => dispatch(removeFirstName())} />
    </div>
  );
};

export default FirstNameChip;
