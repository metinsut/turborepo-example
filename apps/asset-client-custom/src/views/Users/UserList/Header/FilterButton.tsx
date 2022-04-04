import { updateActiveFilter } from 'store/slices/users/filter/slice';
import { useState } from 'react';
import { useTypedDispatch } from 'hooks';
import FilterDrawer from '../../UserListFilter/FilterDrawer';
import FilterIcon from 'catamaran/icons/Filter';
import clsx from 'clsx';

const FilterButton = () => {
  const dispatch = useTypedDispatch();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const onFilterClose = () => {
    dispatch(updateActiveFilter());
    setIsFilterDrawerOpen(false);
  };

  const onFilterDrawerToggle = (open: boolean) => {
    setIsFilterDrawerOpen(open);
  };

  return (
    <>
      <FilterIcon
        className="cursor-pointer"
        color="blue"
        contained
        onClick={() => onFilterDrawerToggle(true)}
      />
      <div>
        <FilterDrawer onClose={onFilterClose} open={isFilterDrawerOpen} />
        <div className={clsx({ overlay: isFilterDrawerOpen }, 'radius-16')} />
      </div>
    </>
  );
};

export default FilterButton;
