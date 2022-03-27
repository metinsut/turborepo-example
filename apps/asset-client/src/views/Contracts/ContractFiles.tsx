import { CatIconButton } from 'catamaran/core';
import { ContractProperty } from 'store/slices/contracts/types';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import FileIcon from 'catamaran/icons/File';
import PlusIcon from 'catamaran/icons/Plus';
import React, { useCallback } from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  dropText: {
    alignContent: 'center',
    color: '#69C9FF',
    display: 'grid',
    margin: theme.spacing(0, 1)
  },
  dropzoneArea: {
    backgroundColor: 'rgba(105,201,255,0.05)',
    border: 'dashed 1px rgba(105,201,255,0.6)',
    borderRadius: theme.spacing(3),
    marginLeft: theme.spacing(4),
    padding: theme.spacing(0.5),
    width: '50%'
  },
  header: {
    marginBottom: theme.spacing(1)
  },
  icon: {
    padding: theme.spacing(0.5)
  },
  marginSmall: {
    margin: theme.spacing(1)
  },
  root: {
    padding: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  contractProperty: ContractProperty;
  file?: File;
  setFile?: React.Dispatch<File>;
};

function ContractFiles(props: Props) {
  const classes = useStyles();
  const { className, contractProperty, file, setFile } = props;

  const { t } = useTranslation();
  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const droppedFile = acceptedFiles[0];
      setFile(droppedFile);
    },
    [setFile]
  );

  const handleCancel = () => setFile(undefined);

  const { getRootProps, getInputProps } = useDropzone({
    disabled: Boolean(file),
    onDrop: handleDrop
  });

  if (!contractProperty?.isVisible) {
    return null;
  }

  return (
    <Grid className={clsx(classes.root, className)} container>
      <Grid className={classes.header} container direction="row">
        <FileIcon className={clsx(classes.marginSmall, classes.icon)} color="lightGrey" contained />
        <Grid item style={{ width: '90%' }}>
          <Typography className={classes.marginSmall} variant="body1">
            {t('contracts.edit.file_title')}
          </Typography>
          <Typography className={classes.marginSmall} variant="body2">
            {t('contracts.edit.file_desc')}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.dropzoneArea} item {...getRootProps()}>
        <input {...getInputProps()} />
        <Grid container direction="row">
          {!file && (
            <CatIconButton>
              <PlusIcon color="blue" contained fontSize="large" />
            </CatIconButton>
          )}
          <Typography className={classes.dropText} color="textPrimary" variant="body1">
            {file?.name ?? t('contracts.edit.file_button')}
          </Typography>
          <Grid item xs />
          {file && (
            <CatIconButton onClick={handleCancel}>
              <TrashIcon color="red" contained fontSize="large" />
            </CatIconButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ContractFiles;
