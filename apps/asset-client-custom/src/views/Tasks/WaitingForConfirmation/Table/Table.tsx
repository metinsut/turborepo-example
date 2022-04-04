import { Table, TableContainer } from 'catamaran/core/mui';
import EmptyView from './EmptyView';
import TableBody from './Body/Body';
import TableHeader from './Header/Header';

interface Props {
  tasksLoading: boolean;
  isTasklistEmpty: boolean;
}

const TasksTable = ({ tasksLoading, isTasklistEmpty }: Props) => (
  <TableContainer className="pb16 flex-1">
    {isTasklistEmpty ? (
      <EmptyView />
    ) : (
      <Table className="tableSpace-4" size="small" stickyHeader>
        <TableHeader />
        <TableBody tasksLoading={tasksLoading} />
      </Table>
    )}
  </TableContainer>
);
export default TasksTable;
