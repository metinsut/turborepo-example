import { Box, CatCheckbox, CatPaperSelector } from 'catamaran/core';
import { CategoryManagementType, useBodyClickActions } from '../helpers';
import { Droppable } from 'react-beautiful-dnd';
import { FormControlLabel, Typography } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import {
  addEmptyCategory,
  checkAllCategoriesInGroup,
  getCategories
} from 'store/slices/categories/actions';
import { getCategoriesv2 } from 'store/slices/categoriesv2/actions';
import { maxMainCategoryNumber } from 'store/slices/categories/data';
import {
  selectCategoryById,
  selectCategoryGroupHasInMemoryChild,
  selectCategoryGroupHasInSessionChild,
  selectCategoryGroupHasTemporaryChild,
  selectDisplayedCategoryIdsByParentId,
  selectDisplayedCheckedCategoryIdsByParentId,
  selectInMemoryCategoryExists,
  selectInSessionCategoryExists,
  selectIsCategoryInSession,
  selectIsInSessionRemovedById
} from 'store/slices/categories/selectors';
import { selectIsUserAuthorized } from 'store/slices/session';
import { temporaryCategoryId } from 'store/common';
import { useDialogState, useTypedDispatch } from 'hooks';
import { useStyles } from './styles';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CategoryItem, { ItemSharedProps } from '../CategoryItem';
import DeleteMainCategoryModal from '../DeleteMainCategory/DeleteMainCategoryModal';
import Header, { useCategoryGroupHeader } from './Header';
import NoItem from 'catamaran/icons/NoItem';
import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

export type CategoryGroupProps = ItemSharedProps & {
  allowAddCategory?: boolean;
  allowCheckOnMainCategory?: boolean;
  categoryManagementType: CategoryManagementType;
  parentCategoryId?: string;
  onExpand?: () => void;
};

