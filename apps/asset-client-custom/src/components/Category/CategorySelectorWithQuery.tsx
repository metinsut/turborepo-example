import { CatMenuItem, CatSelect } from 'catamaran/core';
import { isArrayNullOrEmpty } from 'utils';
import { selectAllMainCategories } from 'store/slices/session';
import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks';

type Props = {
  baseUrl: string;
  selectedMainCategoryId: string;
};

function CategorySelectorWithQuery({ baseUrl, selectedMainCategoryId }: Props) {
  const history = useHistory();
  const { t } = useTranslation();
  const mainCategories = useTypedSelector(selectAllMainCategories);

  const handleChange = (event: any) => {
    const category: string = event.target.value;
    const queryOperator = baseUrl.includes('?') ? '&' : '?';
    history.push(`${baseUrl}${queryOperator}main-category=${category}`);
  };

  return (
    <CatSelect
      disabled={mainCategories.length === 1}
      displayEmpty
      fullWidth
      label={t('categories.main.main_category_field')}
      onChange={handleChange}
      value={selectedMainCategoryId}
    >
      {mainCategories.map((category) => (
        <CatMenuItem key={category.id} value={category.id}>
          {category.name}
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export const useMainCategory = (baseUrl: string) => {
  const history = useHistory();
  const queries = useQuery();

  const mainCategories = useTypedSelector(selectAllMainCategories);
  const mainCategoryIdFromQuery = queries.get('main-category');

  const selectedMainCategoryId = useMemo(() => {
    let categoryId = mainCategoryIdFromQuery;
    if (isArrayNullOrEmpty(mainCategories)) {
      categoryId = '';
    } else if (!mainCategories.find((i) => i.id === mainCategoryIdFromQuery)) {
      categoryId = mainCategories[0]?.id;
    }

    return categoryId;
  }, [mainCategoryIdFromQuery, mainCategories]);

  useEffect(() => {
    if (
      !isArrayNullOrEmpty(mainCategories) &&
      !mainCategories.find((i) => i.id === mainCategoryIdFromQuery)
    ) {
      const redirectId = mainCategories[0]?.id;
      const queryOperator = baseUrl.includes('?') ? '&' : '?';
      history.replace(`${baseUrl}${queryOperator}main-category=${redirectId}`);
    }
  }, [baseUrl, history, mainCategories, mainCategoryIdFromQuery]);

  return selectedMainCategoryId;
};

export default CategorySelectorWithQuery;
