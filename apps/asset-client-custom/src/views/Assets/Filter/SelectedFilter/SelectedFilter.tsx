import FilterButtons from './FilterButtons';
import FilterItems from './FilterItems';
import classes from 'views/Users/Users.module.scss';

type Props = {
  toggleSaveFilter: () => void;
};

function SelectedFilter(props: Props) {
  const { toggleSaveFilter } = props;

  return (
    <div className={classes.selected_filter}>
      <FilterItems />
      <FilterButtons toggleSaveFilter={toggleSaveFilter} />
    </div>
  );
}

export default SelectedFilter;
