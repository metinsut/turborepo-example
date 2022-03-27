import { Badge, CircularProgress, Grid, Typography } from 'catamaran/core/mui';
import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatIconButton,
  CatTypography
} from 'catamaran/core';
import { Category } from 'store/slices/categories/types';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { maxMainCategoryNumber } from 'store/slices/categories/data';
import { removeCategories, removeCategory } from 'store/slices/categories/actions';
import { selectIsUserAuthorized } from 'store/slices/session';
import { useDialogState, useTypedDispatch, useTypedSelector } from 'hooks';
import { useStyles } from './styles';
import React, { useCallback, useState } from 'react';
import RemainingChip from 'components/RemainingChip';
import TrashIcon from 'catamaran/icons/Trash';

export const useCategoryGroupHeader = (parentCategoryId: string) => {
  const dispatch = useTypedDispatch();

  const { isOpen, togglePopup } = useDialogState();
  const [removeId, setRemoveId] = useState<string>(null);

  const handleRemoveSingle = useCallback(
    (id: string) => () => {
      setRemoveId(id);
      togglePopup(true);
    },
    [togglePopup]
  );

  const onRemoveButtonClicked = useCallback(() => {
    setRemoveId(null);
    togglePopup(true);
  }, [togglePopup]);

  const onRemoveConfirmed = useCallback(async () => {
    togglePopup(false);
    if (removeId) {
      await dispatch(removeCategory(removeId));
      setRemoveId(null);
    } else {
      await dispatch(removeCategories(parentCategoryId));
    }
  }, [dispatch, parentCategoryId, removeId, togglePopup]);

  const onRemoveClosed = () => {
    togglePopup(false);
  };
  return {
    handleRemoveSingle,
    onRemoveButtonClicked,
    onRemoveClosed,
    onRemoveConfirmed,
    removeOpen: isOpen,
    togglePopup
  };
};

type Props = {
  allowAddCategory?: boolean;
  categoryIds: string[];
  checkedIds: string[];
  deletable?: boolean;
  onRemoveButtonClicked: () => void;
  onRemoveConfirmed: () => void;
  onRemoveClosed: () => void;
  parentCategory: Category;
  removeOpen: boolean;
  loading?: boolean;
};

function Header(props: Props) {
  const classes = useStyles();
  const {
    allowAddCategory = true,
    categoryIds,
    checkedIds,
    deletable,
    onRemoveButtonClicked,
    onRemoveConfirmed,
    onRemoveClosed,
    parentCategory,
    removeOpen,
    loading = false
  } = props;

  const { t } = useTranslation();

  const isUserAuthorized = useTypedSelector((state) =>
    selectIsUserAuthorized(state, 'mainCategoryEdit')
  );

  const showRemaining = allowAddCategory && checkedIds.length === 0;
  const showSelectAll = deletable && checkedIds.length > 0;

  const handleRemoveConfirmed = async () => {
    await onRemoveConfirmed();
  };
  return (
    <>
      <Box px={2} width="100%">
        <Box display="flex" justifyContent="space-between">
          <Box flex width={16} />
          {parentCategory ? (
            <Box center className={classes.top} flex flexDirection="column">
              <Typography className={classes.header} noWrap variant="body1">
                <Trans
                  i18nKey="categories.sub_categories_title"
                  t={t}
                  values={{ categoryName: parentCategory.name }}
                />
              </Typography>
            </Box>
          ) : (
            <Box
              alignContent="center"
              className={classes.top}
              flex
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box height={8} />
              <Typography className={classes.header} noWrap variant="body1">
                {t('categories.main_categories_title')}
              </Typography>
              {showRemaining && isUserAuthorized ? (
                <Box center flex my={0.5}>
                  <RemainingChip
                    maxCount={maxMainCategoryNumber}
                    remainingCount={maxMainCategoryNumber - categoryIds.length}
                  />
                </Box>
              ) : (
                <Box height={8} />
              )}
            </Box>
          )}
          <Box center flex width={16}>
            {loading && <CircularProgress size={16} variant="indeterminate" />}
          </Box>
        </Box>
        <Grid
          container
          justifyContent="center"
          style={{
            backgroundColor: 'white'
          }}
        >
          {showSelectAll && (
            <Badge
              badgeContent={checkedIds.length}
              className={classes.deleteButton}
              color="primary"
            >
              <CatIconButton onClick={onRemoveButtonClicked}>
                <TrashIcon color="red" contained />
              </CatIconButton>
            </Badge>
          )}
        </Grid>
      </Box>
      <CatDialog onAction={handleRemoveConfirmed} onClose={onRemoveClosed} open={removeOpen}>
        <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
        <CatDialogContent>
          <CatTypography variant="body1">{t('categories.delete_warning')}</CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={DeleteButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
    </>
  );
}

export default Header;
