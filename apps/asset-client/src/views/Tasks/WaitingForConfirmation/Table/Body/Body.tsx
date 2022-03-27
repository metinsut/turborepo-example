import { TableBody } from 'catamaran/core/mui';
import { clearAssignmentInformation } from 'store/slices/breakdown/waitingForConfirmation/slice';
import {
  incrementPage,
  selectAllWaitingForConfirmationIds,
  selectTotalNumber
} from 'store/slices/tasks/waitingForConformation/waitingForConfirmationList';
import { useCallback, useState } from 'react';
import { useDialogState, useTypedSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import ConfirmModal from 'views/Tasks/Breakdowns/WaitingForConfirmationDetail/ConfirmModal';
import DenyModal from 'views/Tasks/Breakdowns/WaitingForConfirmationDetail/DenyModal';
import TableBodyRow from './Row';
import TableSkeleton from 'views/Tasks/List/Table/Body/RowSkeleton';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

interface Props {
  tasksLoading: boolean;
}

const Body = ({ tasksLoading }: Props) => {
  const tasksIds = useTypedSelector(selectAllWaitingForConfirmationIds);
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

  const [confirmTaskAssetPair, setConfirmTaskAssetPair] = useState<{
    assetId?: string;
    taskId: string;
  }>({
    assetId: '',
    taskId: ''
  });

  const { isOpen: isConfirmOpen, togglePopup: toggleConfirmPopup } = useDialogState();

  const handleConfirmClick = (taskId: string, assetId: string) => {
    setConfirmTaskAssetPair({ assetId, taskId });
    toggleConfirmPopup(true);
  };

  const handleConfirmModalClose = () => {
    toggleConfirmPopup(false);
    dispatch(clearAssignmentInformation());
    setConfirmTaskAssetPair({ assetId: '', taskId: '' });
  };

  const { isOpen: isDenyOpen, togglePopup: toggleDenyPopup } = useDialogState();

  const handleDenyClick = (taskId: string) => {
    setConfirmTaskAssetPair({ taskId });
    toggleDenyPopup(true);
  };

  const handleDenyModalClose = () => {
    toggleDenyPopup(false);
    setConfirmTaskAssetPair({ assetId: '', taskId: '' });
  };

  return (
    <>
      <TableBody>
        {tasksIds.map((taskId, index) => (
          <TableBodyRow
            key={taskId}
            onConfirmClick={handleConfirmClick}
            onDenyClick={handleDenyClick}
            ref={index === tasksIds.length - 1 ? infiniteScrollRef : null}
            taskId={taskId.toString()}
          />
        ))}
        {tasksLoading && <TableSkeleton cellCount={7} />}
      </TableBody>
      <ConfirmModal
        assetId={confirmTaskAssetPair.assetId}
        breakdownId={confirmTaskAssetPair.taskId}
        onClose={handleConfirmModalClose}
        open={isConfirmOpen}
      />
      <DenyModal
        breakdownId={confirmTaskAssetPair.taskId}
        onClose={handleDenyModalClose}
        open={isDenyOpen}
      />
    </>
  );
};

export default Body;
