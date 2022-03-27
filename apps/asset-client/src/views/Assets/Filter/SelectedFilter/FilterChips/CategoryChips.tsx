import { CatChip, CatTypography } from 'catamaran/core';
import { removeInformationCategory } from 'store/slices/asset/filter/slice';
import { selectCategoryById } from 'store/slices/categories/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal: boolean;
}

interface CategoryChipProps {
  categoryId?: string;
}

const CategoryChip = ({ categoryId }: CategoryChipProps) => {
  const dispatch = useTypedDispatch();
  const category = useTypedSelector((state) => selectCategoryById(state, categoryId));

  return (
    <CatChip
      label={category?.name ?? categoryId}
      onDelete={() => dispatch(removeInformationCategory(categoryId))}
    />
  );
};

const CategoryChips = ({ values, modal }: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.category')}:
      </CatTypography>
      {values.map((categoryId) => (
        <CategoryChip categoryId={categoryId} key={categoryId} />
      ))}
    </div>
  );
};

export default CategoryChips;
