import { Button, Typography, makeStyles, useMediaQuery, useTheme } from 'catamaran/core/mui';
import { Link as RouterLink } from 'react-router-dom';
import Page from 'components/Page';
import React from 'react';

const useStyles = makeStyles((theme) => ({
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

function Error404() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Page className={classes.root} title="Error 404">
      <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
        404: The page you are looking for isn’t here
      </Typography>
      <Typography align="center" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever it is, try using
        the navigation
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Under development"
          className={classes.image}
          src="/static/images/undraw_page_not_found_su7k.svg"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button color="primary" component={RouterLink} to="/" variant="outlined">
          Back to home
        </Button>
      </div>
    </Page>
  );
}

export default Error404;
