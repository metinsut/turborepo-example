import { Box, CatButton } from 'catamaran/core';
import { Cost } from 'store/slices/contracts/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { addNewCostItem, getCostCategoriesWithParents } from 'store/slices/contracts/actions';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useUniqueIds } from 'hooks/useUniqueIds';
import CostItem from './CostItem';
import PlusIcon from 'catamaran/icons/Plus';
import React, { useEffect } from 'react';

import { Category } from 'store/slices/categories/types';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  cost: Cost;
};

function CostForEachCategory(props: Props) {
  const classes = useStyles();
  const { cost } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [categoriesWithParentsLoading, categoriesWithParentsDispatch] = useLoading<Category[]>();

  const uniqueIds = useUniqueIds(cost.details.length);

  useEffect(() => {
    const asyncCall = async () => {
      categoriesWithParentsDispatch(getCostCategoriesWithParents());
    };

    asyncCall();
  }, [categoriesWithParentsDispatch]);

  const handleAddCategory = () => {
    dispatch(addNewCostItem());
  };

  const valid = cost?.details.every(
    (costItem) =>
      cost?.type !== 'category' || (costItem.amount > 0 && costItem.categoryIds?.length > 0)
  );

  const addCategoryButtonEnabled = valid;

  return (
    <Box className={classes.root} display="flex" flexDirection="column">
      {cost.details.map((detail, index) => (
        <CostItem
          detail={detail}
          index={index}
          key={uniqueIds[index]}
          loading={categoriesWithParentsLoading}
        />
      ))}
      <CatButton
        color="blue"
        disabled={!addCategoryButtonEnabled}
        onClick={handleAddCategory}
        size="large"
        startIcon={<PlusIcon />}
        style={{ width: 200 }}
      >
        {t('contracts.edit.cost_add_category_button')}
      </CatButton>
    </Box>
  );
}

export default CostForEachCategory;
