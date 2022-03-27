import { Box, CatTypography } from 'catamaran/core';
import { Category } from 'store/slices/categories/types';
import { Cost } from 'store/slices/contracts/types';
import { Divider, Skeleton } from 'catamaran/core/mui';
import { getMultipleCategoriesByIdsIfNecessary } from 'store/slices/categories/actions';
import { selectCategoryById } from 'store/slices/categories/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useUniqueIds } from 'hooks/useUniqueIds';
import React, { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

type Props = {
  cost: Cost;
};

function ReadonlyForEachCategory({ cost }: Props) {
  const { t } = useTranslation();
  const uniqueIds = useUniqueIds(cost.details.length);
  const [categoriesLoading, dispatchWithLoading] = useLoading<Category[]>();

  useEffect(() => {
    dispatchWithLoading(
      getMultipleCategoriesByIdsIfNecessary(cost.details.flatMap((i) => i.categoryIds))
    );
  }, [cost.details, dispatchWithLoading]);

  return (
    <>
      <Box display="flex" flexDirection="column">
        <CatTypography className="opacity-6" variant="body1">
          {t(`contracts.cost_types.${cost.type}`)}
        </CatTypography>
        <Box my={1} width={112}>
          <Divider />
        </Box>
        <Box alignItems="center" display="flex" flexDirection="row">
          {cost.details.map((costDetail, index) => (
            <React.Fragment key={uniqueIds[index]}>
              {categoriesLoading ? (
                <Skeleton width={100} />
              ) : (
                <CatTypography className="opacity-6" variant="caption">
                  {costDetail.categoryIds.map((categoryId, categoryIndex) => (
                    <React.Fragment key={categoryId}>
                      <CostItem categoryId={categoryId} />
                      {categoryIndex < costDetail.categoryIds.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </CatTypography>
              )}
              <Box ml={0.5}>
                <CatTypography className="opacity-8" variant="subtitle1">
                  {/* TODO currency */}${costDetail.amount.toFixed(2)}
                </CatTypography>
              </Box>
              {index < cost.details.length - 1 && <Box px={1}>|</Box>}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </>
  );
}

function CostItem(props: { categoryId: string }) {
  const { categoryId } = props;

  const category = useTypedSelector((state) => selectCategoryById(state, categoryId));
  return <>{category?.name ?? ''}</>;
}

export default ReadonlyForEachCategory;
