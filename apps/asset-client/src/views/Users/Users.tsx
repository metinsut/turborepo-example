import { CatPaper } from 'catamaran/core';
import { clearAllUsers } from 'store/slices/users/list/slice';
import { emptyFilter } from 'store/slices/users/filter/data';
import { fetchUsers } from 'store/slices/users/list/actions';
import { selectActiveFilter } from 'store/slices/users/filter/selectors';
import { selectCurrentPage } from 'store/slices/users/list/selectors';
import { useEffect } from 'react';
import { useFindObjectChangesCount, useTypedDispatch, useTypedSelector } from 'hooks';
import { usePrevious } from 'hooks/usePrevious';
import { useTranslation } from 'react-i18next';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import Footer from './UserList/Footer';
import Header from './UserList/Header/Header';
import SelectedFilter from './UserList/SelectedFilter/SelectedFilter';
import Table from './UserList/Table/Table';
import UsersBranchButton from './UserCommon/UsersBranchButton';
import classes from './Users.module.scss';
import clsx from 'clsx';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useLoading from 'hooks/useLoading';

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const currentPage = useTypedSelector(selectCurrentPage);
  const activeFilter = useTypedSelector(selectActiveFilter);
  const prevCurrentPage = usePrevious(currentPage);
  const [usersLoading, usersLoadingDispatch] = useLoading();

  const filterChangesCount = useFindObjectChangesCount(emptyFilter, activeFilter, ['extraFilters']);

  useDeepCompareEffect(() => {
    if (prevCurrentPage === currentPage) {
      // filter changed, clear all -> page will be 1
      dispatch(clearAllUsers());
      if (currentPage === 1) {
        // filter changed when page = 1
        // Since page did not change, manuelly fetch (will not trigger this useeffect)
        usersLoadingDispatch(fetchUsers());
      }
    } else {
      // page changed (increment or reset) or initial run -> fetch
      usersLoadingDispatch(fetchUsers());
    }
  }, [usersLoadingDispatch, currentPage, activeFilter]);

  useEffect(
    () => () => {
      dispatch(clearAllUsers());
    },
    [dispatch]
  );

  return (
    <ContentLayout
      branchSelector={<UsersBranchButton />}
      pageBreadcrumbs={[
        {
          text: t('users.list.title')
        }
      ]}
      pageHeader={t('users.list.title')}
      pageTitle={t('users.list.title')}
    >
      <CatPaper className={clsx(classes.userList, 'overflow-hidden')}>
        <Header />
        {filterChangesCount > 0 && (
          <>
            <div className="divider-horizontal mx8" />
            <SelectedFilter />
          </>
        )}
        <div className="divider-horizontal mx8" />
        <Table usersLoading={usersLoading} />
        <Footer />
      </CatPaper>
    </ContentLayout>
  );
};

export default Users;
