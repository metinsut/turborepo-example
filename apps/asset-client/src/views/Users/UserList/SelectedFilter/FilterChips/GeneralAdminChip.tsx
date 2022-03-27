import { CatChip, CatTypography } from 'catamaran/core';
import { removeGeneralAdmin } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  value?: boolean;
  modal?: boolean;
}

const GeneralAdminChip = ({ value, modal }: Props) => {
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
        {t('users.roles.GeneralAdmin')}:
      </CatTypography>
      <CatChip
        label={value && t('users.roles.GeneralAdmin')}
        onDelete={() => dispatch(removeGeneralAdmin())}
      />
    </div>
  );
};

export default GeneralAdminChip;
