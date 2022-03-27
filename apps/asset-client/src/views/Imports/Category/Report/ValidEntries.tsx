import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  ImageList,
  Theme,
  makeStyles
} from 'catamaran/core/mui';
import { CategoryImport } from 'store/slices/imports/types';
import { useCollapse } from 'hooks/useCollapse';
import React from 'react';
import ValidEntryHeader from './ValidEntryHeader';
import ValidEntryItem from './ValidEntryItem';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  cardContent: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1, 2)
  },
  gridList: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 0)
  },
  root: {
    border: 1,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1)
  }
}));

type Props = {
  className?: string;
  categoryImport?: CategoryImport;
};

function ValidEntries(props: Props) {
  const classes = useStyles();
  const { className, categoryImport } = props;

  const { collapseButtonElement, open } = useCollapse(false);

  return (
    <Card className={clsx(classes.root, className)}>
      <Grid container justifyContent="center">
        <Grid item xs={9}>
          <CardContent className={classes.cardContent}>
            <ValidEntryHeader categoryImport={categoryImport} />
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <CardActions disableSpacing>{collapseButtonElement}</CardActions>
        </Grid>
      </Grid>
      <Collapse in={open}>
        <ImageList className={classes.gridList} cols={8}>
          {categoryImport.successEntries?.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ValidEntryItem key={index} successEntry={entry} />
          ))}
        </ImageList>
      </Collapse>
    </Card>
  );
}

export default ValidEntries;
