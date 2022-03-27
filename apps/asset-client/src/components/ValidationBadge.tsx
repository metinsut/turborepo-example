import { Theme, makeStyles } from 'catamaran/core/mui';
import InvalidFieldIcon from 'catamaran/icons/InvalidField';
import React from 'react';
import ValidFieldIcon from 'catamaran/icons/ValidField';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: 5
  },
  info: {
    background: theme.palette.blueGradient.main
  },
  root: {
    height: 14,
    marginLeft: -14,
    marginTop: -7,
    position: 'absolute',
    width: 14,
    zIndex: 1000
  }
}));

type Props = {
  className?: string;
  isValid: boolean;
};

function ValidationBadge(props: Props) {
  const classes = useStyles();
  const { className, isValid } = props;

  return isValid ? (
    <ValidFieldIcon className={clsx(classes.root, className)} />
  ) : (
    <InvalidFieldIcon className={clsx(classes.root, className)} />
  );
}

export default ValidationBadge;
