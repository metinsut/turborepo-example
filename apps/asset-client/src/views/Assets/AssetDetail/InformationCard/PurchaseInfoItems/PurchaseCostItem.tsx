import { Asset } from 'store/slices/asset/detail/types';
import { FormHelper } from 'hooks/useFormState';
import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import { SectionMode } from 'utils';
import { setAssetPurchaseCost } from 'store/slices/asset/detail/slice';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  currencySelector: {
    backgroundColor: '#F3F5F6',
    margin: '5px 0px'
  },
  hintTitle: {
    fontWeight: 'bold'
  },
  root: {}
}));

type Props = {
  className?: string;
  disabled?: boolean;
  formHelper: FormHelper<Asset>;
  mode: SectionMode;
  onEditClick: () => void;
};

function PurchaseCostItem(props: Props) {
  const classes = useStyles();
  const { className, formHelper, disabled, mode, onEditClick } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useDebounce(
    () => {
      dispatch(setAssetPurchaseCost(formHelper.formState.values.purchasedCost));
    },
    500,
    [dispatch, formHelper.formState.values.purchasedCost]
  );

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      direction="row"
      justifyContent="space-between"
      spacing={1}
    >
      <Grid item xs>
        <CatamaranTextField
          deletable={false}
          disabled={disabled}
          formHelper={formHelper}
          isNumericString
          label={`${t('assets.asset_edit.cost_field_hint')}($)`}
          mode={mode === 'edit' ? 'editOnly' : 'editAndConfirm'}
          name="purchasedCost"
          onEdit={onEditClick}
          readonlyFormatValue={(value) => Number(value).toFixed(2)}
        />
      </Grid>
    </Grid>
  );
}

export default PurchaseCostItem;
