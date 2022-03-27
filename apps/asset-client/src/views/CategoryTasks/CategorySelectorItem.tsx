import { ButtonBase, Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Category } from 'store/slices/categories/types';
import { CategoryTask, updateTaskCategory } from 'store/slices/categoryTasks';
import {
  cancelCategorySelectionForTask,
  setSelectedCategory
} from 'store/slices/categories/actions';
import { clearSelectedCategory } from 'store/slices/categories/slice';
import { selectIsCategoryInSession } from 'store/slices/categories/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategorySelectorDialog from '../Categories/CategorySelectorDialog';
import NewBadge from 'catamaran/icons/NewBadge';
import Node from 'components/Node';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: '#494949',
    display: 'block',
    opacity: 0.5
  },
  container: {
    position: 'relative'
  },
  errorText: {
    color: theme.palette.red.main,
    fontSize: '9px',
    left: 5,
    marginTop: '-3px',
    position: 'absolute'
  },
  grid: {
    padding: theme.spacing(1.4)
  },
  root: {
    backgroundColor: '#F3F5F6',
    borderRadius: theme.spacing(1),
    padding: 0
  }
}));

type Props = {
  className?: string;
  onCategorySelect?: () => Promise<void>;
  hasError?: boolean;
  task: CategoryTask;
};

function CategorySelectorItem(props: Props) {
  const classes = useStyles();
  const { className, hasError, onCategorySelect, task } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const { category } = task;

  const isInSession = useTypedSelector((state) => selectIsCategoryInSession(state, category.id));

  const getCategoryList = (cat: Category): Category[] => {
    if (!cat) {
      return [];
    }

    const fromParents = getCategoryList(cat.parentCategory);
    return [...fromParents, cat];
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleEditButtonClick = () => {
    dispatch(setSelectedCategory(category));
    setDialogOpen(true);
  };

  const handleClose = () => {
    dispatch(clearSelectedCategory());
    setDialogOpen(false);
  };

  const handleCategorySelect = async (selectedCategoryId: string) => {
    await dispatch(updateTaskCategory(task, selectedCategoryId));
    onCategorySelect?.();
  };

  const handleCancel = async () => {
    await dispatch(cancelCategorySelectionForTask(category));
  };

  const scrollContainerRef = React.useRef(null);
  const scrollToRight = React.useCallback(() => {
    (scrollContainerRef.current as any).scrollToRight();
  }, []);

  React.useEffect(() => {
    // Scroll right by default
    scrollToRight();
  }, [scrollToRight]);

  return (
    <div className={classes.container}>
      <CategorySelectorDialog
        allowAddMainCategory={false}
        category={category}
        disableOtherMainCategories
        onCancel={handleCancel}
        onCategorySelect={handleCategorySelect}
        onClose={handleClose}
        open={dialogOpen}
      />
      <ButtonBase
        className={clsx(classes.root, className)}
        focusRipple
        onClick={handleEditButtonClick}
      >
        <Scrollbars autoHeight autoHeightMax={Number.MAX_VALUE} autoHide ref={scrollContainerRef}>
          <Grid
            alignItems="center"
            className={clsx(classes.grid)}
            container
            direction="row"
            justifyContent="flex-start"
            wrap="nowrap"
          >
            {getCategoryList(category).map((item, index, array) => (
              <React.Fragment key={item.id}>
                <Grid item>
                  <Node filled={index === array.length - 1} value={item.name} />
                </Grid>
                <Grid item>
                  {index < array.length - 1 && (
                    <ArrowForwardIosIcon className={classes.arrow} fontSize="small" />
                  )}
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs />
            {(category.inMemory || isInSession) && <NewBadge />}
          </Grid>
        </Scrollbars>
      </ButtonBase>
      {hasError && (
        <Typography className={classes.errorText}>
          {t('categories.tasks.inconsistant_category_error')}
        </Typography>
      )}
    </div>
  );
}

export default CategorySelectorItem;
