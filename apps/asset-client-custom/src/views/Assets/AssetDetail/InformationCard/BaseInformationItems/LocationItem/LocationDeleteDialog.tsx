import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { GoBackButton, RemoveButton } from 'catamaran/core/Button';
import { useTranslation } from 'react-i18next';
import { withDialogWrapper } from 'hooks';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  onClose?: () => void;
  onDelete?: () => void;
  open: boolean;
};

function LocationDeleteDialog(props: Props) {
  const { onClose, onDelete, open } = props;

  const { t } = useTranslation();

  const handleDelete = async () => {
    await onDelete();
  };

  return (
    <CatDialog onAction={handleDelete} onClose={onClose} open={open}>
      <CatDialogTitle
        closable
        iconComponent={TrashIcon}
        title={t('assets.asset_edit.location_delete_dialog_title')}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          {t('assets.asset_edit.location_delete_warning')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={RemoveButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(LocationDeleteDialog);
