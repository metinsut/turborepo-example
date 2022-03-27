import { Box, CatButton } from 'catamaran/core';
import { Category } from 'store/slices/categories/types';
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Grid, Paper, Typography, styled } from 'catamaran/core/mui';
import { categorySelectedForBrand } from 'store/slices/categories/slice';
import {
  checkCategory,
  expandCategory,
  removeCategory,
  setSelectedCategory,
  upsertCategory
} from 'store/slices/categories/actions';
import { maxCategoryDepth } from 'store/slices/categories/data';
import {
  selectCategoryById,
  selectCategoryChecked,
  selectCategoryDisabled,
  selectCategoryGroupHasInMemoryChild,
  selectDisplayedCheckedCategoryIdsByParentId,
  selectDraggedOverCategoryId,
  selectDraggingCategory,
  selectHasChildCategoryIncludingInSessions,
  selectInMemoryCategoryExists,
  selectInSessionCategoryExists,
  selectIsCategoryInSession,
  selectIsCategorySelected,
  selectIsExpanded
} from 'store/slices/categories/selectors';
import { temporaryCategoryId } from 'store/common';
import { useFormState } from 'hooks/useFormState';
import { usePopover } from 'hooks/usePopover';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import InfoIcon from 'catamaran/icons/Info';
import InputItemDouble from 'components/InputItem/InputItemDouble';
import NewBadge from 'catamaran/icons/NewBadge';
import PlusIcon from 'catamaran/icons/Plus';
import React, { useCallback, useEffect } from 'react';
import categoryValidator from 'helpers/validations/CategoryValidator';
import clsx from 'clsx';
import fadeColor from 'catamaran/colors/fadeColor';

const StyledCategoryItem = styled('div')(({ theme }) => ({
  '&.checkDisabled': {
    '.MuiCheckbox-root': {
      opacity: 0.5,
      pointerEvents: 'none'
    }
  },
  '&.disabled': {
    opacity: 0.5,
    pointerEvents: 'none'
  },
  '&:hover': {
    '.addModel': {
      display: 'inline-flex'
    }
  },
  '.addModel': {
    display: 'none',
    fontSize: '9px !important',
    fontWeight: 400,
    margin: theme.spacing(0.2, 0.2, 0, 0)
  },
  '.dragged': {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1)
  },
  '.draggedOverCategoryItem': {
    '.MuiInputBase-root': {
      backgroundColor: `${fadeColor(theme.palette.primary.main, 0.1)} !important`,
      color: theme.palette.primary.main
    },
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2)
  },
  '.hiddenCategoryItem': {
    display: 'none'
  },
  '.icon': {
    marginLeft: `${theme.spacing(1)}px`
  }
}));

export type ItemSharedProps = {
  alwaysShowCheckbox?: boolean;
  allowModifyBrandModel?: boolean;
  allowTraverseIfUnapprovedModelExists?: 'always' | 'onlyInSessions' | 'never';
  checkable?: boolean;
  className?: string;
  deletable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  editDisabled?: boolean;
  editDisabledTooltipTitle?: string;
  expandable?: boolean;
  expandBodyActionEnabled?: boolean;
  inMemory?: boolean;
  level?: number;
  selectable?: boolean;
  selectBodyActionEnabled?: boolean;
  validatable?: boolean;
};

type Props = ItemSharedProps & {
  id?: string;
  index?: number;
  onDelete?: () => void;
  onExpand?: () => void;
};

