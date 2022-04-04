import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { removeBrandFromCategory } from 'store/slices/brandsv2/actions';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, withDialogWrapper } from 'hooks';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  brandId: string;
  categoryId: string;
  onClose: () => void;
  open: boolean;
};

function BrandDeleteDialog(props: Props) {
  const { brandId, categoryId, onClose, open } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const handleRemove = useCallback(async () => {
    await dispatch(removeBrandFromCategory(categoryId, brandId));
    onClose();
  }, [dispatch, categoryId, brandId, onClose]);

  return (
    <CatDialog onAction={handleRemove} onClose={onClose} open={open}>
      <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
      <CatDialogContent>
        <CatTypography variant="body1">
          {t('asset_configurations.brands.delete_warning')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(BrandDeleteDialog);
