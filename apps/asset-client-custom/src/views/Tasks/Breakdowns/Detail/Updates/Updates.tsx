import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { Collapse, Table, TableBody } from 'catamaran/core/mui';
import { SwitchTransition } from 'react-transition-group';
import { TaskDetailInformation } from 'store/slices/breakdown/taskDetail/types';
import {
  getHistoryPageByNumber,
  initializeHistory
} from 'store/slices/breakdown/taskDetail/action';
import {
  selectTaskHistoryCurrentPage,
  selectTaskHistoryPageCount
} from 'store/slices/breakdown/taskDetail/selector';
import { useLoading, useTypedDispatch, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import PaginationItem from './PaginationItem';
import UpdateRow from './UpdateRow';
import useDeepCompareEffect from 'use-deep-compare-effect';

type Props = {
  taskDetail: TaskDetailInformation;
};

function Updates({ taskDetail }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const pageCount = useTypedSelector(selectTaskHistoryPageCount);
  const currentPage = useTypedSelector(selectTaskHistoryCurrentPage);
  const [nextPageLoading, nextPageLoadingDispatch] = useLoading();
  const [previousPageLoading, previousPageLoadingDispatch] = useLoading();

  useDeepCompareEffect(() => {
    dispatch(initializeHistory());
  }, [
    dispatch,
    taskDetail.assetInformation,
    taskDetail.breakdownInformation,
    taskDetail.taskStatusInformation
  ]);

  const handleNextPage = () => {
    nextPageLoadingDispatch(getHistoryPageByNumber(currentPage + 1));
  };

  const handlePreviousPage = () => {
    previousPageLoadingDispatch(getHistoryPageByNumber(currentPage - 1));
  };

  return (
    <CatPanel>
      <CatPanelHeader title={t('tasks.detail.updates.header')} />
      <CatPanelContent className="grid align-items-center gap-20">
        <SwitchTransition>
          <Collapse key={taskDetail?.history.currentPage} timeout={{ enter: 300, exit: 0 }}>
            <Table className="w-full tableSpace-4" size="small">
              <TableBody>
                {taskDetail?.history.items.map((historyItem) => (
                  <UpdateRow historyItem={historyItem} key={historyItem.createdDate} />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </SwitchTransition>
        <div className="flex w-full justify-content-center">
          <PaginationItem
            activePage={taskDetail?.history.currentPage}
            nextPageLoading={nextPageLoading}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            pageCount={pageCount}
            previousPageLoading={previousPageLoading}
          />
        </div>
      </CatPanelContent>
    </CatPanel>
  );
}

export default Updates;
