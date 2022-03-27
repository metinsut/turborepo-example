import { CatDrawer } from 'catamaran/core';
import FilterBody from './FilterBody/FilterBody';
import FilterFooter from './FilterFooter';
import FilterHeader from './FilterHeader';
import classes from '../Users.module.scss';
import clsx from 'clsx';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const FilterDrawer = ({ open, onClose }: Props) => (
  <CatDrawer
    className="right-0 top-0 drawer-height z-4"
    onClose={onClose}
    open={open}
    paperClassName="h-inherit"
  >
    <div className={clsx(classes.filter_wrapper, 'bg-white radius-16')}>
      <FilterHeader />
      <FilterBody drawerOpen={open} />
      <FilterFooter />
    </div>
  </CatDrawer>
);

export default FilterDrawer;
