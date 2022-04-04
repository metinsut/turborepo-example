import { DateFilterType } from 'components/DateFilter/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectDraftFilterInformationPurchasedDate } from 'store/slices/asset/filter/selectors';
import { setFilterInformationPurchasedDate } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DateFilter from 'components/DateFilter/DateFilter';
import React, { useCallback } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

function DateOfPurchaseFilter(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const dateOfPurchase = useTypedSelector(selectDraftFilterInformationPurchasedDate);

  const handleDateOfPurchaseChange = useCallback(
    (dateFilter: DateFilterType) => {
      dispatch(setFilterInformationPurchasedDate(dateFilter));
    },
    [dispatch]
  );

  return (
    <DateFilter
      className={clsx(className, classes.root)}
      dateFilter={dateOfPurchase}
      includeBlank
      onChange={handleDateOfPurchaseChange}
      title={t('assets.assetFilter.date_of_purchase')}
    />
  );
}

export default DateOfPurchaseFilter;
