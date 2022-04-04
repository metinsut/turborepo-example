import { addOrReplaceQueryParams, deleteQueryParams } from 'utils/query';
import {
  brandDialogCleared,
  brandDialogClosed,
  brandDialogInitializedChanged
} from 'store/slices/categories/slice';
import { initializeBrandDialog } from 'store/slices/categories/actions';
import { selectBrandDialog } from 'store/slices/categories/selectors';
import { selectExpandedBrandId } from 'store/slices/brands/selectors';
import { useBasePath, useQuery, useTypedDispatch, useTypedSelector } from 'hooks';
import { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const SELECTED_CATEGORY_ID_PARAM = 'selectedCategoryId';
const BRAND_DIALOG_OPEN_PARAM = 'brandDialogOpen';
const EXPANDED_BRAND_ID_PARAM = 'expandedBrandId';

export const useUrlForBrandDialog = () => {
  const dispatch = useTypedDispatch();
  const history = useHistory();
  const query = useQuery();
  const querySelectedCategoryId = query.get(SELECTED_CATEGORY_ID_PARAM);
  const queryBrandDialogOpen = query.get(BRAND_DIALOG_OPEN_PARAM) === 'true' ?? false;
  const queryExpandedBrandId = query.get(EXPANDED_BRAND_ID_PARAM);
  const basePath = useBasePath();

  const { initialized, open, selectedCategoryId } = useTypedSelector(selectBrandDialog);
  const expandedBrandId = useTypedSelector(selectExpandedBrandId);

  const clearBrandDialogQuery = useCallback(() => {
    const brandRemovedQuery = deleteQueryParams(query, [
      SELECTED_CATEGORY_ID_PARAM,
      BRAND_DIALOG_OPEN_PARAM,
      EXPANDED_BRAND_ID_PARAM
    ]);
    history.replace(basePath + brandRemovedQuery);
  }, [basePath, history, query]);

  useEffect(() => {
    async function initializeDialog() {
      if (!initialized && querySelectedCategoryId && queryBrandDialogOpen) {
        const success = await dispatch(
          initializeBrandDialog(querySelectedCategoryId, queryExpandedBrandId)
        );

        if (!success) {
          clearBrandDialogQuery();
        }

        dispatch(brandDialogInitializedChanged(true));
      }
    }

    initializeDialog();
  }, [
    basePath,
    dispatch,
    history,
    initialized,
    query,
    queryBrandDialogOpen,
    querySelectedCategoryId,
    selectedCategoryId,
    clearBrandDialogQuery,
    queryExpandedBrandId
  ]);

  useEffect(
    () => () => {
      dispatch(brandDialogCleared());
    },
    [dispatch]
  );

  useMemo(() => {
    if (selectedCategoryId && open) {
      const oldParam = `?${query.toString()}`;
      const queryParam = addOrReplaceQueryParams(query, [
        {
          key: SELECTED_CATEGORY_ID_PARAM,
          value: selectedCategoryId
        },
        {
          key: BRAND_DIALOG_OPEN_PARAM,
          value: open ? 'true' : 'false'
        },
        {
          deleteIfNotExist: true,
          key: EXPANDED_BRAND_ID_PARAM,
          value: expandedBrandId
        }
      ]);

      if (oldParam !== queryParam) {
        history.replace(basePath + queryParam);
      }
    }
  }, [basePath, expandedBrandId, history, open, query, selectedCategoryId]);

  const handleDialogClose = useCallback(() => {
    dispatch(brandDialogClosed());
    clearBrandDialogQuery();
  }, [clearBrandDialogQuery, dispatch]);

  return { handleDialogClose, open, selectedCategoryId };
};
