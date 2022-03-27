import { IconBaseProps } from 'catamaran/icons/IconBase';
import { PlanType } from 'store/slices/plans/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import CalibrationIcon from 'catamaran/icons/Calibration';
import MaintenanceIcon from 'catamaran/icons/Maintenance';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = IconBaseProps & {
  className?: string;
  planType: PlanType;
};

function PlanTypeIcon(props: Props) {
  const classes = useStyles();
  const { className, planType, ...rest } = props;

  const IconComponent = getPlanIconComponent(planType);

  return <IconComponent className={clsx(className, classes.root)} color="darkGrey" {...rest} />;
}

export const getPlanIconComponent = (planType: PlanType) => {
  let IconComponent;

  switch (planType) {
    case 'calibration':
      IconComponent = CalibrationIcon;
      break;
    case 'maintenance':
      IconComponent = MaintenanceIcon;
      break;
    default:
      IconComponent = CalibrationIcon;
      break;
  }

  return IconComponent;
};

export default PlanTypeIcon;
