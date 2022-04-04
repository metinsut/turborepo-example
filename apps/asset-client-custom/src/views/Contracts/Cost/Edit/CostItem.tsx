import { Box, CatIconButton, CatTypography } from 'catamaran/core';
import { CostDetail } from 'store/slices/contracts/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { getMultipleCategoriesByIdsIfNecessary } from 'store/slices/categories/actions';
import {
  removeCostItem,
  updateCostAmount,
  updateCostCategoryIds
} from 'store/slices/contracts/slice';
import {
  selectContractMainCategoryId,
  selectOtherCostsCategoryIds
} from 'store/slices/contracts/selectors';
import { useDebounce } from 'react-use';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import CategoryCheckerDialog, { CloseAction } from 'views/Categories/CategoryCheckerDialog';
import React, { useEffect, useState } from 'react';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';
import TrashIcon from 'catamaran/icons/Trash';
import contractCostItemValidator from 'helpers/validations/ContractCostItemValidator';
import theme from 'catamaran/theme';
import useHover from 'hooks/useHover';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2, 0.5)
  },
  textField: {
    marginBottom: 0
  }
}));

type Props = {
  index: number;
  detail: CostDetail;
  loading: boolean;
};

function CostItem(props: Props) {
  const classes = useStyles();
  const { detail, loading, index } = props;

  const { t } = useTranslation();
  const [hover, hoverProps] = useHover();

  const formHelper = useFormState(detail, contractCostItemValidator);
  const mainCategoryId = useTypedSelector(selectContractMainCategoryId);

  const { categoryIds } = detail;
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(categoryIds.length === 0);

  const dispatch = useTypedDispatch();

  const disabledCategoryIds = useTypedSelector((state) =>
    selectOtherCostsCategoryIds(state, index)
  );

  const [categoryNames, setCategoryNames] = useState<string>(
    t('contracts.edit.category_select_desc')
  );

  useDebounce(
    () => {
      const { amount } = formHelper.formState.values;
      dispatch(
        updateCostAmount({
          amount,
          index,
          type: 'category'
        })
      );
    },
    500,
    [dispatch, formHelper.formState.values]
  );

  const handleEditCategories = async () => {
    if (!loading) {
      setCategoryDialogOpen(true);
    }
  };

  const handleClose = (closeAction: CloseAction) => {
    setCategoryDialogOpen(false);
    if (closeAction !== 'confirm' && categoryIds.length === 0) {
      dispatch(removeCostItem(index));
    }
  };

  const handleDeleteCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(removeCostItem(index));
  };

  const handleCategoryCheckConfirm = async (checkedCategoryIds: string[]) => {
    dispatch(
      updateCostCategoryIds({
        categoryIds: checkedCategoryIds,
        index
      })
    );
  };

  useEffect(() => {
    const asyncCall = async () => {
      let names = t('contracts.edit.category_select_desc');
      const data = await dispatch(getMultipleCategoriesByIdsIfNecessary(categoryIds));

      if (data.length > 0) {
        names = data
          .filter((i) => !!i)
          .map((i) => i?.name ?? '')
          .join(', ');
      }

      setCategoryNames(names);
    };

    asyncCall();
  }, [categoryIds, dispatch, t]);

  const deletable = index > 0;

  return (
    <Box
      alignItems="center"
      className={classes.root}
      display="flex"
      flexDirection="row"
      mb={1}
      p={0.5}
      style={{
        borderColor: hover ? theme.palette.darkGrey[200] : 'transparent',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1
      }}
      {...hoverProps}
    >
      <Box mr={1.5}>
        <CatTypography variant="caption">
          {(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2
          })}
        </CatTypography>
      </Box>
      <Box mr={1.5} onClick={handleEditCategories} style={{ cursor: 'pointer' }} width="70%">
        <ReadonlyTextField
          endAdornment={
            <CatIconButton loading={loading} onClick={handleEditCategories}>
              <ArrowRightIcon
                color="darkGrey"
                contained={false}
                fontSize="medium"
                hoverable={false}
              />
            </CatIconButton>
          }
          text={categoryNames}
        />
      </Box>
      <Box flexGrow={1} mr={1}>
        <CatamaranTextField
          className={classes.textField}
          formHelper={formHelper}
          fullWidth
          isNumericString
          label={`${t('contracts.edit.cost_per_category_field')} ($)`}
          mode="editOnly"
          name="amount"
          validatable
        />
      </Box>
      {hover && deletable ? (
        <CatIconButton onClick={handleDeleteCategory}>
          <TrashIcon color="red" fontSize="medium" />
        </CatIconButton>
      ) : (
        <Box width={24} />
      )}
      <CategoryCheckerDialog
        checkedCategoryIds={categoryIds}
        defaultExpandMainCategoryId={mainCategoryId}
        disabledCategoryIds={disabledCategoryIds}
        disableOtherMainCategories
        mainCategoryIds={[mainCategoryId]}
        onClose={handleClose}
        onConfirm={handleCategoryCheckConfirm}
        open={categoryDialogOpen}
      />
    </Box>
  );
}

export default CostItem;
