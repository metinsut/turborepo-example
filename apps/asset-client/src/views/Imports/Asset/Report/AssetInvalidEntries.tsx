import { AssetImport } from 'store/slices/imports/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { getAssetImportInvalidEntries } from 'store/slices/imports/asset/actions';
import { useTypedDispatch } from 'hooks';
import InvalidEntries from 'views/Imports/ReportShared/InvalidEntries';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  assetImport?: AssetImport;
};

function AssetInvalidEntries(props: Props) {
  const classes = useStyles();
  const { className, assetImport } = props;

  const dispatch = useTypedDispatch();

  const handleDownload = () => {
    dispatch(getAssetImportInvalidEntries(assetImport.id));
  };

  return (
    <InvalidEntries
      className={clsx(classes.root, className)}
      failedEntries={assetImport.failedEntries}
      failedEntryCount={assetImport.failedEntryCount}
      onDownload={handleDownload}
      totalEntryCount={assetImport.totalEntryCount}
      type="asset"
    />
  );
}

export default AssetInvalidEntries;
