import { Category } from 'store/slices/categories/types';
import { Goal } from 'store/slices/metricsConfiguration/detail/type';
import { getMultipleCategoriesByIdsIfNecessary } from 'store/slices/categories/actions';
import { useEffect, useMemo, useState } from 'react';
import { useMountedState } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';

export function useCategoryNames(
  goal: Goal,
  goalItemCount: number,
  isDefaultGoal: boolean
): string {
  const isMounted = useMountedState();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const asyncCall = async () => {
      const data = await dispatch(getMultipleCategoriesByIdsIfNecessary(goal.categoryIds));
      if (isMounted()) {
        setCategories(data);
      }
    };

    if (goal.categoryIds) {
      asyncCall();
    }
  }, [goal.categoryIds, dispatch, isMounted]);

  const categoryName = useMemo(() => {
    let name = isDefaultGoal
      ? t('metrics_configuration.detail.goals.all_categories')
      : t('metrics_configuration.detail.goals.select_category');

    if (categories.length > 0 && categories.length <= 2) {
      name = categories
        .filter((i) => !!i)
        .map((i) => i?.name ?? '')
        .join(', ');
    } else if (categories.length > 2) {
      name = categories.length + t('metrics_configuration.detail.goals.categories');
    }
    if (goalItemCount > 1 && isDefaultGoal) {
      name = t('metrics_configuration.detail.goals.all_other_categories');
    }
    return name;
  }, [isDefaultGoal, t, categories, goalItemCount]);

  return categoryName;
}
