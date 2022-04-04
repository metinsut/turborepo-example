import { Table, TableContainer } from 'catamaran/core/mui';
import TableBody from './Body/TableBody';
import TableHeader from './TableHeader';

interface Props {
  usersLoading: boolean;
}

const UserListTable = ({ usersLoading }: Props) => (
  <TableContainer className="pb16 flex-1">
    <Table className="tableSpace-4" size="small" stickyHeader>
      <TableHeader />
      <TableBody usersLoading={usersLoading} />
    </Table>
  </TableContainer>
);

export default UserListTable;
