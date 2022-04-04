import { CatPaper } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { WFCLIST, saveToLocalStorage } from 'helpers/localStorage';
import {
  clear,
  getWaitingForConfirmationList,
  selectAllWaitingForConfirmationIds,
  selectCurrentPage,
  selectTotalNumber
} from 'store/slices/tasks/waitingForConformation/waitingForConfirmationList';
import {
  loadWfcFilterFromLocalStorage,
  resetLocalStorageStatus,
  selectLocalStorageInitialized,
  selectWfcFilter,
  selectWfcFilterBranch
} from 'store/slices/tasks/waitingForConformation/waitingForConfirmationFilter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { usePrevious } from 'hooks/usePrevious';
import { useTypedSelector } from 'hooks';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import Footer from 'views/Tasks/List/Footer';
import Header from './Header/Header';
import Table from './Table/Table';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useLoading from 'hooks/useLoading';

function WaitingForConfirmationList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasksIds = useTypedSelector(selectAllWaitingForConfirmationIds);
  const currentPage = useTypedSelector(selectCurrentPage);
  const prevCurrentPage = usePrevious(currentPage);
  const wfcFilter = useTypedSelector(selectWfcFilter);
  const filteredBranches = useTypedSelector(selectWfcFilterBranch);
  const [tasksWaitingForConfirmationLoading, tasksWaitingForConfirmationLoadingDispatch] =
    useLoading();
  const isTasklistEmpty = !!(!tasksWaitingForConfirmationLoading && tasksIds.length === 0);

  const localStorageInitialized = useTypedSelector(selectLocalStorageInitialized);

  const totalNumber = useTypedSelector(selectTotalNumber);

  useDeepCompareEffect(() => {
    if (localStorageInitialized) {
      if (prevCurrentPage === currentPage) {
        // filter changed, clear all -> page will be 1
        dispatch(clear());
        if (currentPage === 1) {
          // filter changed when page = 1
          // Since page did not change, manuelly fetch (will not trigger this useeffect)
          tasksWaitingForConfirmationLoadingDispatch(getWaitingForConfirmationList());
        }
      } else {
        // page changed (increment or reset) or initial run -> fetch
        tasksWaitingForConfirmationLoadingDispatch(getWaitingForConfirmationList());
      }
    }
  }, [
    tasksWaitingForConfirmationLoadingDispatch,
    currentPage,
    filteredBranches,
    localStorageInitialized
  ]);

  useEffect(() => {
    dispatch(loadWfcFilterFromLocalStorage());
  }, [dispatch]);

  useDeepCompareEffect(() => {
    saveToLocalStorage(WFCLIST, wfcFilter);
  }, [wfcFilter]);

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
          text: t('tasks.routes.my_requests')
        },
        {
          text: t('tasks.waiting_for_confirmation.waiting_for_confirmation')
        }
      ]}
      pageHeader={
        <Trans
          i18nKey="tasks.waiting_for_confirmation.page_header"
          t={t}
          values={{
            taskNumber: totalNumber
          }}
        />
      }
      pageTitle={t('tasks.waiting_for_confirmation.waiting_for_confirmation')}
    >
      <CatPaper
        className="flex flex-auto-flow-column relative overflow-hidden"
        style={{ height: 'calc(100vh - var(--page-space))' }}
      >
        <Header />
        <div className="divider-horizontal mx8" />
        <Table
          isTasklistEmpty={isTasklistEmpty}
          tasksLoading={tasksWaitingForConfirmationLoading}
        />
        <Footer taskCount={totalNumber.toString()} />
      </CatPaper>
    </ContentLayout>
  );
}

export default WaitingForConfirmationList;
