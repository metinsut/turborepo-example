import { CircularProgress, Grid } from 'catamaran/core/mui';
import { MYREQUESTSLIST } from 'routes/constant-route';
import { clearDraft } from 'store/slices/breakdown/myRequest/slice';
import { initializeMyRequestDetailPage } from 'store/slices/breakdown/myRequest/action';
import { selectDraftMyRequest } from 'store/slices/breakdown/myRequest/selector';
import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLoading, usePageKeyboardActions, useTypedDispatch, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import AssetInformation from '../Common/AssetInformation/AssetInformation';
import BreakdownInformation from '../Common/BreakdownInformation/BreakdownInformation';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import DateTime from '../Common/DateTime/DateTime';
import StatusInformation from './StatusInformation/StatusInformation';
import StickyBottomBar from './StickyBottomBar';
import clsx from 'clsx';
import styles from './MyRequest.module.scss';

interface MatchParams {
  breakdownId: string;
}

function MyRequestDetailPage() {
  const params: MatchParams = useParams();
  const { breakdownId } = params;

  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [detailLoading, detailLoadingDispatch] = useLoading();
  const draftMyRequest = useTypedSelector(selectDraftMyRequest);

  useEffect(() => {
    if (breakdownId) {
      detailLoadingDispatch(initializeMyRequestDetailPage(breakdownId));
    }
  }, [breakdownId, detailLoadingDispatch]);

  useEffect(
    () => () => {
      dispatch(clearDraft());
    },
    [dispatch]
  );

  const handleGoBack = useCallback(() => {
    history.push(MYREQUESTSLIST);
  }, [history]);

  usePageKeyboardActions({
    onEscape: handleGoBack
  });

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('tasks.routes.my_requests')
        },
        {
          text: t('tasks.breakdowns.my_request.breakdown_order')
        }
      ]}
      pageHeader={t('tasks.breakdowns.my_request.page_title')}
      pageTitle={t('tasks.breakdowns.my_request.page_title')}
    >
      {!detailLoading && draftMyRequest.assetInformation.id ? (
        <>
          <div className={clsx(styles.myrequest_page_wrapper, 'grid gap-8')}>
            <StatusInformation
              breakdownInformation={draftMyRequest.breakdownInformation}
              statusInformation={draftMyRequest.taskStatusInformation}
            />
            <AssetInformation
              assetInformation={draftMyRequest.assetInformation}
              contractVisible={false}
            />
            <BreakdownInformation
              breakdownInformation={draftMyRequest.breakdownInformation}
              requesterVisible={false}
            />
            <DateTime requestDate={draftMyRequest.breakdownInformation.requestDate} />
          </div>
          {!detailLoading && (
            <StickyBottomBar
              resolveStatus={draftMyRequest.taskStatusInformation.resolveStatus}
              taskId={draftMyRequest.breakdownInformation.id}
              taskStatus={draftMyRequest.taskStatusInformation.status}
            />
          )}
        </>
      ) : (
        <Grid alignItems="center" container direction="column" justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </ContentLayout>
  );
}

export default MyRequestDetailPage;
