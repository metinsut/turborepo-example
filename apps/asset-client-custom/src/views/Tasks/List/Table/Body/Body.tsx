import { TableBody } from 'catamaran/core/mui';
import {
  incrementPage,
  selectAllTaskIds,
  selectTotalNumber
} from 'store/slices/tasks/taskList/taskList';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'hooks';
import TableBodyRow from './Row';
import TableSkeleton from './RowSkeleton';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

interface Props {
  tasksLoading: boolean;
}

const Body = ({ tasksLoading }: Props) => {
  const tasksIds = useTypedSelector(selectAllTaskIds);
  const totalTasks = useTypedSelector(selectTotalNumber);
  const dispatch = useDispatch();

  const handleSeeMore = useCallback(async () => {
    dispatch(incrementPage());
  }, [dispatch]);

  const infiniteScrollRef = useInfiniteScroll({
    fetchMore: handleSeeMore,
    hasMore: totalTasks > tasksIds.length,
    loading: tasksLoading
  });

  return (
    <TableBody>
      {tasksIds.map((taskId, index) => (
        <TableBodyRow
          key={taskId}
          ref={index === tasksIds.length - 1 ? infiniteScrollRef : null}
          taskId={taskId.toString()}
        />
      ))}
      {tasksLoading && <TableSkeleton cellCount={8} />}
    </TableBody>
  );
};

export default Body;
