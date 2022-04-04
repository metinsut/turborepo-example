import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { withDialogWrapper } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';

type Props = {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  userName?: string;
};

function UserCancelInvitationModal(props: Props) {
  const { onClose, open, onConfirm, userName } = props;

  const { t } = useTranslation();
  const handleGoBack = () => {
    onClose();
  };

  const handleCancelInvitation = async () => {
    await onConfirm();
    onClose();
  };

  const handleDialogClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <CatDialog
      onAction={handleCancelInvitation}
      onClick={handleDialogClick}
      onClose={handleGoBack}
      open={open}
    >
      <CatDialogTitle
        iconComponent={CancelIcon}
        title={<Trans i18nKey="users.modal.cancel_invitation.header" t={t} />}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          <Trans i18nKey="users.modal.cancel_invitation.description" t={t} values={{ userName }} />
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton color="red" endIcon={<CancelIcon />} size="large" variant="action">
          {t('common.cancel_invitation')}
        </CatDialogButton>
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(UserCancelInvitationModal);
