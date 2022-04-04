import { selectCategoryById } from 'store/slices/categories/selectors';
import { useTypedSelector } from 'hooks';
import { useUrlForBrandDialog } from './useUrlForBrandDialog';
import BrandModelDialog from 'views/Brands/BrandModelDialog';
import React from 'react';

function BrandModelManagement() {
  const { selectedCategoryId, open, handleDialogClose } = useUrlForBrandDialog();

  const selectedCategory = useTypedSelector((state) =>
    selectCategoryById(state, selectedCategoryId)
  );

  return <BrandModelDialog category={selectedCategory} onClose={handleDialogClose} open={open} />;
}

export default BrandModelManagement;
