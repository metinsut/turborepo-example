import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { useTranslation } from 'react-i18next';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  className?: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

function DeleteFilterDialog(props: Props) {
  const { className, onClose, open, onConfirm } = props;

  const { t } = useTranslation();

  const handleDelete = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <CatDialog className={className} onAction={handleDelete} onClose={onClose} open={open}>
      <CatDialogTitle
        iconComponent={TrashIcon}
        title={t('assets.assetFilter.delete_filter_header')}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          {t('assets.assetFilter.delete_filter_description')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default DeleteFilterDialog;
