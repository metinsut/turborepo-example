import { CircularProgress, Theme, makeStyles } from 'catamaran/core/mui';
import {
  getBranchLocationCodeType,
  updateBranchLocationCodeType
} from 'store/slices/location/locations/actions';
import { selectBranchLocationCodeType } from 'store/slices/location/locations/selectors';
import { upsertBranchLocationCode } from 'store/slices/location/locations/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CodeTypeSelectionPage from './CodeTypeSelection/CodeTypeSelectionPage';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import LocationBranchSelector from './LocationBranchSelector';
import LocationMainPage from './LocationMainPage/LocationMainPage';
import React, { useCallback, useEffect, useState } from 'react';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  loadingContainer: {
    alignContent: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  }
}));

type CurrentPage = 'codeTypeSelection' | 'locationMainPage';

function Locations() {
  const classes = useStyles();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [branchLoading, branchLoadingDispatch] = useLoading();
  const branchLocationCode = useTypedSelector(selectBranchLocationCodeType);
  const [currentPage, setCurrentPage] = useState<CurrentPage>(
    branchLocationCode?.isAutoCode ? 'codeTypeSelection' : 'locationMainPage'
  );

  useEffect(() => {
    if (branchLocationCode?.id) {
      setCurrentPage('locationMainPage');
    } else {
      setCurrentPage('codeTypeSelection');
    }
  }, [branchLocationCode]);

  const handleBranchChanged = useCallback(
    (branchId: string) => {
      if (branchId !== branchLocationCode?.branchId.toString()) {
        dispatch(upsertBranchLocationCode({ branchId }));
        branchLoadingDispatch(getBranchLocationCodeType(branchId));
      }
    },
    [branchLoadingDispatch, branchLocationCode?.branchId, dispatch]
  );

  const handleCodeConfirm = useCallback(
    (isAutoCode: boolean) => {
      dispatch(
        updateBranchLocationCodeType({
          isAutoCode,
          ...branchLocationCode
        })
      );
      setCurrentPage('locationMainPage');
    },
    [branchLocationCode, dispatch]
  );

  const pageElement = React.useMemo(() => {
    switch (currentPage) {
      case 'codeTypeSelection':
        return <CodeTypeSelectionPage onConfirm={handleCodeConfirm} />;
      case 'locationMainPage':
        return <LocationMainPage />;
      default:
        return null;
    }
  }, [currentPage, handleCodeConfirm]);

  return (
    <ContentLayout
      branchSelector={<LocationBranchSelector onBranchChanged={handleBranchChanged} />}
      pageBreadcrumbs={[
        {
          text: 'Admin'
        },
        {
          text: t('locations.title')
        }
      ]}
      pageHeader={t('locations.title')}
      pageTitle={t('locations.title')}
    >
      {branchLoading || !branchLocationCode ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        pageElement
      )}
    </ContentLayout>
  );
}

export default Locations;
