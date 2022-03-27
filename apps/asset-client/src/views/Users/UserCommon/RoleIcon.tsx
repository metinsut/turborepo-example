import { AssetRole } from 'store/slices/users/details/types';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import { Theme, makeStyles } from 'catamaran/core/mui';
import AdminIcon from 'catamaran/icons/Admin';
import ExecutiveIcon from 'catamaran/icons/Executive';
import ManagerIcon from 'catamaran/icons/Manager';
import React from 'react';
import RequestOnlyIcon from 'catamaran/icons/RequestOnly';
import TechnicianIcon from 'catamaran/icons/Technician';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = IconBaseProps & {
  assetRoleType: AssetRole;
  className?: string;
};

function RoleIcon(props: Props) {
  const classes = useStyles();
  const { assetRoleType, className, ...rest } = props;

  const IconComponent = getRoleIconComponent(assetRoleType);

  return <IconComponent className={clsx(className, classes.root)} color="darkGrey" {...rest} />;
}

export const getRoleIconComponent = (roleType: AssetRole) => {
  let IconComponent;

  switch (roleType?.name) {
    case 'RequestOnly':
      IconComponent = RequestOnlyIcon;
      break;
    case 'Technician':
      IconComponent = TechnicianIcon;
      break;
    case 'Manager':
      IconComponent = ManagerIcon;
      break;
    case 'Executive':
      IconComponent = ExecutiveIcon;
      break;
    case 'Admin':
      IconComponent = AdminIcon;
      break;
    default:
      IconComponent = RequestOnlyIcon;
      break;
  }

  return IconComponent;
};

export default RoleIcon;
