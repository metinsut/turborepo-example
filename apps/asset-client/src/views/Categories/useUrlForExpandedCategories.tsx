import { addOrReplaceQueryParams, deleteQueryParams } from 'utils/query';
import { expandedCategoriesInitializedCleared } from 'store/slices/categories/slice';
import { initializeExpandedCategories } from 'store/slices/categories/actions';
import {
  selectExpandedCategoriesInitialized,
  selectExpandedIds
} from 'store/slices/categories/selectors';
import { useBasePath, useQuery, useTypedDispatch, useTypedSelector } from 'hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';

export const useUrlForExpandedCategories = () => {
  const dispatch = useTypedDispatch();
  const history = useHistory();
  const query = useQuery();
  const queryExpandedCategoryIds = query.get('expandedCategoryIds');
  const basePath = useBasePath();
  const expandedCategoryIds = useTypedSelector(selectExpandedIds);

  const expandedCategoriesInitialized = useTypedSelector(selectExpandedCategoriesInitialized);

  useEffect(() => {
    async function fetchExpandedCategories() {
      if (queryExpandedCategoryIds && !expandedCategoriesInitialized) {
        const success = await dispatch(initializeExpandedCategories(queryExpandedCategoryIds));
        if (!success) {
          const cleanedQueryParams = deleteQueryParams(query, ['expandedCategoryIds']);
          history.replace(basePath + cleanedQueryParams);
        }
      }
    }

    fetchExpandedCategories();
  }, [basePath, history, dispatch, expandedCategoriesInitialized, queryExpandedCategoryIds, query]);

  useDeepCompareEffect(() => {
    const expandedCategoryIdsArray =
      expandedCategoryIds.length > 1 ? expandedCategoryIds.filter((i) => i).join(',') : '';

    const queryParam = addOrReplaceQueryParams(query, [
      { key: 'expandedCategoryIds', value: expandedCategoryIdsArray }
    ]);
    history.replace(basePath + queryParam);
  }, [expandedCategoryIds, basePath]);

  useEffect(
    () => () => {
      dispatch(expandedCategoriesInitializedCleared());
    },
    [dispatch]
  );
};
