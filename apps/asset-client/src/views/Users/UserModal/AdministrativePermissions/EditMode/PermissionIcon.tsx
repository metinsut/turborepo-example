import { AdditionalPermissionType } from 'store/slices/users/common/types';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { availableAdditionalPermissions } from 'store/slices/users/common/data';
import AdditionalPermLocationIcon from 'catamaran/icons/AdditionalPermLocation';
import AdditionalPermPersonIcon from 'catamaran/icons/AdditionalPermPerson';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = IconBaseProps & {
  className?: string;
  permissionId: string;
};

function PermissionIcon(props: Props) {
  const classes = useStyles();
  const { className, permissionId, ...rest } = props;

  const permission = availableAdditionalPermissions[permissionId];
  const IconComponent = getPermissionIconComponent(permission);

  return <IconComponent className={clsx(className, classes.root)} color="darkGrey" {...rest} />;
}

export const getPermissionIconComponent = (permission: AdditionalPermissionType) => {
  let IconComponent;

  switch (permission) {
    case 'UserAdmin':
      IconComponent = AdditionalPermPersonIcon;
      break;
    case 'LocationAdmin':
      IconComponent = AdditionalPermLocationIcon;
      break;
    default:
      IconComponent = AdditionalPermPersonIcon;
      break;
  }

  return IconComponent;
};

export default PermissionIcon;
