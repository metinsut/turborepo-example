import { IconBaseProps } from 'catamaran/icons/IconBase';
import { PartsPolicyType } from 'store/slices/contracts/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import CancelIcon from 'catamaran/icons/Cancel';
import PartsAllIcon from 'catamaran/icons/PartsAll';
import PartsExcludeIcon from 'catamaran/icons/PartsExclude';
import PartsIncludeIcon from 'catamaran/icons/PartsInclude';
import PartsNoneIcon from 'catamaran/icons/PartsNone';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = IconBaseProps & {
  className?: string;
  partsPolicy: PartsPolicyType;
};

function PartsPolicyItemIcon(props: Props) {
  const classes = useStyles();
  const { className, partsPolicy, ...rest } = props;

  let IconComponent;

  switch (partsPolicy) {
    case 'partsNotIncluded':
      IconComponent = PartsNoneIcon;
      break;
    case 'allParts':
      IconComponent = PartsAllIcon;
      break;
    case 'somePartsNotIncluded':
      IconComponent = PartsExcludeIcon;
      break;
    case 'somePartsIncluded':
      IconComponent = PartsIncludeIcon;
      break;
    case 'none':
      IconComponent = CancelIcon;
      break;
    default:
      IconComponent = CancelIcon;
      break;
  }

  return (
    <IconComponent
      className={clsx(classes.root, className)}
      color="darkGrey"
      contained={false}
      hoverable={false}
      {...rest}
    />
  );
}

export default PartsPolicyItemIcon;
