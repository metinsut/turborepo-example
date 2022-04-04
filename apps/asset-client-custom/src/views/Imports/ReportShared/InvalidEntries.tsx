import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  makeStyles
} from 'catamaran/core/mui';
import { CatIconButton } from 'catamaran/core';
import { FailedEntry } from 'store/slices/imports/types';
import { useCollapse } from 'hooks/useCollapse';
import GetAppIcon from 'catamaran/icons/GetApp';
import InvalidEntryHeader from './InvalidEntryHeader';
import InvalidEntryItem from './InvalidEntryItem';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  CatButton: {
    margin: theme.spacing(0, 1)
  },
  cardContent: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1, 2)
  },
  root: {
    border: 1,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1)
  },
  table: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 0)
  }
}));

type Props = {
  className?: string;
  failedEntries?: FailedEntry[];
  failedEntryCount?: number;
  onDownload?: () => void;
  totalEntryCount?: number;
  type?: 'asset' | 'category';
};

function InvalidEntries(props: Props) {
  const classes = useStyles();
  const { className, failedEntries, failedEntryCount, onDownload, totalEntryCount, type } = props;

  const { collapseButtonElement, open } = useCollapse(false);

  return (
    <Card className={clsx(classes.root, className)}>
      <Grid container justifyContent="space-evenly">
        <Grid item xs={9}>
          <CardContent className={classes.cardContent}>
            <InvalidEntryHeader
              failedEntryCount={failedEntryCount}
              totalEntryCount={totalEntryCount}
              type={type}
            />
          </CardContent>
        </Grid>
        <Grid container item justifyContent="flex-end" xs={3}>
          <CardActions disableSpacing>
            <CatIconButton className={classes.CatButton} onClick={onDownload} size="large">
              <GetAppIcon color="red" contained fontSize="medium" />
            </CatIconButton>
            {collapseButtonElement}
          </CardActions>
        </Grid>
      </Grid>
      <Collapse in={open}>
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Count</TableCell>
                <TableCell>Row(s)</TableCell>
                <TableCell>Error</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {failedEntries?.map((failedEntry, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <InvalidEntryItem failedEntry={failedEntry} key={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Card>
  );
}

export default InvalidEntries;
