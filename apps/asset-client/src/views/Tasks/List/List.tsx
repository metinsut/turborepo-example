import { CatPaper } from 'catamaran/core';
import { TASKLIST, saveToLocalStorage } from 'helpers/localStorage';
import { Trans, useTranslation } from 'react-i18next';
import {
  clear,
  getTaskList,
  selectCurrentPage,
  selectTotalNumber
} from 'store/slices/tasks/taskList/taskList';
import {
  loadTaskListFilterFromLocalStorage,
  resetLocalStorageStatus,
  selectBranch,
  selectLocalStorageInitialized,
  selectPersonnel,
  selectPriority,
  selectStatus,
  selectTaskType
} from 'store/slices/tasks/taskList/taskListFilter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { usePrevious } from 'hooks/usePrevious';
import { useTypedSelector } from 'hooks';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import Footer from './Footer';
import Header from './Header/Header';
import Table from './Table/Table';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useLoading from 'hooks/useLoading';

function List() {
  const { t } = useTranslation();
  const [tasksLoading, tasksLoadingDispatch] = useLoading();
  const dispatch = useDispatch();

  const branchIds = useTypedSelector(selectBranch);
  const currentPage = useTypedSelector(selectCurrentPage);
  const personnel = useTypedSelector(selectPersonnel);
  const prevCurrentPage = usePrevious(currentPage);
  const priorities = useTypedSelector(selectPriority);
  const statuses = useTypedSelector(selectStatus);
  const taskTypes = useTypedSelector(selectTaskType);
  const localStorageInitialized = useTypedSelector(selectLocalStorageInitialized);

  const totalTasks = useTypedSelector(selectTotalNumber);

  useDeepCompareEffect(() => {
    if (localStorageInitialized) {
      if (prevCurrentPage === currentPage) {
        // filter changed, clear all -> page will be 1
        dispatch(clear());
        if (currentPage === 1) {
          // filter changed when page = 1
          // Since page did not change, manuelly fetch (will not trigger this useeffect)
          tasksLoadingDispatch(getTaskList());
        }
      } else {
        // page changed (increment or reset) or initial run -> fetch
        tasksLoadingDispatch(getTaskList());
      }
    }
  }, [
    tasksLoadingDispatch,
    currentPage,
    statuses,
    taskTypes,
    personnel,
    priorities,
    branchIds,
    localStorageInitialized
  ]);

  useEffect(() => {
    dispatch(loadTaskListFilterFromLocalStorage());
  }, [dispatch]);

  useDeepCompareEffect(() => {
    const myRequestFilter = { branchIds, personnel, priorities, statuses, taskTypes };
    saveToLocalStorage(TASKLIST, myRequestFilter);
  }, [branchIds, personnel, priorities, statuses, taskTypes]);

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
          text: t('tasks.routes.tasks')
        },
        {
          text: t('tasks.list.routes.my_tasks')
        }
      ]}
      pageHeader={
        <Trans
          i18nKey="tasks.list.page_header"
          t={t}
          values={{
            taskNumber: totalTasks
          }}
        />
      }
      pageTitle={t('tasks.list.routes.task_list_title')}
    >
      <CatPaper
        className="flex flex-auto-flow-column relative overflow-hidden"
        style={{ height: 'calc(100vh - var(--page-space))' }}
      >
        <Header />
        <div className="divider-horizontal mx8" />
        <Table tasksLoading={tasksLoading} />
        <Footer taskCount={totalTasks.toString()} />
      </CatPaper>
    </ContentLayout>
  );
}

export default List;
