import { CategoryImport } from 'store/slices/imports/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { getInvalidEntries } from 'store/slices/imports/category/actions';
import { useTypedDispatch } from 'hooks';
import InvalidEntries from 'views/Imports/ReportShared/InvalidEntries';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  categoryImport?: CategoryImport;
};

function CategoryInvalidEntries(props: Props) {
  const classes = useStyles();
  const { className, categoryImport } = props;

  const dispatch = useTypedDispatch();

  const handleDownload = () => {
    dispatch(getInvalidEntries(categoryImport.id));
  };

  return (
    <InvalidEntries
      className={clsx(classes.root, className)}
      failedEntries={categoryImport.failedEntries}
      failedEntryCount={categoryImport.failedEntryCount}
      onDownload={handleDownload}
      totalEntryCount={categoryImport.totalEntryCount}
      type="category"
    />
  );
}

export default CategoryInvalidEntries;
