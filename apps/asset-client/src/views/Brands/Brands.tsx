import { Box, CatPaperSelector } from 'catamaran/core';
import { Category } from 'store/slices/categories/types';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import {
  addEmptyBrand,
  getAllBrands,
  getBrandsForCategory,
  removeBrandFromCategory
} from 'store/slices/brands/actions';
import { refreshCategory } from 'store/slices/categories/actions';
import { removeExpandedBrand } from 'store/slices/brands/slice';
import {
  selectBrandsHasTemporaryChild,
  selectDisplayedBrandIdsByCategoryId,
  selectShouldBrandsRefresh
} from 'store/slices/brands/selectors';
import { temporaryBrandId } from 'store/common';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BrandItemStoreWrapper from './BrandItemStoreWrapper';
import NoItem from 'catamaran/icons/NoItem';
import React, { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
}));

type Props = {
  className?: string;
  category?: Category;
};

export function useGetBrandsByCategoryId(categoryId: string, brandIds: string[]) {
  const dispatch = useTypedDispatch();
  const [brandsLoading, dispatchBrandLoading] = useLoading();
  const shouldRefresh = useTypedSelector((state) => selectShouldBrandsRefresh(state, brandIds));

  useEffect(() => {
    dispatchBrandLoading(getBrandsForCategory(categoryId));
    return () => {
      dispatch(removeBrandFromCategory(categoryId, temporaryBrandId));
      dispatch(removeExpandedBrand());
      dispatch(refreshCategory(categoryId));
    };
  }, [dispatch, dispatchBrandLoading, categoryId]);

  useEffect(() => {
    if (shouldRefresh) {
      dispatch(getBrandsForCategory(categoryId));
    }
  }, [dispatch, categoryId, shouldRefresh]);

  return brandsLoading;
}

export function useGetAllBrands() {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);
}

function Brands(props: Props) {
  const classes = useStyles();
  const { className, category } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const brandsIds = useTypedSelector((state) =>
    selectDisplayedBrandIdsByCategoryId(state, category.id)
  );

  const hasTemporaryBrand = useTypedSelector((state) =>
    selectBrandsHasTemporaryChild(state, category.id)
  );

  useGetAllBrands();

  const brandsLoading = useGetBrandsByCategoryId(category.id, brandsIds);

  const handleAddClick = () => {
    dispatch(addEmptyBrand(category.id));
  };

  return (
    <CatPaperSelector
      buttonText={
        <Trans components={{ bold: <b /> }} i18nKey="brands.add_new_brand_button" t={t} />
      }
      className={className}
      content={
        brandsIds.length > 0 && (
          <Box>
            {brandsIds.map((id) => (
              <BrandItemStoreWrapper brandId={id} categoryId={category.id} key={id} />
            ))}
          </Box>
        )
      }
      emptyContent={
        <>
          <NoItem color="darkGrey" contained />
          <Box>
            <Trans
              components={{ bold: <b /> }}
              i18nKey="brands.no_brands_description"
              t={t}
              values={{ categoryName: category.name }}
            />
          </Box>
        </>
      }
      handleAddClick={handleAddClick}
      hasTemporary={hasTemporaryBrand}
      loading={brandsLoading}
      title={
        <Typography
          align="center"
          component="div"
          style={{
            maxWidth: '100%',
            overflow: 'hidden'
          }}
          variant="body1"
        >
          <Trans
            components={{ bold: <p className={classes.title} /> }}
            i18nKey="brands.brand_group_title"
            t={t}
            values={{ categoryName: category.name }}
          />
        </Typography>
      }
    />
  );
}

export default Brands;
