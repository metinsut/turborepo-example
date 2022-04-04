import { Box, CatIconButton } from 'catamaran/core';
import { Category } from 'store/slices/categories/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { getAssetFilterCategoriesWithParents } from 'store/slices/asset/filter/actions';
import { selectAllMainCategories } from 'store/slices/session';
import {
  selectDraftFilterInformationCategories,
  selectSelectedFilterId
} from 'store/slices/asset/filter/selectors';
import { setFilterInformationCategoryIds } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import CategoryCheckerDialog from 'views/Categories/CategoryCheckerDialog';
import React, { useEffect, useState } from 'react';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = { className?: string };

function CategoryFilter(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const mainCategories = useTypedSelector(selectAllMainCategories);
  const categoryIds = useTypedSelector(selectDraftFilterInformationCategories);
  const selectedFilterId = useTypedSelector(selectSelectedFilterId);

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const [categoriesWithParentsLoading, categoriesWithParentsDispatch] = useLoading<Category[]>();

  useEffect(() => {
    const fetchCategoriesWithParents = async () => {
      if (selectedFilterId) {
        categoriesWithParentsDispatch(getAssetFilterCategoriesWithParents());
      }
    };

    fetchCategoriesWithParents();
  }, [categoriesWithParentsDispatch, selectedFilterId]);

  const handleEditCategories = async () => {
    setCategoryDialogOpen(true);
  };

  const handleClose = () => {
    setCategoryDialogOpen(false);
  };

  const handleCategoryCheckConfirm = async (checkedCategoryIds: string[]) => {
    dispatch(setFilterInformationCategoryIds(checkedCategoryIds));
  };

  let label = t('assets.assetFilter.category');
  if (categoryIds.length > 0) {
    label = t('assets.assetFilter.category_selected', { count: categoryIds.length });
  }

  return (
    <>
      <Box
        className={clsx(classes.root, className)}
        mb="12px"
        onClick={handleEditCategories}
        style={{ cursor: 'pointer' }}
        width="100%"
      >
        <ReadonlyTextField
          disabled={categoriesWithParentsLoading}
          endAdornment={
            <CatIconButton onClick={handleEditCategories}>
              <ArrowRightIcon
                color="darkGrey"
                contained={false}
                fontSize="medium"
                hoverable={false}
              />
            </CatIconButton>
          }
          text={label}
        />
      </Box>
      <Box>
        <CategoryCheckerDialog
          checkedCategoryIds={categoryIds}
          defaultExpandMainCategoryId={mainCategories && mainCategories[0]?.id}
          onClose={handleClose}
          onConfirm={handleCategoryCheckConfirm}
          open={categoryDialogOpen}
        />
      </Box>
    </>
  );
}

export default CategoryFilter;
