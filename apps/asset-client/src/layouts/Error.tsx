import { makeStyles } from 'catamaran/core/mui';
import React from 'react';

const useStyles = makeStyles(() => ({
  content: {
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden'
  },
  root: {
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    },
    display: 'flex',
    minHeight: '100vh'
  }
}));

type Props = {
  children: React.ReactNode;
};

function Error({ children }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default Error;
