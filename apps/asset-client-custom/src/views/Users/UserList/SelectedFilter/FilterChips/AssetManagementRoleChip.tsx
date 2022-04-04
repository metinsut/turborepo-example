import { CatChip, CatTypography } from 'catamaran/core';
import { removeAssetManagementRole } from 'store/slices/users/filter/slice';
import { selectUserRoleById } from 'store/slices/users/common/selectors';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

interface ChipProps {
  item?: string;
}

const ChipLabel = ({ item }: ChipProps) => {
  const userRole = useMemo(() => selectUserRoleById(item), [item]);
  return <span>{userRole?.name}</span>;
};
const AssetManagementRoleChip = ({ values, modal }: Props) => {
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
        {t('users.filter.role')}:
      </CatTypography>
      {values.map((item: string) => (
        <CatChip
          key={item}
          label={<ChipLabel item={item} />}
          onDelete={() => dispatch(removeAssetManagementRole(item))}
        />
      ))}
    </div>
  );
};

export default AssetManagementRoleChip;
