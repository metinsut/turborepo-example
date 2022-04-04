import { CatChip, CatTypography } from 'catamaran/core';
import { availableAdditionalPermissions } from 'store/slices/users/common/data';
import { removeAdditionalPermissions } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

const AdditionalPermissionsChip = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const removeAdditionalPermissionsFromFilter = (branch: string) => {
    dispatch(removeAdditionalPermissions(branch));
  };
  const getPermissionNameById = (id: string) => availableAdditionalPermissions[id];

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('users.filter.permission')}:
      </CatTypography>
      {values.map((item: string) => (
        <CatChip
          key={item}
          label={getPermissionNameById(item)}
          onDelete={() => removeAdditionalPermissionsFromFilter(item)}
        />
      ))}
    </div>
  );
};

export default AdditionalPermissionsChip;
