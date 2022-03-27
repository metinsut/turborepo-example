import { Asset } from 'store/slices/asset/detail/types';
import { Category } from 'store/slices/categories/types';
import {
  cancelCategorySelectionForAsset,
  getCategoryWithAncestors,
  setSelectedCategory
} from 'store/slices/categories/actions';
import {
  getAssetCategory,
  setAssetCategory as setAssetCategoryAction
} from 'store/slices/asset/detail/actions';
import { useMountedState } from 'react-use';
import { useTypedDispatch } from 'hooks';
import Assigned from './Assigned';
import CategorySelectorDialog from 'views/Categories/CategorySelectorDialog';
import NotAssigned from './NotAssigned';
import NotAssignedDisabled from './NotAssignedDisabled';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type Props = {
  asset: Asset;
  className?: string;
  onEditClick?: () => void;
};

function CategoryItem(props: Props) {
  const { asset, className, onEditClick } = props;
  const { brandId, categoryId, modelId } = asset;
  const dispatch = useTypedDispatch();
  const getIsMounted = useMountedState();

  const brandAndModelSelected = !!(brandId && modelId);
  const assigned = !!categoryId;

  const [category, setCategory] = useState<Category>(null);
  useEffect(() => {
    const asyncCall = async () => {
      const categoryWithAncestors = await dispatch(getCategoryWithAncestors(categoryId));
      if (getIsMounted()) {
        setCategory(categoryWithAncestors);
      }
    };

    asyncCall();
  }, [categoryId, dispatch, getIsMounted]);

  useEffect(() => {
    if (brandAndModelSelected) {
      dispatch(getAssetCategory(asset.mainCategoryId, brandId, modelId));
    }
  }, [asset.mainCategoryId, brandAndModelSelected, brandId, dispatch, modelId]);

  const [categorySelectDialogOpen, setCategorySelectDialogOpen] = React.useState(false);
  const handleCategorySelect = async (categoryId: string) => {
    await dispatch(setAssetCategoryAction(categoryId, brandId, modelId));
  };

  const handleCancel = async () => {
    await dispatch(cancelCategorySelectionForAsset(category));
  };

  const handleEditButtonClicked = useCallback(() => {
    dispatch(setSelectedCategory(category));
    setCategorySelectDialogOpen(true);
    onEditClick?.();
  }, [category, dispatch, onEditClick]);

  const cardContent = useMemo(() => {
    let content = <></>;
    if (!brandAndModelSelected) {
      content = <NotAssignedDisabled className={className} />;
    } else if (assigned) {
      content = (
        <Assigned
          autoAssigned={asset.isCategoryAutoAssigned}
          category={category}
          className={className}
          onEdit={handleEditButtonClicked}
        />
      );
    } else {
      content = <NotAssigned className={className} onEdit={handleEditButtonClicked} />;
    }

    return content;
  }, [
    asset.isCategoryAutoAssigned,
    assigned,
    brandAndModelSelected,
    category,
    className,
    handleEditButtonClicked
  ]);

  return (
    <>
      <CategorySelectorDialog
        allowAddMainCategory={false}
        allowTraverseIfUnapprovedModelExists="onlyInSessions"
        category={category}
        defaultExpandMainCategoryId={asset.mainCategoryId}
        disableOtherMainCategories
        onCancel={handleCancel}
        onCategorySelect={handleCategorySelect}
        onClose={() => setCategorySelectDialogOpen(false)}
        open={categorySelectDialogOpen}
      />
      {cardContent}
    </>
  );
}

export default CategoryItem;
