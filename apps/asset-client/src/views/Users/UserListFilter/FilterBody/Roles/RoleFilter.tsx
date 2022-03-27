import { AssetRole } from 'store/slices/users/common/types';
import { CatToggleCard, CatTypography } from 'catamaran/core';
import {
  selectFilterGeneralAdmin,
  selectFilterUserRoles
} from 'store/slices/users/filter/selectors';
import { updateGeneralAdmin, updateUserRoles } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { userRoles } from 'store/slices/users/common/data';
import GeneralAdminIcon from 'catamaran/icons/GeneralAdmin';
import RoleIcon from 'views/Users/UserCommon/RoleIcon';
import RoleLevelIndicator from 'views/Users/UserModal/AssetRoles/RoleCard/RoleLevelIndicator';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

const RoleFilter = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const roles = useTypedSelector(selectFilterUserRoles);
  const isGeneralAdmin = useTypedSelector(selectFilterGeneralAdmin);
  const handleRoleUpdate = (id: string) => {
    dispatch(updateUserRoles(id));
  };

  const handleGeneralAdmin = () => {
    dispatch(updateGeneralAdmin());
  };

  const checkToggleCardSelect = (permissionId: string) => !!roles.includes(permissionId);

  return (
    <div className={clsx(classes.filter_item_wrapper, 'px16')}>
      <CatTypography className="opacity-6" variant="body2">
        {t('users.filter.role')}
      </CatTypography>
      <div className={classes.filter_role_toggle_wrapper}>
        {userRoles.map((userRole: AssetRole) => (
          <CatToggleCard
            className={classes.filter_role_toggle}
            key={userRole.id}
            onClick={() => handleRoleUpdate(userRole.id)}
            selected={checkToggleCardSelect(userRole.id)}
          >
            <div className={clsx(classes.filter_role_toggle_content, 'p10')}>
              <RoleIcon assetRoleType={userRole} contained={false} hoverable={false} />
              <RoleLevelIndicator roleType={userRole} />
              <CatTypography variant="caption">{t(`users.roles.${userRole.name}`)}</CatTypography>
            </div>
          </CatToggleCard>
        ))}
        <CatToggleCard
          className={classes.filter_role_toggle}
          onClick={handleGeneralAdmin}
          selected={isGeneralAdmin}
        >
          <div className={clsx(classes.filter_role_toggle_content, 'p10')}>
            <GeneralAdminIcon fontSize="large" />
            <CatTypography variant="caption">{t('users.roles.GeneralAdmin')}</CatTypography>
          </div>
        </CatToggleCard>
      </div>
    </div>
  );
};

export default RoleFilter;
