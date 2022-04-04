import { Theme, makeStyles } from 'catamaran/core/mui';
import {
  cancelCategoryImport,
  checkImportStatusIsOnProgress,
  getCategoryImportByUserId,
  getCategoryImportStatusById
} from 'store/slices/imports/category/actions';
import { selectCategoryImport } from 'store/slices/imports/category/selectors';
import { updateDialogOpen } from 'store/slices/imports/category/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import NavBarResultBar from './ResultBar';
import React, { useCallback, useEffect, useMemo } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

function CategoryNavBarResultBar(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getCategoryImportByUserId());
  }, [dispatch]);

  const categoryImport = useTypedSelector(selectCategoryImport);

  useEffect(() => {
    let interval: number;
    if (categoryImport) {
      interval = window.setInterval(() => {
        if (!checkImportStatusIsOnProgress(categoryImport)) {
          clearInterval(interval);
        } else {
          dispatch(getCategoryImportStatusById(categoryImport.id));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, categoryImport]);

  const headerMessage = useMemo(() => {
    switch (categoryImport?.state) {
      case 'validationCheck':
        return 'Validating Categories';
      case 'confirmed':
        return 'Importing Categories';
      default:
        return '';
    }
  }, [categoryImport]);

  const resultMessage = useMemo(() => {
    switch (categoryImport?.state) {
      case 'validationCheck':
        return 'Validating Categories';
      case 'confirmed':
        return 'Importing Categories';
      default:
        return '';
    }
  }, [categoryImport]);

  const handleShowImport = useCallback(() => {
    dispatch(updateDialogOpen(true));
  }, [dispatch]);

  const handleCancelConfirmed = useCallback(async () => {
    await dispatch(cancelCategoryImport());
  }, [dispatch]);

  if (!categoryImport) {
    return null;
  }

  return (
    <NavBarResultBar
      cancelMessage="Do you want to cancel category import?"
      className={clsx(classes.root, className)}
      headerMessage={headerMessage}
      onCancelConfirmed={handleCancelConfirmed}
      onShowImport={handleShowImport}
      percentage={categoryImport.percentage}
      resultMessage={resultMessage}
    />
  );
}

export default CategoryNavBarResultBar;
