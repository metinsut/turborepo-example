import { Brand } from 'store/slices/brands/types';
import {
  addBrandToCategory,
  removeBrandFromCategory,
  toggleExpandedBrand
} from 'store/slices/brands/actions';
import { refreshCategory } from 'store/slices/categories/actions';
import {
  selectBrandById,
  selectIsExpanded,
  selectSearchBrands
} from 'store/slices/brands/selectors';
import { temporaryBrandId } from 'store/common';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import BrandItem from './BrandItem';
import React, { useCallback } from 'react';

type Props = {
  brandId: string;
  categoryId: string;
};

function BrandItemStoreWrapper(props: Props) {
  const { brandId, categoryId } = props;

  const brand = useTypedSelector((state) => selectBrandById(state, brandId));

  const dispatch = useTypedDispatch();

  const refreshBrandCategory = useCallback(
    (categoryId: string) => {
      dispatch(refreshCategory(categoryId));
    },
    [dispatch]
  );

  const handleConfirm = useCallback(
    async (entity: Brand) => {
      const brandToAdd = entity;
      const finalBrand = await dispatch(addBrandToCategory(brandToAdd, categoryId));

      refreshBrandCategory(categoryId);
      return finalBrand;
    },
    [dispatch, categoryId, refreshBrandCategory]
  );

  const handleRemove = useCallback(async () => {
    await dispatch(removeBrandFromCategory(categoryId, brandId));
    refreshBrandCategory(categoryId);
  }, [dispatch, categoryId, brandId, refreshBrandCategory]);

  const handleClose = useCallback(async () => {
    await dispatch(removeBrandFromCategory(categoryId, temporaryBrandId));
    refreshBrandCategory(categoryId);
  }, [categoryId, dispatch, refreshBrandCategory]);

  const handleExpand = useCallback(async () => {
    dispatch(toggleExpandedBrand(brand.id));
  }, [dispatch, brand]);

  const isExpanded = useTypedSelector((state) => selectIsExpanded(state, brandId));

  const searchableBrands = useTypedSelector(selectSearchBrands);

  const defaultReadonly = brandId !== temporaryBrandId;

  if (!brand) {
    return null;
  }

  return (
    <BrandItem
      brand={brand}
      defaultFocused
      defaultReadonly={defaultReadonly}
      editable={false}
      expandable
      expanded={isExpanded}
      onAddNew={handleConfirm}
      onClose={handleClose}
      onConfirm={handleConfirm}
      onExpand={handleExpand}
      onRemove={handleRemove}
      searchableBrands={searchableBrands}
      showCountBadge
      size="small"
    />
  );
}

export default BrandItemStoreWrapper;
