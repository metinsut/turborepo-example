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
import TrashIcon from 'catamaran/icons/Trash';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete?: () => Promise<void>;
};

function DepartmentDeleteDialog(props: Props) {
  const { onClose, open, onDelete } = props;

  const { t } = useTranslation();
  const [deleteLoading, deleteLoadingDispatch] = useLoadingWithoutDispatch();

  const handleGoBack = () => {
    onClose();
  };

  const handleDelete = async () => {
    deleteLoadingDispatch(onDelete());
  };

  return (
    <CatDialog onAction={handleDelete} onClose={handleGoBack} open={open}>
      <CatDialogTitle iconComponent={TrashIcon} title={t('users.departments.delete.header')} />
      <CatDialogContent>
        <CatTypography variant="body1">
          <Trans i18nKey="users.departments.delete.description" t={t} />
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} loading={deleteLoading} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default DepartmentDeleteDialog;
