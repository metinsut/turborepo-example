import { Category } from 'store/slices/categories/types';
import { DialogLegacy } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { clearDisabledCategories, setExpandedCategories } from 'store/slices/categories/slice';
import {
  disableCategories,
  expandAllCategoryTreeByLeafCategory,
  getMainCategoryIdFromCategoryRecursively
} from 'store/slices/categories/actions';
import {
  selectCategoryIdsByParentId,
  selectSelectedCategoryId
} from 'store/slices/categories/selectors';
import { useDeepCompareEffect } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import BottomBar from 'components/BottomBar';
import CategoryManagement from './CategoryManagement';
import React, { useMemo } from 'react';
import clsx from 'clsx';

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

const useMainCategoryIdFromCategory = (category: Category) => {
  const mainCategoryId = useMemo(
    () => getMainCategoryIdFromCategoryRecursively(category),
    [category]
  );

  return mainCategoryId;
};

type Props = {
  allowAddMainCategory?: boolean;
  allowTraverseIfUnapprovedModelExists?: 'always' | 'onlyInSessions' | 'never';
  category: Category;
  className?: string;
  defaultExpandMainCategoryId?: string;
  disableOtherMainCategories?: boolean;
  open: boolean;
  onCategorySelect?: (categoryId: string) => Promise<void>;
  onCancel?: () => Promise<void>;
  onClose: () => void;
};

function CategorySelectorDialog(props: Props) {
  const classes = useStyles();
  const {
    allowAddMainCategory = true,
    allowTraverseIfUnapprovedModelExists = 'always',
    category,
    className,
    defaultExpandMainCategoryId,
    disableOtherMainCategories,
    open,
    onCategorySelect,
    onCancel,
    onClose
  } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const calculatedMainCategoryId = useMainCategoryIdFromCategory(category);
  const mainCategoryId = defaultExpandMainCategoryId ?? calculatedMainCategoryId;

  const selectedCategoryId = useTypedSelector(selectSelectedCategoryId);
  React.useEffect(() => {
    if (category) {
      dispatch(expandAllCategoryTreeByLeafCategory(category));
    } else if (defaultExpandMainCategoryId) {
      dispatch(setExpandedCategories([null, defaultExpandMainCategoryId]));
    }
  }, [category, defaultExpandMainCategoryId, dispatch]);

  const rootCategoryIds = useTypedSelector((state) => selectCategoryIdsByParentId(state, null));

  useDeepCompareEffect(() => {
    let teardown;

    if (disableOtherMainCategories && rootCategoryIds.length > 0) {
      const ids = rootCategoryIds.filter((i) => i !== mainCategoryId);

      dispatch(disableCategories(ids));
      teardown = () => {
        dispatch(clearDisabledCategories());
      };
    }

    return teardown;
  }, [mainCategoryId, disableOtherMainCategories, dispatch, rootCategoryIds]);

  const categoryChanged = category?.id !== selectedCategoryId;

  const handleConfirm = async () => {
    await onCategorySelect(selectedCategoryId);
    onClose();
  };

  const handleCancel = async () => {
    await onCancel?.();
    onClose();
  };

  return (
    <div className={clsx(classes.root, className)}>
      <DialogLegacy className={classes.dialog} fullWidth maxWidth="lg" open={open}>
        <CategoryManagement
          allowAddMainCategory={allowAddMainCategory}
          allowModifyBrandModel={false}
          allowTraverseIfUnapprovedModelExists={allowTraverseIfUnapprovedModelExists}
          categoryManagementType="selector"
          checkable={false}
          deletable={false}
          draggable={false}
          editable={false}
          inMemory
          justifyContent="center"
          selectable
        />
        <BottomBar
          isCancelDisabled={!categoryChanged}
          isConfirmDisabled={!categoryChanged || !selectedCategoryId}
          isGoBackDisabled={categoryChanged}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onGoBack={onClose}
          textElement={
            <Typography variant="body2">{t('categories.select_description')}</Typography>
          }
        />
      </DialogLegacy>
    </div>
  );
}

export default withDialogWrapper(CategorySelectorDialog);
