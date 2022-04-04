import { DateFilterType } from 'components/DateFilter/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectDraftFilterInformationCreatedDate } from 'store/slices/asset/filter/selectors';
import { setFilterInformationCreatedDate } from 'store/slices/asset/filter/slice';
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

function DateOfCreationFilter(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const dateOfCreation = useTypedSelector(selectDraftFilterInformationCreatedDate);

  const handleDateOfCreationChange = useCallback(
    (dateFilter: DateFilterType) => {
      dispatch(setFilterInformationCreatedDate(dateFilter));
    },
    [dispatch]
  );

  return (
    <DateFilter
      className={clsx(className, classes.root)}
      dateFilter={dateOfCreation}
      onChange={handleDateOfCreationChange}
      title={t('assets.assetFilter.date_of_creation')}
    />
  );
}

export default DateOfCreationFilter;