function CategoryGroup(props: CategoryGroupProps) {
  const classes = useStyles();
  const {
    allowAddCategory,
    allowCheckOnMainCategory = false,
    categoryManagementType,
    checkable = true,
    className,
    parentCategoryId,
    onExpand,
    deletable,
    ...rest
  } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const { isOpen: mainCategoryDeleteDialogOpen, togglePopup: toggleMainCategoryDeletePopup } =
    useDialogState();
  const [categoryId, setCategoryId] = useState(null);
  const [loading, dispatchWithLoading] = useLoading();

  const parentCategory = useTypedSelector((state) => selectCategoryById(state, parentCategoryId));

  const categoryIds = useTypedSelector((state) =>
    selectDisplayedCategoryIdsByParentId(state, parentCategoryId)
  );

  const checkedIds = useTypedSelector((state) =>
    selectDisplayedCheckedCategoryIdsByParentId(state, parentCategoryId)
  );

  const hasTemporaryChild = useTypedSelector((state) =>
    selectCategoryGroupHasTemporaryChild(state, parentCategoryId)
  );

  const inMemoryCategoryExists = useTypedSelector(selectInMemoryCategoryExists);
  const inSessionCategoryExists = useTypedSelector(selectInSessionCategoryExists);
  const isParentCategoryInSession = useTypedSelector((state) =>
    selectIsCategoryInSession(state, parentCategoryId)
  );

  const hasInMemoryChild = useTypedSelector((state) =>
    selectCategoryGroupHasInMemoryChild(state, parentCategoryId)
  );

  const hasInSessionChild = useTypedSelector((state) =>
    selectCategoryGroupHasInSessionChild(state, parentCategoryId)
  );

  const isInSessionRemovedById = useTypedSelector(selectIsInSessionRemovedById);

  const isUserAuthorized = useTypedSelector((state) =>
    selectIsUserAuthorized(state, 'mainCategoryEdit')
  );

  useEffect(() => {
    dispatchWithLoading(getCategories(parentCategoryId));
    dispatchWithLoading(getCategoriesv2(parentCategoryId));
  }, [dispatchWithLoading, parentCategoryId]);

  const availableCategory = maxMainCategoryNumber - categoryIds.length;

  const isMainCategoryGroup = !parentCategory;
  const isMainCategoryEditable = !isUserAuthorized && isMainCategoryGroup;

  const isAddButtonNotVisible =
    !allowAddCategory ||
    hasInMemoryChild ||
    hasInSessionChild ||
    ((inMemoryCategoryExists || inSessionCategoryExists) &&
      !parentCategory?.inMemory &&
      !isParentCategoryInSession) ||
    (isMainCategoryGroup && availableCategory <= 0);

  const { handleRemoveSingle, ...headerProps } = useCategoryGroupHeader(parentCategoryId);

  const handleAddNew = useCallback(() => {
    dispatch(addEmptyCategory(parentCategoryId));
  }, [dispatch, parentCategoryId]);

  // select all button related
  const showSelectAll = deletable && checkedIds.length > 0;
  const handleCheckAll = () => {
    dispatch(checkAllCategoriesInGroup(parentCategoryId));
  };

  const removeCategory = (id: string) => {
    setCategoryId(id);
    if (isMainCategoryGroup) {
      toggleMainCategoryDeletePopup();
    } else {
      handleRemoveSingle(id)();
    }
  };

  const bodyClickActions = useBodyClickActions(categoryManagementType, checkedIds.length > 0);

  const editDisableTooltipTitle = t('categories.main.general_admin_can_do');

  return (
    <>
      <Droppable
        droppableId={(parentCategoryId ?? temporaryCategoryId).toString()}
        isCombineEnabled
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <CatPaperSelector
              addButtonDisabled={isMainCategoryEditable}
              addButtonDisabledTooltipTitle={editDisableTooltipTitle}
              buttonText={t('categories.add_category_button')}
              className={clsx(classes.root, classes.container, className)}
              content={
                categoryIds.length > 0 && (
                  <Box>
                    <Box bottom={35} position="relative">
                      {showSelectAll && (
                        <FormControlLabel
                          className={classes.checkboxLabel}
                          control={
                            <CatCheckbox
                              checked={categoryIds.length === checkedIds.length}
                              className={classes.checkbox}
                              color="default"
                              onChange={handleCheckAll}
                            />
                          }
                          label={
                            <Typography variant="caption">{t('common.select_all')}</Typography>
                          }
                          labelPlacement="end"
                        />
                      )}
                    </Box>
                    {categoryIds.map((i, index) => {
                      if (isInSessionRemovedById[i]) {
                        return null;
                      }

                      return (
                        <CategoryItem
                          alwaysShowCheckbox={checkedIds.length > 0}
                          checkable={
                            isMainCategoryGroup ? allowCheckOnMainCategory && checkable : checkable
                          }
                          className={classes.categoryItem}
                          deletable={deletable}
                          editDisabled={isMainCategoryEditable}
                          editDisabledTooltipTitle={editDisableTooltipTitle}
                          id={i}
                          index={index}
                          key={i}
                          onDelete={() => removeCategory(i)}
                          onExpand={onExpand}
                          {...bodyClickActions}
                          {...rest}
                        />
                      );
                    })}
                    <span style={{ display: 'none' }}>{provided.placeholder}</span>
                  </Box>
                )
              }
              elevation={1}
              emptyContent={
                parentCategory && (
                  <>
                    <NoItem color="darkGrey" contained />
                    <Box>
                      <Trans
                        i18nKey="categories.no_categories_description"
                        t={t}
                        values={{ categoryName: parentCategory.name }}
                      />
                    </Box>
                  </>
                )
              }
              handleAddClick={handleAddNew}
              hasTemporary={hasTemporaryChild}
              isAddDisabled={isAddButtonNotVisible}
              loading={loading}
              title={
                <Header
                  categoryIds={categoryIds}
                  checkedIds={checkedIds}
                  deletable={deletable}
                  loading={loading}
                  parentCategory={parentCategory}
                  {...headerProps}
                  {...rest}
                />
              }
            />
          </div>
        )}
      </Droppable>
      <DeleteMainCategoryModal
        categoryId={categoryId}
        open={mainCategoryDeleteDialogOpen}
        togglePopup={toggleMainCategoryDeletePopup}
      />
    </>
  );
}

export default React.memo(CategoryGroup);
