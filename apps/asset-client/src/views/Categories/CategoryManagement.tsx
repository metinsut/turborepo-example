import { Category } from 'store/slices/categories/types';
import { DragDropContext } from 'react-beautiful-dnd';
import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
  clearCheckedCategories,
  clearExpandedCategories,
  setDraggedOverCategoryId,
  setDraggingCategoryId
} from 'store/slices/categories/slice';
import { moveCategories } from 'store/slices/categories/actions';
import { selectExpandedIds } from 'store/slices/categories/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CategoryGroup, { CategoryGroupProps } from './CategoryGroup/CategoryGroup';
import React, { useCallback } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& >div': {
      paddingLeft: 1,
      paddingRight: 1
    }
  }
}));

type Props = CategoryGroupProps & {
  allowAddMainCategory?: boolean;
  justifyContent: 'flex-start' | 'center';
  onCategorySelect?: (category: Category) => void;
};

function CategoryManagement(props: Props) {
  const classes = useStyles();
  const {
    allowAddMainCategory = true,
    allowAddCategory = true,
    className,
    justifyContent,
    ...rest
  } = props;
  const dispatch = useTypedDispatch();

  const scrollContainerRef = React.useRef(null);

  const expandedCategoryIds = useTypedSelector(selectExpandedIds);

  const scrollToRight = React.useCallback(() => {
    (scrollContainerRef.current as any).scrollToRight();
  }, []);

  React.useEffect(() => {
    // Scroll right by default
    scrollToRight();
  }, [scrollToRight]);

  React.useEffect(
    () => () => {
      dispatch(clearExpandedCategories());
      dispatch(clearCheckedCategories());
    },
    [dispatch]
  );

  const handleDragStart = useCallback(
    (initial) => {
      dispatch(setDraggingCategoryId(initial.draggableId));
    },
    [dispatch]
  );

  const handleDragUpdate = useCallback(
    (updateProps) => {
      dispatch(setDraggedOverCategoryId(updateProps.combine?.draggableId));
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(
    (dropProps) => {
      dispatch(setDraggingCategoryId());
      dispatch(setDraggedOverCategoryId());

      if (!dropProps.combine) {
        return;
      }

      const sourceCategoryId = dropProps.draggableId;
      const destinationCategoryId = dropProps.combine.draggableId;

      dispatch(moveCategories(sourceCategoryId, destinationCategoryId));
    },
    [dispatch]
  );

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Scrollbars
        autoHeight
        autoHeightMax={Number.MAX_VALUE}
        autoHide
        className={clsx(classes.root, className)}
        hideTracksWhenNotNeeded
        ref={scrollContainerRef}
      >
        <Grid
          container
          justifyContent={expandedCategoryIds.length > 3 ? 'flex-start' : justifyContent}
          wrap="nowrap"
        >
          {expandedCategoryIds.map((parentCategoryId, index) => {
            const allow = parentCategoryId
              ? allowAddCategory
              : allowAddCategory && allowAddMainCategory;
            return (
              <Grid key={parentCategoryId}>
                <CategoryGroup
                  allowAddCategory={allow}
                  level={index}
                  onExpand={scrollToRight}
                  parentCategoryId={parentCategoryId}
                  {...rest}
                />
              </Grid>
            );
          })}
        </Grid>
      </Scrollbars>
    </DragDropContext>
  );
}

export default CategoryManagement;
