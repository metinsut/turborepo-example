import { CatButton } from 'catamaran/core';
import { Grid, Paper, Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import LoadingIcon from 'catamaran/icons/Loading';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

const useStyles = makeStyles((theme: Theme) => ({
  CatButton: {
    margin: theme.spacing(0, 1)
  },
  bottomBarGrid: {
    height: '100%'
  },
  bottomBarText: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1)
  },
  root: {
    borderRadius: theme.spacing(4),
    height: '3rem',
    width: '80%'
  }
}));

type Props = {
  className?: string;
  isCancelDisabled?: boolean;
  isConfirmDisabled?: boolean;
  isDeleteDisabled?: boolean;
  isGoBackDisabled?: boolean;
  onCancel?: () => Promise<void>;
  onConfirm?: () => Promise<void>;
  onDelete?: () => void;
  onGoBack?: () => void;
  textElement?: React.ReactNode;
};

function BottomBar(props: Props) {
  const classes = useStyles();
  const {
    className,
    isCancelDisabled,
    isConfirmDisabled,
    isDeleteDisabled,
    isGoBackDisabled,
    onCancel,
    onConfirm,
    onDelete,
    onGoBack,
    textElement
  } = props;

  const [confirmLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<any>();
  const [cancelLoading, asyncCancelLoading] = useLoadingWithoutDispatch<any>();

  const commonLoading = confirmLoading || cancelLoading;

  const confirmVisible = !!onConfirm;
  const cancelVisible = !!onCancel;
  const deleteVisible = !!onDelete;
  const goBackVisible = !!onGoBack;
  const { t } = useTranslation();

  const handleConfirm = async () => {
    await asyncConfirmLoading(onConfirm());
  };

  const handleCancel = async () => {
    await asyncCancelLoading(onCancel());
  };

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid
        alignContent="center"
        className={classes.bottomBarGrid}
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid item>
          {goBackVisible && (
            <CatButton
              className={classes.CatButton}
              color="darkGrey"
              disabled={isGoBackDisabled || commonLoading}
              onClick={onGoBack}
              size="large"
              startIcon={<ArrowLeftIcon />}
            >
              {t('common.back')}
            </CatButton>
          )}
        </Grid>
        <Grid className={classes.bottomBarText} item xs>
          {textElement}
        </Grid>
        <Grid item>
          {cancelVisible && (
            <CatButton
              className={classes.CatButton}
              color="red"
              disabled={isCancelDisabled || commonLoading}
              onClick={handleCancel}
              size="large"
              startIcon={
                cancelLoading ? <LoadingIcon style={{ padding: '1px' }} /> : <CancelIcon />
              }
            >
              {t('common.cancel')}
            </CatButton>
          )}
          {deleteVisible && (
            <CatButton
              className={classes.CatButton}
              color="red"
              disabled={isDeleteDisabled || commonLoading}
              endIcon={<TrashIcon />}
              onClick={onDelete}
              size="large"
            >
              {t('common.delete')}
            </CatButton>
          )}
          {confirmVisible && (
            <CatButton
              className={classes.CatButton}
              color="green"
              disabled={isConfirmDisabled || commonLoading}
              endIcon={confirmLoading ? <LoadingIcon style={{ padding: '1px' }} /> : <CheckIcon />}
              onClick={handleConfirm}
              size="large"
            >
              {t('common.confirm')}
            </CatButton>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BottomBar;
