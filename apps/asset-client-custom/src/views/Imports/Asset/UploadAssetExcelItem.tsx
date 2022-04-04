import { AssetImport } from 'store/slices/imports/types';
import { CatIconButton } from 'catamaran/core';
import { Grid, Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { postAssetImportFile } from 'store/slices/imports/asset/actions';
import { useDropzone } from 'react-dropzone';
import { useTypedDispatch } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';
import React, { useCallback } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  cancelButton: {
    display: 'none'
  },
  description: {
    margin: theme.spacing(2, 0)
  },
  gridButton: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  row: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  uploadGrid: {
    '&:hover $cancelButton': {
      display: 'inline-flex'
    },
    border: `1px dashed ${theme.palette.divider}`,
    outline: 'none',
    padding: theme.spacing(3)
  }
}));

type Props = {
  className?: string;
  assetImport?: AssetImport;
  onCancel?: (stayOpen: boolean) => void;
};

function UploadAssetExcelItem(props: Props) {
  const classes = useStyles();
  const { className, assetImport, onCancel } = props;

  const dispatch = useTypedDispatch();

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        await dispatch(postAssetImportFile(file));
      }
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    disabled: Boolean(assetImport),
    onDrop: handleDrop
  });

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid
        alignItems="center"
        className={classes.row}
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid container direction="column" item spacing={2} xs>
          <Grid item>
            <Typography component="p" variant="h5">
              Upload Prepared Excel
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.description} component="p" variant="body1">
              Please do not add any column to the excel.
            </Typography>
            <Typography className={classes.description} component="p" variant="body1">
              There’ll be *no category column*. Lighthouse determines the right category according
              to brand-model combination.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid className={classes.uploadGrid} container justifyContent="space-between">
            <Grid item>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  height: 50,
                  justifyContent: 'center',
                  width: 200
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div>
                  <Typography color="textPrimary" variant="body1">
                    {assetImport?.fileName ?? 'Drop files here'}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid className={classes.gridButton} item>
              <CatIconButton
                className={classes.cancelButton}
                disabled={!assetImport}
                onClick={() => onCancel(true)}
              >
                <CancelIcon color="red" contained fontSize="medium" />
              </CatIconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UploadAssetExcelItem;
