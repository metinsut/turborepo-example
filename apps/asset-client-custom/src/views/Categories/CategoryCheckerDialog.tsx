import { CatTypography, DialogLegacy } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import {
  checkMultipleCategories,
  disableCategories,
  getGroupedCheckedCategoryIds
} from 'store/slices/categories/actions';
import {
  clearCheckedCategories,
  clearDisabledCategories,
  setExpandedCategories
} from 'store/slices/categories/slice';
import { dequal } from 'dequal';
import {
  selectAllCheckedCategoryIds,
  selectCategoryIdsByParentId
} from 'store/slices/categories/selectors';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import BottomBar from 'components/BottomBar';
import CategoryManagement from './CategoryManagement';
import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import useDeepCompareEffect from 'use-deep-compare-effect';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      alignItems: 'center',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }
  },
  root: {
    justifyContent: 'center'
  }
}));

export type CloseAction = 'goBack' | 'cancel' | 'confirm';

type Props = {
  className?: string;
  checkedCategoryIds?: string[];
  defaultExpandMainCategoryId?: string;
  disabledCategoryIds?: string[];
  disableOtherMainCategories?: boolean;
  mainCategoryIds?: string[];
  open: boolean;
  onConfirm?: (categories: string[]) => Promise<void>;
  onClose: (action?: CloseAction) => void;
};

function CategoryCheckerDialog(props: Props) {
  const classes = useStyles();
  const {
    className,
    checkedCategoryIds = [],
    defaultExpandMainCategoryId,
    disabledCategoryIds = [],
    disableOtherMainCategories,
    mainCategoryIds,
    open,
    onConfirm,
    onClose
  } = props;

  const dispatch = useTypedDispatch();
  const checkedCategoryIdsFromStore = useTypedSelector(selectAllCheckedCategoryIds);
  const groupedCategoryIds = useMemo(() => {
    const ids = dispatch(getGroupedCheckedCategoryIds(checkedCategoryIdsFromStore));
    return ids;
  }, [dispatch, checkedCategoryIdsFromStore]);

  useEffect(() => {
    if (defaultExpandMainCategoryId) {
      dispatch(setExpandedCategories([null, defaultExpandMainCategoryId]));
    }
  }, [defaultExpandMainCategoryId, dispatch]);

  const rootCategoryIds = useTypedSelector((state) => selectCategoryIdsByParentId(state, null));

  // Disable other main categories
  useDeepCompareEffect(() => {
    let teardown;

    if (disableOtherMainCategories && rootCategoryIds.length > 0) {
      const ids = rootCategoryIds.filter((i) => !mainCategoryIds.includes(i));
      dispatch(disableCategories(ids));
      teardown = () => {
        dispatch(clearDisabledCategories());
      };
    }

    return teardown;
  }, [disableOtherMainCategories, dispatch, mainCategoryIds, rootCategoryIds]);

  const categoryChanged = !dequal(checkedCategoryIds, groupedCategoryIds);

  useEffect(() => {
    dispatch(checkMultipleCategories(checkedCategoryIds));
  }, [checkedCategoryIds, dispatch]);

  useEffect(() => {
    dispatch(disableCategories(disabledCategoryIds));
  }, [dispatch, disabledCategoryIds]);

  const handleConfirm = async () => {
    await onConfirm(groupedCategoryIds);

    onClose('confirm');
  };

  const handleCancel = async () => {
    dispatch(clearCheckedCategories());
    dispatch(checkMultipleCategories(checkedCategoryIds));
    onClose('cancel');
  };

  const handleGoBack = () => {
    onClose('goBack');
  };

  return (
    <div className={clsx(classes.root, className)}>
      <DialogLegacy className={classes.dialog} fullWidth maxWidth="lg" open={open}>
        <CategoryManagement
          allowAddCategory={false}
          allowCheckOnMainCategory
          allowModifyBrandModel={false}
          allowTraverseIfUnapprovedModelExists="never"
          alwaysShowCheckbox
          categoryManagementType="checker"
          checkable
          deletable={false}
          draggable={false}
          editable={false}
          inMemory
          justifyContent="center"
          selectable={false}
        />
        <BottomBar
          isCancelDisabled={!categoryChanged}
          isConfirmDisabled={!categoryChanged}
          isGoBackDisabled={categoryChanged}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onGoBack={handleGoBack}
          textElement={<CatTypography variant="body2">Select one or more categories</CatTypography>}
        />
      </DialogLegacy>
    </div>
  );
}

export default withDialogWrapper(CategoryCheckerDialog);
