import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { removeModelFromCategoryAndBrand } from 'store/slices/modelsv2/actions';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, withDialogWrapper } from 'hooks';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  brandId: string;
  categoryId: string;
  modelId: string;
  onClose: () => void;
  open: boolean;
};

function ModelDeleteDialog(props: Props) {
  const { brandId, categoryId, modelId, onClose, open } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const handleRemove = useCallback(async () => {
    await dispatch(removeModelFromCategoryAndBrand(categoryId, brandId, modelId));
    onClose();
  }, [dispatch, categoryId, brandId, modelId, onClose]);

  return (
    <CatDialog onAction={handleRemove} onClose={onClose} open={open}>
      <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
      <CatDialogContent>
        <CatTypography variant="body1">
          {t('asset_configurations.models.delete_warning')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(ModelDeleteDialog);
