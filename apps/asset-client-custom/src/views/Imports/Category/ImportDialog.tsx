import {
  CatDialog,
  CatDialogAction,
  CatDialogContent,
  CatDialogTitle,
  CatTypography,
  DialogLegacy
} from 'catamaran/core';
import { ConfirmButton, GoBackButton } from 'catamaran/core/Button';
import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import {
  cancelCategoryImport,
  confirmCategoryImport,
  getCategoryImportByUserId
} from 'store/slices/imports/category/actions';
import { clearCategoryImportStatus, updateDialogOpen } from 'store/slices/imports/category/slice';
import {
  selectCategoryImport,
  selectCategoryImportDialogOpen
} from 'store/slices/imports/category/selectors';
import { useDialogState, useTypedDispatch, useTypedSelector } from 'hooks';
import ImportBottomBar from '../BottomBar/ImportBottomBar';
import React, { useCallback, useEffect } from 'react';
import ReportItem from './Report/ReportItem';
import TemplateDownloadItem from './TemplateDownloadItem';
import TrashIcon from 'catamaran/icons/Trash';
import UploadCategoryExcelItem from './UploadCategoryExcelItem';
import UploadResultItem from './UploadResultItem';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '70%'
  },
  gridItem: {
    marginRight: theme.spacing(1)
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

function CategoryImportDialog(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getCategoryImportByUserId());
  }, [dispatch]);

  const categoryImport = useTypedSelector(selectCategoryImport);
  const dialogOpen = useTypedSelector(selectCategoryImportDialogOpen);

  const handleClose = useCallback(() => {
    dispatch(updateDialogOpen(false));
  }, [dispatch]);

  const handleUpload = useCallback(async () => {
    await dispatch(confirmCategoryImport());
  }, [dispatch]);

  const { isOpen: cancelDialogOpen, togglePopup: toggleCancelDialog } = useDialogState();

  const [stayOpenDialog, setStayOpenDialog] = React.useState(false);

  const handleCancel = (stayOpen: boolean) => {
    setStayOpenDialog(stayOpen);
    toggleCancelDialog(true);
  };

  const handleCancelDialogConfirmed = useCallback(async () => {
    toggleCancelDialog(false);
    await dispatch(cancelCategoryImport());
    await dispatch(updateDialogOpen(stayOpenDialog));
  }, [dispatch, stayOpenDialog, toggleCancelDialog]);

  const handleCancelDialogClosed = () => {
    toggleCancelDialog(false);
  };
  const handleFinish = useCallback(async () => {
    await dispatch(clearCategoryImportStatus());
    handleClose();
  }, [dispatch, handleClose]);

  const handleUploadAgain = useCallback(async () => {
    await dispatch(clearCategoryImportStatus());
  }, [dispatch]);

  return (
    <DialogLegacy
      className={clsx(className, classes.root)}
      fullScreen
      onClose={handleClose}
      open={dialogOpen}
    >
      <div className={classes.container}>
        <CatDialog onClose={handleClose} open={cancelDialogOpen}>
          <CatDialogTitle iconComponent={TrashIcon} title="Warning" />
          <CatDialogContent>
            <CatTypography variant="body1">Do you want to cancel category import?</CatTypography>
          </CatDialogContent>
          <CatDialogAction>
            <GoBackButton onClick={handleCancelDialogClosed} />
            <ConfirmButton onClick={handleCancelDialogConfirmed} />
          </CatDialogAction>
        </CatDialog>
        <Grid
          alignItems="center"
          className={classes.modalContent}
          container
          justifyContent="space-evenly"
        >
          <Grid />
          <Grid container direction="column" justifyContent="center">
            {categoryImport?.state === 'confirmed' || categoryImport?.state === 'finished' ? (
              <UploadResultItem categoryImport={categoryImport} />
            ) : (
              <>
                <TemplateDownloadItem />
                <UploadCategoryExcelItem categoryImport={categoryImport} onCancel={handleCancel} />
                <ReportItem categoryImport={categoryImport} />
              </>
            )}
          </Grid>
          <ImportBottomBar
            importState={categoryImport?.state}
            onCancel={handleCancel}
            onFinish={handleFinish}
            onMinimize={handleClose}
            onUpload={handleUpload}
            onUploadAgain={handleUploadAgain}
          />
        </Grid>
      </div>
    </DialogLegacy>
  );
}

export default CategoryImportDialog;
