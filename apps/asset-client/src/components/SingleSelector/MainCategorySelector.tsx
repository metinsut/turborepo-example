import { CatMenuItem, CatSelect } from 'catamaran/core';
import { SelectProps } from 'catamaran/core/mui';
import { selectAllMainCategories } from 'store/slices/session';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';

type Props = SelectProps & {
  className?: string;
  onMainCategoryIdChange: (categoryId: string) => void;
  selectedMainCategoryId: string;
};

function MainCategorySelector(props: Props) {
  const { className, onMainCategoryIdChange, selectedMainCategoryId, ...rest } = props;

  const { t } = useTranslation();

  const categories = useTypedSelector(selectAllMainCategories);

  const handleChange = (event: any) => {
    const newValue = event.target.value as string;
    onMainCategoryIdChange(newValue);
  };

  return (
    <CatSelect
      className={className}
      displayEmpty
      label={t('categories.main.main_category_field')}
      onChange={handleChange}
      value={selectedMainCategoryId ?? ''}
      {...rest}
    >
      {categories.map((category) => (
        <CatMenuItem key={category.id} value={category.id}>
          {category.name}
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export default MainCategorySelector;
