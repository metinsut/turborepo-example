import { CategoryImport } from 'store/slices/imports/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import {
  checkImportStatusIsOnProgress,
  getCategoryImportStatusById
} from 'store/slices/imports/category/actions';
import { useTypedDispatch } from 'hooks';
import ProgressBar from '../../ProgressBar/ProgressBar';
import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  categoryImport: CategoryImport;
};

function CategoryResultBar(props: Props) {
  const classes = useStyles();
  const { className, categoryImport } = props;
  const dispatch = useTypedDispatch();

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

  const statusMessage = useMemo(() => {
    switch (categoryImport.state) {
      case 'validationCheck':
        return 'Processing Categories';
      case 'confirmed':
        return 'Uploading Categories';
      case 'finished':
        return 'Completed';
      default:
        return '';
    }
  }, [categoryImport.state]);

  return (
    <ProgressBar
      className={clsx(classes.root, className)}
      percentage={categoryImport.percentage}
      statusMessage={statusMessage}
    />
  );
}

export default CategoryResultBar;
