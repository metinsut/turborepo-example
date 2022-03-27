import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { removeSubCategory } from 'store/slices/categoriesv2/actions';
import { useLoading, withDialogWrapper } from 'hooks';
import { useTranslation } from 'react-i18next';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  categoryId: string;
  togglePopup: () => void;
  open: boolean;
};

const DeleteSubCategoryModal = (props: Props) => {
  const { categoryId, togglePopup, open } = props;
  const { t } = useTranslation();
  const [loading, loadingDispatch] = useLoading();

  const handleRemoveSubCategory = async () => {
    await loadingDispatch(removeSubCategory(categoryId));
  };

  const onClose = () => togglePopup();

  return (
    <CatDialog
      onAction={handleRemoveSubCategory}
      onClick={(e) => e.stopPropagation()}
      onClose={onClose}
      open={open}
    >
      <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
      <CatDialogContent>
        <CatTypography variant="body1">
          {t('asset_configurations.categories.delete_warning')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} loading={loading} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
};

export default withDialogWrapper(DeleteSubCategoryModal);
