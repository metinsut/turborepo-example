import { TableBody } from 'catamaran/core/mui';
import { incrementPage } from 'store/slices/users/list/slice';
import {
  selectAllUserIds,
  selectTotalAllUser,
  selectTotalUser
} from 'store/slices/users/list/selectors';
import { useCallback } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import TableBodyRow from './TableBodyRow';
import TableEmpty from 'components/Table/TableEmpty';
import TableSkeleton from './TableSkeleton';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

interface Props {
  usersLoading: boolean;
}

const UserListTableBody = ({ usersLoading }: Props) => {
  const dispatch = useTypedDispatch();
  const usersListIds = useTypedSelector(selectAllUserIds);
  const totalUser = useTypedSelector(selectTotalAllUser);
  const userListLength = useTypedSelector(selectTotalUser);

  const handleSeeMore = useCallback(async () => {
    dispatch(incrementPage());
  }, [dispatch]);

  const infiniteScrollRef = useInfiniteScroll({
    fetchMore: handleSeeMore,
    hasMore: totalUser > userListLength,
    loading: usersLoading
  });

  return (
    <TableBody>
      {usersListIds.map((userId, index) => (
        <TableBodyRow
          key={userId}
          ref={index === userListLength - 1 ? infiniteScrollRef : null}
          userId={userId.toString()}
        />
      ))}
      {usersLoading && <TableSkeleton />}
      {!usersLoading && usersListIds.length === 0 && (
        <TableEmpty
          descriptionKey="users.list.empty_list_desc"
          infoKey="users.list.empty_list_info"
        />
      )}
    </TableBody>
  );
};

export default UserListTableBody;
