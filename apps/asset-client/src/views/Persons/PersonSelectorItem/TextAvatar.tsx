import { Avatar, AvatarProps, Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '9px',
    height: 16,
    width: 16
  }
}));

type Props = AvatarProps;

function TextAvatar(props: Props) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return <Avatar className={clsx(classes.root, className)} {...rest} />;
}

export default TextAvatar;
