import { Modal, Typography } from 'catamaran/core/mui';
import { selectCategoryv2ById } from 'store/slices/categoriesv2/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { withDialogWrapper } from 'hooks';
import BottomBar from 'components/BottomBar';
import Brands from './Brands/Brands';
import Models from './Models/Models';
import React from 'react';

type Props = {
  categoryId: string;
  onClose: () => void;
  open: boolean;
};

function BrandModelDialog(props: Props) {
  const { categoryId, open, onClose } = props;
  const { t } = useTranslation();

  const selectedCategory = useTypedSelector((state) => selectCategoryv2ById(state, categoryId));

  return (
    <Modal onClick={(e) => e.stopPropagation()} onClose={onClose} open={open}>
      <div
        className="grid gap-24 h-full justify-item-center"
        style={{ gridTemplateRows: '1fr auto', maxHeight: '100%', padding: '64px 0 24px 0' }}
      >
        <div className="flex justify-content-center" style={{ height: 'calc(100vh - 150px)' }}>
          <Brands category={selectedCategory} />
          <Models categoryId={selectedCategory.id} />
        </div>
        <BottomBar
          className="radius-32 h-48"
          onGoBack={onClose}
          textElement={
            <Typography component="p" variant="body2">
              {t('asset_configurations.brands.brand_model_dialog_bottom_text', {
                categoryName: selectedCategory.name
              })}
            </Typography>
          }
        />
      </div>
    </Modal>
  );
}

export default withDialogWrapper(BrandModelDialog);
