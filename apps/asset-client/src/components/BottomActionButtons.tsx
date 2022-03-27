import { Box, CatButton } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import CancelIcon from 'catamaran/icons/Cancel';
import React from 'react';
import RevertIcon from 'catamaran/icons/Revert';
import UploadIcon from 'catamaran/icons/Upload';
import clsx from 'clsx';
import theme from 'catamaran/theme';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  isCancelDisabled?: boolean;
  isConfirmDisabled?: boolean;
  isGoBackDisabled?: boolean;
  mode?: DisplayType;
  onCancel?: () => Promise<void>;
  onConfirm?: () => Promise<void>;
  onGoBack?: () => void;
  touched: boolean;
  useNext?: boolean;
};

function BottomActionButtons(props: Props) {
  const classes = useStyles();
  const {
    className,
    isCancelDisabled,
    isConfirmDisabled,
    isGoBackDisabled,
    mode = 'edit',
    onCancel,
    onConfirm,
    onGoBack,
    touched,
    useNext = false
  } = props;

  const [confirmLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<any>();
  const [cancelLoading, asyncCancelLoading] = useLoadingWithoutDispatch<any>();

  const commonLoading = confirmLoading || cancelLoading;

  const { t } = useTranslation();

  const handleConfirm = async () => {
    await asyncConfirmLoading(onConfirm());
  };

  const handleCancel = async () => {
    await asyncCancelLoading(onCancel());
  };

  return (
    <Box alignItems="center" className={clsx(className, classes.root)} display="flex" mt={2}>
      {!touched && mode === 'add' && (
        <CatButton
          color="red"
          disabled={isGoBackDisabled || commonLoading}
          onClick={handleCancel}
          size="large"
          startIcon={<CancelIcon />}
        >
          {t('common.cancel')}
        </CatButton>
      )}
      {!touched && mode === 'edit' && (
        <CatButton
          color="darkGrey"
          disabled={isGoBackDisabled || commonLoading}
          onClick={onGoBack}
          size="large"
          startIcon={<ArrowLeftIcon />}
        >
          {t('common.close')}
        </CatButton>
      )}
      {touched && (
        <CatButton
          color="red"
          disabled={isCancelDisabled || commonLoading}
          loading={cancelLoading}
          onClick={handleCancel}
          size="large"
          startIcon={mode === 'add' ? <CancelIcon /> : <RevertIcon />}
        >
          {mode === 'add' ? t('common.cancel') : t('common.revert')}
        </CatButton>
      )}
      <Box
        height={16}
        mx={2}
        style={{
          borderLeft: `1px solid ${theme.palette.darkGrey[300]}`
        }}
      />
      {!useNext && (
        <CatButton
          color="green"
          disabled={isConfirmDisabled || commonLoading || !touched}
          endIcon={<UploadIcon />}
          loading={confirmLoading}
          onClick={handleConfirm}
          size="large"
        >
          {mode === 'add' ? t('common.save') : t('common.confirm')}
        </CatButton>
      )}
      {useNext && (
        <CatButton
          color="blue"
          disabled={isConfirmDisabled || commonLoading || !touched}
          endIcon={<UploadIcon />}
          loading={confirmLoading}
          onClick={handleConfirm}
          size="large"
        >
          {t('common.next')}
        </CatButton>
      )}
    </Box>
  );
}

export default BottomActionButtons;
