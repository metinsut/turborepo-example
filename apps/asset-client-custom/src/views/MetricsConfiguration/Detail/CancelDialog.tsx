import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DiscardButton, GoBackButton } from 'catamaran/core/Button';
import { metricReverted } from 'store/slices/metricsConfiguration/detail/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, withDialogWrapper } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';

type Props = {
  open: boolean;
  onClose: () => void;
};

const CancelDialog = ({ open, onClose }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleRevertDialogConfirm = async () => {
    dispatch(metricReverted());
    onClose();
  };

  return (
    <CatDialog onAction={handleRevertDialogConfirm} onClose={onClose} open={open}>
      <CatDialogTitle iconComponent={CancelIcon} title={t('common.discard_changes')} />
      <CatDialogContent>
        <CatTypography variant="body1">{t('common.discard_changes_description')}</CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DiscardButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
};

export default withDialogWrapper(CancelDialog);
