import { IconBaseProps } from 'catamaran/icons/IconBase';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Usability } from 'store/slices/contracts/types';
import NotUsableIcon from 'catamaran/icons/NotUsable';
import React from 'react';
import UsableIcon from 'catamaran/icons/Usable';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = IconBaseProps & {
  className?: string;
  usability: Usability;
};

function UsabilityIcon(props: Props) {
  const classes = useStyles();
  const { className, usability, ...rest } = props;

  let IconComponent;
  switch (usability) {
    case 'usable':
      IconComponent = UsableIcon;
      break;
    case 'notUsable':
      IconComponent = NotUsableIcon;
      break;
    default:
      IconComponent = null;
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

export default UsabilityIcon;
