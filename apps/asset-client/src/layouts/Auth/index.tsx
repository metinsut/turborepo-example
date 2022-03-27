import { Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    },
    display: 'flex',
    minHeight: '100vh'
  },
  content: {
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 56
    }
  }
}));

type Props = {
  children: React.ReactNode;
};

function Auth({ children }: Props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
}

export default Auth;
