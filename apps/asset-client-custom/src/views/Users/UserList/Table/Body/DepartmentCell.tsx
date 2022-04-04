import { TableCell, Tooltip } from 'catamaran/core/mui';
import { UsersListUser } from 'store/slices/users/list/types';
import { useTranslation } from 'react-i18next';
import GeneralAdminIcon from 'catamaran/icons/GeneralAdmin';
import Node from 'components/Node';
import RoleLevelIndicator from 'views/Users/UserModal/AssetRoles/RoleCard/RoleLevelIndicator';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';
import useRoleMatchSelector from 'hooks/useRoleMatchSelector';

interface Props {
  user: UsersListUser;
}

const DepartmentCell = ({ user }: Props) => {
  const { t } = useTranslation();

  const { assetRole, isGeneralAdmin } = user;
  const assetDepartments = user.assetDepartments ?? [];

  const [roleType] = useRoleMatchSelector({ assetRole, matchType: 'level' });

  const firstDepartmentName = assetDepartments[0]?.name;

  const departmentTooltipContent = assetDepartments
    .slice(1)
    .map((dep) => dep.name)
    .join(', ');

  const departmentCountForToolTip = (assetDepartments?.length - 1).toString();
  return (
    <TableCell className="border-0">
      <div className={clsx(classes.userList_tableRow, classes.userList_department)}>
        {isGeneralAdmin ? (
          <>
            <GeneralAdminIcon />
            <Node
              className="bg-gradient-yellow border-0"
              filled={false}
              value={t('users.list.body.general_admin')}
            />
          </>
        ) : (
          <>
            <Tooltip arrow placement="bottom" title={t(`users.roles.${roleType?.name}`)}>
              <div>
                <RoleLevelIndicator roleType={roleType} size="small" />
              </div>
            </Tooltip>
            {assetDepartments.length > 0 && (
              <Node
                className={classes.userList_department_node}
                filled={false}
                value={firstDepartmentName}
              />
            )}
            {assetDepartments.length > 1 && (
              <Tooltip arrow placement="bottom" title={departmentTooltipContent}>
                <div>
                  <Node filled value={departmentCountForToolTip} />
                </div>
              </Tooltip>
            )}
          </>
        )}
      </div>
    </TableCell>
  );
};

export default DepartmentCell;
