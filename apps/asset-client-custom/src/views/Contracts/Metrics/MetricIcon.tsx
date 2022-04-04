import { IconBaseProps } from 'catamaran/icons/IconBase';
import { MetricType } from 'store/slices/contracts/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import RepairTimeIcon from 'catamaran/icons/RepairTime';
import ResponseTimeIcon from 'catamaran/icons/ResponseTime';
import SupplyTimeIcon from 'catamaran/icons/SupplyTime';
import UpTimeIcon from 'catamaran/icons/UpTime';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = IconBaseProps & {
  className?: string;
  metricType?: MetricType;
};

function MetricIcon(props: Props) {
  const classes = useStyles();
  const { className, metricType, ...rest } = props;

  let IconComponent;
  switch (metricType.name) {
    case 'Updown':
      IconComponent = UpTimeIcon;
      break;
    case 'Repair':
      IconComponent = RepairTimeIcon;
      break;
    case 'Response':
      IconComponent = ResponseTimeIcon;
      break;
    case 'Part Supply':
      IconComponent = SupplyTimeIcon;
      break;
    default:
      IconComponent = null;
      break;
  }

  return <IconComponent className={clsx(className, classes.root)} {...rest} />;
}

export default MetricIcon;
