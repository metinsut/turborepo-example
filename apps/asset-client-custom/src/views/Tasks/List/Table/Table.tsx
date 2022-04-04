import { Table, TableContainer } from 'catamaran/core/mui';
import { selectAllTaskIds } from 'store/slices/tasks/taskList/taskList';
import { useTypedSelector } from 'hooks';
import EmptyView from './EmptyView';
import TableBody from './Body/Body';
import TableHeader from './Header/Header';

interface Props {
  tasksLoading: boolean;
}

const TasksTable = ({ tasksLoading }: Props) => {
  const tasksIds = useTypedSelector(selectAllTaskIds);

  return (
    <TableContainer className="pb16 flex-1">
      <Table className="tableSpace-4" size="small" stickyHeader>
        <TableHeader />
        <TableBody tasksLoading={tasksLoading} />
      </Table>

      {!tasksLoading && tasksIds.length === 0 && <EmptyView />}
    </TableContainer>
  );
};

export default TasksTable;
