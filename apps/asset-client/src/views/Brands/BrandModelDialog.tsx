import { Category } from 'store/slices/categories/types';
import { Grid, Modal, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { selectExpandedBrandId } from 'store/slices/brands/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { withDialogWrapper } from 'hooks';
import BottomBar from 'components/BottomBar';
import Brands from './Brands';
import Models from '../Models/Models';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  CatButton: {
    margin: theme.spacing(0, 1)
  },
  bottomBar: {
    borderRadius: theme.spacing(4),
    height: '3rem',
    width: '80%'
  },
  bottomBarGrid: {
    height: '100%'
  },
  bottomBarText: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1)
  },
  modalContent: {
    height: '100%',
    padding: theme.spacing(1, 0)
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  }
}));

type Props = {
  category: Category;
  className?: string;
  onClose: () => void;
  open: boolean;
};

function BrandModelDialog(props: Props) {
  const classes = useStyles();
  const { className, category, open, onClose } = props;

  const { t } = useTranslation();
  const expandedBrandId = useTypedSelector(selectExpandedBrandId);
  
  return (
    <Modal className={clsx(className, classes.root)} onClose={onClose} open={open}>
      <Grid
        alignItems="center"
        className={classes.modalContent}
        container
        direction="column"
        justifyContent="space-between"
      >
        <Grid />
        <Grid container direction="row" justifyContent="center">
          <Brands category={category} />
          <Models brandId={expandedBrandId} categoryId={category.id} />
        </Grid>
        <BottomBar
          className={classes.bottomBar}
          onGoBack={onClose}
          textElement={
            <Typography component="p" variant="body2">
              {t('brands.brand_model_dialog_bottom_text', { categoryName: category.name })}
            </Typography>
          }
        />
      </Grid>
    </Modal>
  );
}

export default withDialogWrapper(BrandModelDialog);
