import { CatToggleCard, CatTypography } from 'catamaran/core';
import { PermissionIconsType } from 'store/slices/users/common/types';
import { availableAdditionalPermissions as permissions } from 'store/slices/users/common/data';
import { selectFilterAdditionalPermissions } from 'store/slices/users/filter/selectors';
import { updateAdditionalPermissions } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AdditionalPermLocationIcon from 'catamaran/icons/AdditionalPermLocation';
import AdditionalPermPersonIcon from 'catamaran/icons/AdditionalPermPerson';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

const permissionIcons: PermissionIconsType = {
  LocationAdmin: <AdditionalPermLocationIcon fontSize="large" />,
  UserAdmin: <AdditionalPermPersonIcon fontSize="large" />
};

const PermissionsFilter = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const additionalPermissions = useTypedSelector(selectFilterAdditionalPermissions);
  const handleToggleClick = (permissionId: string) => {
    dispatch(updateAdditionalPermissions(permissionId));
  };
  const checkToggleCardSelect = (permissionId: string) =>
    !!additionalPermissions.includes(permissionId);

  return (
    <div className={clsx(classes.filter_item_wrapper, 'px16')}>
      <CatTypography className="opacity-6" variant="body2">
        {t('users.filter.permission')}
      </CatTypography>
      <div className={classes.filter_role_toggle_wrapper}>
        {Object.keys(permissions).map((permission: string) => (
          <CatToggleCard
            className={classes.filter_role_toggle}
            keepIconColor
            key={permission}
            onClick={() => handleToggleClick(permission)}
            selected={checkToggleCardSelect(permission)}
          >
            <div className={clsx(classes.filter_permission_toggle_content, 'p10')}>
              {permissionIcons[permissions[permission]]}
              <CatTypography variant="caption">
                {t(`users.permissions.${permissions[permission]}`)}
              </CatTypography>
            </div>
          </CatToggleCard>
        ))}
      </div>
    </div>
  );
};

export default PermissionsFilter;
