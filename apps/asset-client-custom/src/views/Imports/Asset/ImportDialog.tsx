import { DialogLegacy } from 'catamaran/core';
import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import {
  selectAssetImport,
  selectAssetImportCategoryId,
  selectAssetImportDialogOpen
} from 'store/slices/imports/asset/selectors';
import { updateAssetImportDialogOpen } from 'store/slices/imports/asset/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ImportBottomBar from '../BottomBar/ImportBottomBar';
import React, { useCallback } from 'react';
import ReportItem from './Report/ReportItem';
import TemplateDownloadItem from './TemplateDownloadItem';
import UploadAssetExcelItem from './UploadAssetExcelItem';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '70%'
  },
  modalContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1, 0)
  },
  root: {
    '& .MuiDialog-paper': {
      alignItems: 'center',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }
  }
}));

type Props = {
  className?: string;
};

function MultiAssetImportDialog(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();

  const dialogOpen = useTypedSelector(selectAssetImportDialogOpen);
  const assetImport = useTypedSelector(selectAssetImport);
  const categoryId = useTypedSelector(selectAssetImportCategoryId);

  const handleClose = useCallback(() => {
    dispatch(updateAssetImportDialogOpen(false));
  }, [dispatch]);

  return (
    <DialogLegacy
      className={clsx(className, classes.root)}
      fullScreen
      onClose={handleClose}
      open={dialogOpen}
    >
      <div className={classes.container}>
        <Grid
          alignItems="center"
          className={classes.modalContent}
          container
          justifyContent="space-evenly"
        >
          <Grid />
          <Grid container direction="column" justifyContent="center">
            <TemplateDownloadItem categoryId={categoryId} />
            {categoryId && (
              <>
                <UploadAssetExcelItem assetImport={assetImport} />
                <ReportItem assetImport={assetImport} />
              </>
            )}
          </Grid>
          <ImportBottomBar importState={assetImport?.state} onMinimize={handleClose} />
        </Grid>
      </div>
    </DialogLegacy>
  );
}

export default MultiAssetImportDialog;
