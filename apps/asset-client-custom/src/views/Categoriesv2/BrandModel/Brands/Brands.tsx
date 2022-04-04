import { CatTypography } from 'catamaran/core';
import { Categoryv2 as Category } from 'store/slices/categoriesv2/types';
import { Fade } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { getAllBrands, getBrandsForCategory } from 'store/slices/brandsv2/actions';
import { isArrayNullOrEmpty } from 'utils';
import { refreshCategoryv2 as refreshCategory } from 'store/slices/categoriesv2/actions';
import {
  selectDisplayedBrandIdsByCategoryId,
  selectExpandedBrandId
} from 'store/slices/brandsv2/selectors';
import { setExpandedBrand } from 'store/slices/brandsv2/slice';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AddBrandPopover from './AddBrandPopover';
import BrandItem from './BrandItem';
import LevelColumn from 'components/LevelColumn/LevelColumn';
import NoItem from 'catamaran/icons/NoItem';
import React, { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

type Props = {
  category: Category;
};

function Brands(props: Props) {
  const { category } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [brandsLoading, dispatchBrandLoading] = useLoading();
  const popupState = usePopupState({ popupId: 'addBrandPopover', variant: 'popover' });

  const brandsIds = useTypedSelector((state) =>
    selectDisplayedBrandIdsByCategoryId(state, category.id)
  );

  const expandedBrandId = useTypedSelector(selectExpandedBrandId);
  const handleExpand = (brandIdToExpand: string) => {
    dispatch(setExpandedBrand(brandIdToExpand));
  };

  const handleCollapse = () => {
    dispatch(setExpandedBrand(''));
  };

  useEffect(() => {
    dispatchBrandLoading(getBrandsForCategory(category.id));
    dispatchBrandLoading(getAllBrands());
    return () => {
      dispatch(refreshCategory(category.id));
    };
  }, [category.id, dispatch, dispatchBrandLoading]);

  return (
    <LevelColumn
      addButtonProps={{ ...bindTrigger(popupState) }}
      className="mr8"
      content={
        <TransitionGroup className="grid align-content-start gap-8">
          {brandsIds.map((id) => (
            <Fade key={id}>
              <BrandItem
                brandId={id}
                categoryId={category.id}
                expanded={expandedBrandId === id}
                key={id}
                onCollapse={handleCollapse}
                onExpand={() => handleExpand(id)}
              />
            </Fade>
          ))}
        </TransitionGroup>
      }
      emptyContent={
        brandsIds.length < 1 && (
          <>
            <NoItem color="darkGrey" contained />
            <CatTypography className="text-center">
              <Trans
                i18nKey="asset_configurations.brands.no_brands_description"
                t={t}
                values={{ categoryName: category.name }}
              />
            </CatTypography>
          </>
        )
      }
      isEmpty={isArrayNullOrEmpty(brandsIds)}
      loading={brandsLoading}
      titleContent={
        <div className="grid align-content-start gap-8">
          <CatTypography
            className="three-dot mt16"
            height="32px"
            noWrap
            title={category.name}
            variant="body1"
          >
            <Trans
              i18nKey="asset_configurations.brands.brand_group_title"
              t={t}
              values={{ categoryName: category.name }}
            />
          </CatTypography>
          <AddBrandPopover category={category} open={popupState.isOpen} popupState={popupState} />
        </div>
      }
    />
  );
}

export default Brands;
