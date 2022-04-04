import { Box } from 'catamaran/core';
import { Divider } from 'catamaran/core/mui';
import { clearActiveFilter } from 'store/slices/asset/filter/slice';
import { useTypedDispatch } from 'hooks';
import BookmarkIcon from 'catamaran/icons/Bookmark';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';

type Props = {
  toggleSaveFilter: () => void;
};

function FilterButtons(props: Props) {
  const { toggleSaveFilter } = props;
  const dispatch = useTypedDispatch();
  const clearFilter = () => {
    dispatch(clearActiveFilter());
  };
  return (
    <Box center flex>
      <Divider orientation="vertical" style={{ height: '16px', margin: '8px' }} />
      <FilterCancelIcon className="cursor-pointer" color="red" onClick={clearFilter} />
      <Divider orientation="vertical" style={{ height: '16px', margin: '8px' }} />
      <BookmarkIcon className="cursor-pointer" color="blue" onClick={toggleSaveFilter} />
    </Box>
  );
}

export default FilterButtons;
