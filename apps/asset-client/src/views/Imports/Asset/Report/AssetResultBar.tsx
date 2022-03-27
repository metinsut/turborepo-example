import { AssetImport } from 'store/slices/imports/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import {
  checkAssetImportStatusIsOnProgress,
  getAssetImportStatusById
} from 'store/slices/imports/asset/actions';
import { useTypedDispatch } from 'hooks';
import ProgressBar from '../../ProgressBar/ProgressBar';
import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  assetImport: AssetImport;
};

function AssetResultBar(props: Props) {
  const classes = useStyles();
  const { className, assetImport } = props;
  const dispatch = useTypedDispatch();

  useEffect(() => {
    let interval: number;
    if (assetImport) {
      interval = window.setInterval(() => {
        if (!checkAssetImportStatusIsOnProgress(assetImport)) {
          clearInterval(interval);
        } else {
          dispatch(getAssetImportStatusById(assetImport.id));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, assetImport]);

  const statusMessage = useMemo(() => {
    switch (assetImport.state) {
      case 'validationCheck':
        return 'Processing Assets';
      case 'confirmed':
        return 'Uploading Assets';
      case 'finished':
        return 'Completed';
      default:
        return '';
    }
  }, [assetImport.state]);

  return (
    <ProgressBar
      className={clsx(classes.root, className)}
      percentage={assetImport.percentage}
      statusMessage={statusMessage}
    />
  );
}

export default AssetResultBar;
