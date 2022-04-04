import { CatChip, CatTypography } from 'catamaran/core';
import { UserStatus } from 'store/slices/users/common/types';
import { removeUserStatus } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: UserStatus[];
  modal?: boolean;
}

const UserStatusChip = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const removeUserStatusFromFilter = (branch: UserStatus) => {
    dispatch(removeUserStatus(branch));
  };
  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('users.filter.status')}:
      </CatTypography>
      {values.map((item: UserStatus) => (
        <CatChip key={item} label={item} onDelete={() => removeUserStatusFromFilter(item)} />
      ))}
    </div>
  );
};

export default UserStatusChip;
