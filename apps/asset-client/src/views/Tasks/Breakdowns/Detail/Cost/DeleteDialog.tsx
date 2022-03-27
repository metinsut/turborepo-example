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
import { deleteBreakdownCost } from 'store/slices/breakdown/taskDetail/action';
import { useTypedDispatch } from 'hooks';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  breakdownId: string;
  breakdownCostId: string;
  onToggle: (open: boolean) => void;
  open: boolean;
};

function DeleteDialog({ breakdownId, breakdownCostId, onToggle, open }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const onDelete = async () => {
    await dispatch(deleteBreakdownCost(breakdownId, breakdownCostId));
    onToggle(false);
  };

  return (
    <CatDialog onAction={onDelete} onClose={() => onToggle(false)} open={open}>
      <CatDialogTitle
        iconComponent={TrashIcon}
        title={t('tasks.detail.cost.delete_dialog_title')}
      />
      <CatDialogContent>
        <CatTypography className="mb16" variant="body1">
          <Trans i18nKey="tasks.detail.cost.delete_dialog_explanation" t={t} />
        </CatTypography>
        <CatTypography variant="body1">{t('tasks.detail.cost.delete_dialog_desc')}</CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default DeleteDialog;
