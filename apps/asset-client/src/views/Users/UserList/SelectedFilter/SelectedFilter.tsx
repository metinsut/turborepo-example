import ClearFilter from './ClearFilter';
import FilterItems from './FilterItems';
import classes from '../../Users.module.scss';

const SelectedFilter = () => (
  <div className={classes.selected_filter}>
    <FilterItems />
    <ClearFilter />
  </div>
);

export default SelectedFilter;
