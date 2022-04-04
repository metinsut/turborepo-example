import { AssetRole } from 'store/slices/users/details/types';
import { Box } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { maxSelectableLevel } from 'store/slices/users/details/data';
import React from 'react';
import clsx from 'clsx';

type StyleProps = {
  lightColors: boolean;
  size: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  emptyIndicator: {
    backgroundColor: (props: StyleProps) =>
      props.lightColors ? theme.palette.lightGrey[100] : theme.palette.darkGrey[100],
    borderRadius: theme.spacing(2),
    height: (props: StyleProps) => (props.size === 'small' ? '16px' : theme.spacing(2)),
    marginRight: (props: StyleProps) => (props.size === 'small' ? '2px' : theme.spacing(0.5)),
    width: (props: StyleProps) => (props.size === 'small' ? '4px' : theme.spacing(1))
  },
  filledIndicator: {
    background: theme.palette.greenGradient[800],
    borderRadius: theme.spacing(2),
    height: (props: StyleProps) => (props.size === 'small' ? '16px' : theme.spacing(3)),
    marginRight: (props: StyleProps) => (props.size === 'small' ? '2px' : theme.spacing(0.5)),
    width: (props: StyleProps) => (props.size === 'small' ? '4px' : theme.spacing(1))
  },
  root: {}
}));

type Props = {
  className?: string;
  lightColors?: boolean;
  roleType: AssetRole;
  size?: string;
};

const levels = Array.from(Array(maxSelectableLevel).keys());

function RoleLevelIndicator(props: Props) {
  const { className, lightColors, roleType, size } = props;
  const classes = useStyles({ lightColors, size });

  if (!roleType) {
    return null;
  }

  return (
    <Box alignItems="center" className={clsx(classes.root, className)} flex>
      {levels.map((val) =>
        val < roleType.roleStrength ? (
          <Box className={classes.filledIndicator} key={val} />
        ) : (
          <Box className={classes.emptyIndicator} key={val} />
        )
      )}
    </Box>
  );
}

export default RoleLevelIndicator;
