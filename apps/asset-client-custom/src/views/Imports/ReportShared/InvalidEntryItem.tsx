import { CatIconButton } from 'catamaran/core';
import { FailedEntry } from 'store/slices/imports/types';
import { TableCell, TableRow, Theme, makeStyles } from 'catamaran/core/mui';
import CancelIcon from 'catamaran/icons/Cancel';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  errorText: {
    color: theme.palette.error.main
  },
  root: {}
}));

type Props = {
  className?: string;
  failedEntry?: FailedEntry;
};

function InvalidEntryItem(props: Props) {
  const classes = useStyles();
  const { className, failedEntry } = props;

  return (
    <TableRow className={clsx(className, classes.root)}>
      <TableCell>{failedEntry.rows.length}</TableCell>
      <TableCell>{failedEntry.rows.join(', ')}</TableCell>
      <TableCell>{failedEntry.errorMessage}</TableCell>
      <TableCell>
        <CatIconButton>
          <CancelIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      </TableCell>
    </TableRow>
  );
}

export default InvalidEntryItem;
