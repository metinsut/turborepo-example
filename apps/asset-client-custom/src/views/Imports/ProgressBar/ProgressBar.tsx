import { Card, Grid, LinearProgress, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  progressBar: {
    margin: theme.spacing(1)
  },
  resultGrid: {
    margin: theme.spacing(1, 0)
  },
  root: {
    border: 1,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1)
  },
  text: {
    margin: theme.spacing(1)
  }
}));

type Props = {
  className?: string;
  percentage: number;
  statusMessage: string;
};

function ProgressBar(props: Props) {
  const classes = useStyles();
  const { className, percentage, statusMessage } = props;

  return (
    <Card className={clsx(classes.root, className)}>
      <LinearProgress className={classes.progressBar} value={percentage} variant="determinate" />
      <Grid className={classes.resultGrid} container justifyContent="space-between">
        <Grid item>
          <Typography align="center" className={classes.text} component="p" variant="body1">
            {statusMessage}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" className={classes.text} component="p" variant="body1">
            {`${percentage}%`}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProgressBar;
