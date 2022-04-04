import {
  Model,
  addModelToCategoryAndBrand,
  deleteModelImage,
  removeModelFromCategoryAndBrand,
  selectModelById,
  selectSearchModels,
  updateModelImage
} from 'store/slices/models';
import { temporaryModelId } from 'store/common';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ModelItem from './ModelItem';
import React, { useCallback } from 'react';

type Props = {
  brandId: string;
  categoryId: string;
  modelId: string;
};

function ModelItemStoreWrapper(props: Props) {
  const { brandId, categoryId, modelId } = props;

  const model = useTypedSelector((state) => selectModelById(state, modelId));

  const dispatch = useTypedDispatch();

  const handleConfirm = useCallback(
    async (modelToUpdate: Model) => {
      const finalModel = await dispatch(
        addModelToCategoryAndBrand(modelToUpdate, categoryId, brandId)
      );
      return finalModel;
    },
    [brandId, categoryId, dispatch]
  );

  const handleRemove = useCallback(async () => {
    dispatch(removeModelFromCategoryAndBrand(categoryId, brandId, model.id));
  }, [brandId, categoryId, dispatch, model]);

  const handleClose = useCallback(async () => {
    dispatch(removeModelFromCategoryAndBrand(categoryId, brandId, temporaryModelId));
  }, [brandId, categoryId, dispatch]);

  const handleImageConfirm = useCallback(
    async (file) => {
      await dispatch(updateModelImage(modelId, file));
    },
    [dispatch, modelId]
  );

  const handleImageDelete = useCallback(async () => {
    await dispatch(deleteModelImage(modelId));
  }, [dispatch, modelId]);

  const searchableModels = useTypedSelector(selectSearchModels);

  const isEditable = modelId === temporaryModelId;

  if (!model) {
    return null;
  }

  return (
    <ModelItem
      defaultFocused={isEditable}
      defaultReadonly={!isEditable}
      editable={false}
      hasImageSelector
      model={model}
      onAddNew={handleConfirm}
      onClose={handleClose}
      onConfirm={handleConfirm}
      onImageConfirm={handleImageConfirm}
      onImageDelete={handleImageDelete}
      onRemove={handleRemove}
      searchableModels={searchableModels}
      size="small"
    />
  );
}

export default ModelItemStoreWrapper;
