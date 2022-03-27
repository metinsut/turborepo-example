import { clearAllFilter } from 'store/slices/users/filter/slice';
import { useTypedDispatch } from 'hooks';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';

const ClearFilter = () => {
  const dispatch = useTypedDispatch();
  const clearFilter = () => {
    dispatch(clearAllFilter());
  };
  return <FilterCancelIcon className="cursor-pointer" color="red" onClick={clearFilter} />;
};

export default ClearFilter;
