import {
  Button,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme
} from 'catamaran/core/mui';
import { Link as RouterLink } from 'react-router-dom';
import Page from 'components/Page';
import React from 'react';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(6)
  },
  image: {
    height: 'auto',
    maxHeight: 300,
    maxWidth: '100%',
    width: 560
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(6)
  },
  root: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    paddingTop: '10vh'
  }
}));

function Error401() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <p>asd</p>;
}

export default Error401;
