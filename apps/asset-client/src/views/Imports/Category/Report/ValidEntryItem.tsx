import { Box, ImageListItem, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { SuccessEntry } from 'store/slices/imports/types';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    border: 1,
    borderColor: theme.palette.secondary.main
  },
  root: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  successText: {
    color: theme.palette.success.main
  }
}));

type Props = {
  successEntry?: SuccessEntry;
};

function ValidEntryItem(props: Props) {
  const classes = useStyles();
  const { successEntry } = props;

  return (
    <ImageListItem className={classes.root}>
      <Box className={classes.box}>
        <Typography align="center" className={classes.successText} variant="h2">
          {successEntry.count}
        </Typography>
      </Box>
      <Typography variant="h6">{successEntry.type}</Typography>
    </ImageListItem>
  );
}

export default ValidEntryItem;
