import { DateFilterType } from 'components/DateFilter/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { setFilterContractEndDate } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DateFilter from 'components/DateFilter/DateFilter';
import React, { useCallback } from 'react';

import { selectDraftFilterContractEndDate } from 'store/slices/asset/filter/selectors';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

function EndDateFilter(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const contractEndDate = useTypedSelector(selectDraftFilterContractEndDate);

  const handleContractEndDateChange = useCallback(
    (dateFilter: DateFilterType) => {
      dispatch(setFilterContractEndDate(dateFilter));
    },
    [dispatch]
  );

  return (
    <DateFilter
      className={clsx(className, classes.root)}
      dateFilter={contractEndDate}
      onChange={handleContractEndDateChange}
      title={t('assets.assetFilter.contract_end_date')}
    />
  );
}

export default EndDateFilter;
