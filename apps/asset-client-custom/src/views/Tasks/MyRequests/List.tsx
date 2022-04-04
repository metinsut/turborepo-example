import { CatPaper } from 'catamaran/core';
import { MYREQUESTLIST, saveToLocalStorage } from 'helpers/localStorage';
import { Trans, useTranslation } from 'react-i18next';
import {
  clear,
  getMyRequestsList,
  loadMyRequestFilterFromLocalStorage,
  resetLocalStorageStatus,
  selectAllMyRequestsIds,
  selectBranchFilters,
  selectCurrentPage,
  selectLocalStorageInitialized,
  selectStatusFilters,
  selectTotalNumber
} from 'store/slices/tasks/myRequests';
import { useEffect } from 'react';
import { usePrevious } from 'hooks/usePrevious';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import Footer from 'views/Tasks/List/Footer';
import Header from 'views/Tasks/MyRequests/Header/Header';
import Table from './Table/Table';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useLoading from 'hooks/useLoading';

function List() {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const tasksIds = useTypedSelector(selectAllMyRequestsIds);
  const currentPage = useTypedSelector(selectCurrentPage);
  const statusFilters = useTypedSelector(selectStatusFilters);
  const branchIds = useTypedSelector(selectBranchFilters);
  const prevCurrentPage = usePrevious(currentPage);

  const localStorageInitialized = useTypedSelector(selectLocalStorageInitialized);

  const totalTasks = useTypedSelector(selectTotalNumber);

  const [myRequestsLoading, myRequestsLoadingDispatch] = useLoading();
  const isTasklistEmpty = !!(!myRequestsLoading && tasksIds.length === 0);

  useDeepCompareEffect(() => {
    if (localStorageInitialized) {
      if (prevCurrentPage === currentPage) {
        // filter changed, clear all -> page will be 1
        dispatch(clear());
        if (currentPage === 1) {
          // filter changed when page = 1
          // Since page did not change, manuelly fetch (will not trigger this useeffect)
          myRequestsLoadingDispatch(getMyRequestsList());
        }
      } else {
        // page changed (increment or reset) or initial run -> fetch
        myRequestsLoadingDispatch(getMyRequestsList());
      }
    }
  }, [myRequestsLoadingDispatch, currentPage, branchIds, statusFilters, localStorageInitialized]);

  useEffect(() => {
    dispatch(loadMyRequestFilterFromLocalStorage());
  }, [dispatch]);

  useDeepCompareEffect(() => {
    const myRequestFilter = { branchIds, statusFilters };
    saveToLocalStorage(MYREQUESTLIST, myRequestFilter);
  }, [branchIds, statusFilters]);

  useEffect(
    () => () => {
      dispatch(clear());
      dispatch(resetLocalStorageStatus());
    },
    [dispatch]
  );

  return (
    <ContentLayout
      branchSelector={<div />}
      pageBreadcrumbs={[
        {
          text: t('tasks.my_requests.my_requests')
        },
        {
          text: t('tasks.my_requests.task_list')
        }
      ]}
      pageHeader={
        <Trans
          i18nKey="tasks.my_requests.page_header"
          t={t}
          values={{
            taskNumber: totalTasks
          }}
        />
      }
      pageTitle={t('tasks.list.routes.my_requests_title')}
    >
      <CatPaper
        className="flex flex-auto-flow-column relative overflow-hidden"
        style={{ height: 'calc(100vh - var(--page-space))' }}
      >
        <Header />
        <div className="divider-horizontal mx8" />
        <Table isTasklistEmpty={isTasklistEmpty} tasksLoading={myRequestsLoading} />
        <Footer taskCount={totalTasks?.toString()} />
      </CatPaper>
    </ContentLayout>
  );
}

export default List;
