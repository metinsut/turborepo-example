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
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  className?: string;
  onClose?: () => void;
  onDelete?: () => void;
  open: boolean;
};

function CustodyDeleteDialog(props: Props) {
  const { className, onClose, onDelete, open } = props;

  const { t } = useTranslation();

  const handleDelete = async () => {
    await onDelete();
  };
  return (
    <CatDialog className={className} onAction={handleDelete} onClose={onClose} open={open}>
      <CatDialogTitle
        closable
        iconComponent={TrashIcon}
        title={t('assets.asset_edit.custody_delete_dialog_title')}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          {t('assets.asset_edit.custody_delete_warning')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={RemoveButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(CustodyDeleteDialog);
