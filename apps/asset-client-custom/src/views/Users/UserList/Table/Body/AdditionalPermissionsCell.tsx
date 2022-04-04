import { TableCell, Tooltip } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import AdditionalPermLocationIcon from 'catamaran/icons/AdditionalPermLocation';
import AdditionalPermPersonIcon from 'catamaran/icons/AdditionalPermPerson';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  additionalPermissions: string[];
}

const AdditionalPermissionsCell = ({ additionalPermissions }: Props) => {
  const { t } = useTranslation();
  const isUserAdmin = additionalPermissions.includes('UserAdmin');
  const isLocationAdmin = additionalPermissions.includes('LocationAdmin');
  return (
    <TableCell align="center" className="border-0">
      <div className={clsx(classes.userList_tableRow)}>
        {isUserAdmin && (
          <Tooltip arrow placement="bottom" title={t('users.permissions.UserAdmin')}>
            <div>
              <AdditionalPermPersonIcon />
            </div>
          </Tooltip>
        )}
        {isLocationAdmin && (
          <Tooltip arrow placement="bottom" title={t('users.permissions.LocationAdmin')}>
            <div>
              <AdditionalPermLocationIcon />
            </div>
          </Tooltip>
        )}
      </div>
    </TableCell>
  );
};

export default AdditionalPermissionsCell;
