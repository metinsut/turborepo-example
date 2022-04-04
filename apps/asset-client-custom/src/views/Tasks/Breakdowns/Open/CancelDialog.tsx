import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DiscardButton, GoBackButton } from 'catamaran/core/Button';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { withDialogWrapper } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';

type Props = {
  open: boolean;
  onClose: () => void;
};

const CancelDialog = ({ open, onClose }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleCancelConfirm = async () => {
    history.goBack();
  };

  return (
    <CatDialog onAction={handleCancelConfirm} onClose={onClose} open={open}>
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