function CategoryItem(props: Props) {
  const {
    alwaysShowCheckbox = false,
    allowModifyBrandModel = true,
    allowTraverseIfUnapprovedModelExists = 'never',
    className,
    checkable = true,
    deletable = true,
    draggable = true,
    editable = true,
    editDisabled,
    editDisabledTooltipTitle,
    expandable = true,
    expandBodyActionEnabled = false,
    id,
    index,
    inMemory = false,
    level,
    onDelete,
    onExpand,
    selectable = false,
    selectBodyActionEnabled = false,
    validatable = true
  } = props;

  const { t } = useTranslation();
  const category = useTypedSelector((state) => selectCategoryById(state, id));
  const formHelper = useFormState(category, categoryValidator, {
    autoCapitalizeProps: {
      code: true
    }
  });

  const dispatch = useTypedDispatch();

  const expanded = useTypedSelector((state) => selectIsExpanded(state, id));
  const checked = useTypedSelector((state) => selectCategoryChecked(state, id));
  const disabled = useTypedSelector((state) => selectCategoryDisabled(state, id));
  const selected = useTypedSelector((state) => selectIsCategorySelected(state, id));

  useEffect(
    () => () => {
      if (category.id === temporaryCategoryId) {
        dispatch(removeCategory(temporaryCategoryId));
      }
    },
    [category.id, dispatch]
  );

  const handleExpand = useCallback(async () => {
    await dispatch(expandCategory(category, !expanded));
    if (onExpand) {
      onExpand();
    }
  }, [category, dispatch, expanded, onExpand]);

  const handleCheck = useCallback(() => {
    dispatch(checkCategory(category));
  }, [category, dispatch]);

  const handleConfirm = useCallback(
    async (entity: Category) => {
      const finalCategory = await dispatch(upsertCategory(entity, inMemory));

      return finalCategory;
    },
    [dispatch, inMemory]
  );

  const handleClose = useCallback(async () => {
    await dispatch(removeCategory(temporaryCategoryId));
  }, [dispatch]);

  const handleBeforeActionStart = () => {
    if (expanded) {
      dispatch(expandCategory(category, false));
    }
  };

  const handleSelect = useCallback(() => {
    dispatch(setSelectedCategory(category));
  }, [category, dispatch]);

  const popoverContent = (
    <Typography component="p" variant="caption">
      {t('categories.category_has_subcategories_info')}
    </Typography>
  );
  const popoverOptions = usePopover({
    popoverContent
  });

  const isInSession = useTypedSelector((state) => selectIsCategoryInSession(state, category.id));

  const hasInMemoryChild = useTypedSelector((state) =>
    selectCategoryGroupHasInMemoryChild(state, category.id)
  );

  const hasChildCategoryIncludingInSessions = useTypedSelector((state) =>
    selectHasChildCategoryIncludingInSessions(state, category.id)
  );

  const inSessionCategoryExists = useTypedSelector(selectInSessionCategoryExists);

  const hasChildCategory =
    (category.hasChildCategory && hasChildCategoryIncludingInSessions) || hasInMemoryChild;

  const draggingCategory = useTypedSelector(selectDraggingCategory);
  const selectedCategoriesInGroup = useTypedSelector((state) =>
    selectDisplayedCheckedCategoryIdsByParentId(state, category.parentCategoryId)
  );

  const isGettingDragged =
    checked && draggingCategory && draggingCategory.parentCategoryId === category.parentCategoryId;

  const disableHover = Boolean(draggingCategory);

  const multipleSelection = selectedCategoriesInGroup.length > 1;

  const isDragDisabled = !category.parentCategoryId || !draggable || isGettingDragged;

  function getStyle(style: any, snapshot: DraggableStateSnapshot) {
    if (!snapshot.combineWith && !snapshot.combineTargetFor) {
      return style;
    }
    const targetCategory = snapshot.combineWith;
    if (selectedCategoriesInGroup.includes(targetCategory)) {
      return {
        ...style,
        opacity: '1'
      };
    }

    return {
      ...style
    };
  }

  const draggedOverCategory = useTypedSelector(selectDraggedOverCategoryId);
  const isDraggedOver = draggedOverCategory?.id === category.id;
  const isNewItem = category.id === temporaryCategoryId;
  const isInMemoryItem = category.inMemory ?? false;

  const inMemoryCategoryExists = useTypedSelector(selectInMemoryCategoryExists);

  const selectDisabled =
    hasChildCategory ||
    // inMemory item varsa ve bu kategori inMemory değilse
    (inMemoryCategoryExists && !isInMemoryItem) ||
    // inMemory item yoksa ama inSession varsa ve bu kategori inSession değilse
    (!inMemoryCategoryExists && inSessionCategoryExists && !isInSession);

  const expandButtonEnabled =
    level < maxCategoryDepth &&
    (!category.hasBrandModel ||
      (allowTraverseIfUnapprovedModelExists === 'always' && category.taskStatus === 'Unapproved') ||
      (allowTraverseIfUnapprovedModelExists === 'onlyInSessions' &&
        category.taskStatus === 'Unapproved' &&
        isInSession));

  const handleBrandButtonClicked = () => {
    dispatch(categorySelectedForBrand(category.id));
  };

  return (
    <Draggable draggableId={id.toString()} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <StyledCategoryItem
          className={clsx({
            checkDisabled: disabled === 'checkDisabled',
            [className]: true,
            disabled: disabled === true
          })}
        >
          {snapshot.isDragging && multipleSelection && (
            <Paper
              className="dragged"
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              style={getStyle(provided.draggableProps.style, snapshot)}
            >
              <Typography color="inherit">
                Moving <b>{selectedCategoriesInGroup.length}</b> items
              </Typography>
              <Box
                bgcolor="lightGrey.main"
                borderRadius="24px"
                color="primary.main"
                height="24px"
                lineHeight="24px"
                textAlign="center"
                width="24px"
              >
                {selectedCategoriesInGroup.length}
              </Box>
            </Paper>
          )}
          {snapshot.isDragging && !multipleSelection && (
            <Paper
              className="dragged"
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              style={getStyle(provided.draggableProps.style, snapshot)}
            >
              <Typography color="inherit">
                Moving{' '}
                <b>
                  {category.code ? `${category.code} - ` : ''}
                  {category.name}
                </b>
              </Typography>
              <Box
                bgcolor="lightGrey.main"
                borderRadius="24px"
                color="primary.main"
                height="24px"
                lineHeight="24px"
                textAlign="center"
                width="24px"
              >
                1
              </Box>
            </Paper>
          )}
          <div
            className={clsx({
              hiddenCategoryItem: snapshot.isDragging
            })}
          >
            {popoverOptions.popoverElement}
            <InputItemDouble
              addMode={isNewItem}
              alwaysShowCheckbox={alwaysShowCheckbox}
              bodyClickable
              checkable={checkable}
              checkboxDisabled={disabled === 'checkDisabled'}
              checked={checked === true}
              className={clsx({
                draggedOverCategoryItem: isDraggedOver
              })}
              defaultReadonly={!isNewItem}
              deletable={deletable || isInMemoryItem || isInSession}
              disableHover={disableHover}
              draggable={!isDragDisabled}
              draggableProps={provided.draggableProps}
              draggableRef={provided.innerRef}
              draggableStyle={getStyle(provided.draggableProps.style, snapshot)}
              dragHandleProps={provided.dragHandleProps}
              editable={editable || isNewItem || isInMemoryItem}
              editDisabled={editDisabled}
              editDisabledTooltipTitle={editDisabledTooltipTitle}
              endAdornment={[
                {
                  element: hasChildCategory && (
                    <InfoIcon
                      className="icon"
                      color={expanded ? 'lightGrey' : 'darkGrey'}
                      contained
                      fontSize="small"
                      key={1}
                      onMouseEnter={popoverOptions.handlePopoverOpen}
                      onMouseLeave={popoverOptions.handlePopoverClose}
                    />
                  ),
                  position: 'left',
                  show: 'hover'
                },
                {
                  element: (category.inMemory || isInSession) && <NewBadge key={2} />,
                  position: 'left',
                  show: 'always'
                }
              ]}
              expandable={expandable}
              expandBodyClickActionEnabled={expandBodyActionEnabled}
              expandButtonDisabled={!expandButtonEnabled}
              expanded={expanded}
              formHelper={formHelper}
              formKey="name"
              formKey2="code"
              indeterminate={checked === 'indeterminate'}
              label={t('categories.code_field')}
              label2={t('categories.name_field')}
              onBeforeActionStart={handleBeforeActionStart}
              onCheck={handleCheck}
              onClose={handleClose}
              onConfirm={handleConfirm}
              onDelete={onDelete}
              onExpand={handleExpand}
              onSelect={handleSelect}
              primaryKey="id"
              selectable={selectable}
              selectBodyClickActionEnabled={selectBodyActionEnabled}
              selectButtonDisabled={selectDisabled}
              selected={selected}
              validatable={validatable}
            />
            {!category.draft && !hasChildCategory && allowModifyBrandModel && !disableHover && (
              <Grid container justifyContent="flex-end">
                <CatButton
                  className="addModel"
                  color="blue"
                  endIcon={<PlusIcon fontSize="small" />}
                  onClick={handleBrandButtonClicked}
                  size="small"
                  transformText={false}
                >
                  {t('categories.brand_model_add_button')}
                </CatButton>
              </Grid>
            )}
          </div>
        </StyledCategoryItem>
      )}
    </Draggable>
  );
}

export default React.memo(CategoryItem);
