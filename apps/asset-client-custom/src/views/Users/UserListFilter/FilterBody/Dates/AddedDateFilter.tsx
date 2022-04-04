import { DateFilterType } from 'components/DateFilter/types';
import { selectUserAdded } from 'store/slices/users/filter/selectors';
import { updateUserAdded } from 'store/slices/users/filter/slice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DateFilter from 'components/DateFilter/DateFilter';

const AddedDateFilter = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const userAdded = useTypedSelector(selectUserAdded);
  const handleAddedDateFilter = useCallback(
    (userAdded: DateFilterType) => {
      dispatch(updateUserAdded(userAdded));
    },
    [dispatch]
  );

  return (
    <DateFilter
      dateFilter={userAdded}
      includeBlank={false}
      onChange={handleAddedDateFilter}
      title={t('users.filter.date_added')}
    />
  );
};

export default AddedDateFilter;
