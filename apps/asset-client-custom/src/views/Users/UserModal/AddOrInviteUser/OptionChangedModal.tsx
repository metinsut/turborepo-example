import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { withDialogWrapper } from 'hooks';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  className?: string;
  onClose?: () => void;
  onDelete?: () => void;
  open: boolean;
};

function OptionChangedModal(props: Props) {
  const { className, onClose, onDelete, open } = props;

  const { t } = useTranslation();
  const handleDelete = async () => onDelete();
  return (
    <CatDialog className={className} onClick={handleDelete} onClose={onClose} open={open}>
      <CatDialogTitle
        closable
        iconComponent={TrashIcon}
        title={t('users.modal.add_or_invite_users.option_changed_dialog_title')}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          <Trans i18nKey="users.modal.add_or_invite_users.option_changed_dialog_message" t={t} />
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(OptionChangedModal);
