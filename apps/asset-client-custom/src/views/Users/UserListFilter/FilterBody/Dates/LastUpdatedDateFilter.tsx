import { DateFilterType } from 'components/DateFilter/types';
import { selectLastUpdate } from 'store/slices/users/filter/selectors';
import { updateLastUpdate } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DateFilter from 'components/DateFilter/DateFilter';
import React, { useCallback } from 'react';

const LastUpdatedDateFilter = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const lastUpdate = useTypedSelector(selectLastUpdate);
  const handleAddedDate = useCallback(
    (lastUpdate: DateFilterType) => {
      dispatch(updateLastUpdate(lastUpdate));
    },
    [dispatch]
  );
  return (
    <DateFilter
      dateFilter={lastUpdate}
      includeBlank
      onChange={handleAddedDate}
      title={t('users.filter.last_update')}
    />
  );
};

export default LastUpdatedDateFilter;
