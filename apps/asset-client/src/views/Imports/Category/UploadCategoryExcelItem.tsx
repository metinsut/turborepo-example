import { CatIconButton } from 'catamaran/core';
import { CategoryImport } from 'store/slices/imports/types';
import { Grid, Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { postCategoryImport } from 'store/slices/imports/category/actions';
import { useDropzone } from 'react-dropzone';
import { useTypedDispatch } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';
import React, { useCallback } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  cancelButton: {
    display: 'none'
  },
  dropzoneArea: {
    alignItems: 'center',
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 200
  },
  dropzoneText: {
    margin: theme.spacing(2, 2)
  },
  gridButton: {
    alignItems: 'center',
    color: '#69C9FD',
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    fontSize: '40px'
  },
  root: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  top: {},
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
  categoryImport?: CategoryImport;
  onCancel?: (stayOpen: boolean) => void;
};

function UploadCategoryExcelItem(props: Props) {
  const classes = useStyles();
  const { className, categoryImport, onCancel } = props;

  const dispatch = useTypedDispatch();

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        await dispatch(postCategoryImport(file));
      }
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    disabled: Boolean(categoryImport),
    onDrop: handleDrop
  });

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid className={classes.root} container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography component="p" variant="h5">
            Upload Prepared Excel
          </Typography>
          <Typography component="p" variant="body1">
            Please do not add any column to the excel file and upload.
          </Typography>
        </Grid>
        <Grid item>
          <Grid className={classes.uploadGrid} container justifyContent="space-between">
            <Grid item>
              <div className={classes.dropzoneArea} {...getRootProps()}>
                <input {...getInputProps()} />
                <div>
                  <Typography color="textPrimary" variant="body1">
                    {categoryImport?.fileName ?? 'Drop files here'}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid className={classes.gridButton} item>
              <CatIconButton
                className={classes.cancelButton}
                disabled={!categoryImport}
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

export default UploadCategoryExcelItem;
