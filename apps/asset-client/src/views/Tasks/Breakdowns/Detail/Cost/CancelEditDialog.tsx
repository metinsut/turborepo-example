import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DiscardButton, GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  handleCloseDialog: () => void;
  onToggle: (status?: boolean) => void;
  open: boolean;
};

function CancelEditDialog({ handleCloseDialog, onToggle, open }: Props) {
  const { t } = useTranslation();

  const handleDiscard = async () => {
    handleCloseDialog();
    onToggle(false);
  };

  return (
    <CatDialog onAction={handleDiscard} onClose={() => onToggle(false)} open={open}>
      <CatDialogTitle
        iconComponent={TrashIcon}
        title={t('tasks.detail.cost.discard_dialog_title')}
      />
      <CatDialogContent>
        <CatTypography className="mb16" variant="body1">
          <Trans i18nKey="tasks.detail.cost.edit_delete_dialog_explanation" t={t} />
        </CatTypography>
        <CatTypography variant="body1">
          {t('tasks.detail.cost.edit_delete_dialog_desc')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DiscardButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default CancelEditDialog;
