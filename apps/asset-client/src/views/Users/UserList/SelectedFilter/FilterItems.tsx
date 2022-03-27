import { CatChip } from 'catamaran/core';
import { selectActiveFilter } from 'store/slices/users/filter/selectors';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import FilterChipDialog from './FilterChipDialog';
import FilteredList from './FilteredList';
import classes from '../../Users.module.scss';

const FilterItems = () => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const activeFilter = useTypedSelector(selectActiveFilter);

  const [showSeeMore, setShowSeeMore] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const activeFilterString = JSON.stringify(activeFilter);

  useLayoutEffect(() => {
    if (ref.current.clientWidth < ref.current.scrollWidth) {
      setShowSeeMore(true);
    } else {
      setShowSeeMore(false);
    }
  }, [ref, activeFilterString, ref?.current?.scrollWidth]);

  return (
    <div className={classes.selected_filter_wrapper}>
      <div className={classes.selected_filter_scrollbar} ref={ref}>
        <FilteredList activeFilter={activeFilter} />
      </div>
      {showSeeMore && (
        <CatChip
          label={t('common.filters.see_more')}
          onClick={() => toggleModal()}
          variant="outlined"
        />
      )}
      <FilterChipDialog activeFilter={activeFilter} onClose={() => setOpen(false)} open={open} />
    </div>
  );
};

export default FilterItems;
