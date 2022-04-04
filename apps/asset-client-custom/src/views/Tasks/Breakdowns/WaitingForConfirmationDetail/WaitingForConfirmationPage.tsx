import { CircularProgress, Grid } from 'catamaran/core/mui';
import { WAITINGFORCONFIRMATIONLIST } from 'routes/constant-route';
import { clearDraftInformation } from 'store/slices/breakdown/waitingForConfirmation/slice';
import { initializeWaitingForConfirmationDetailPage } from 'store/slices/breakdown/waitingForConfirmation/action';
import { selectReadonlyWaitingForConfirmation } from 'store/slices/breakdown/waitingForConfirmation/selector';
import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLoading, usePageKeyboardActions, useTypedDispatch, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import AssetInformation from '../Common/AssetInformation/AssetInformation';
import BreakdownInformation from '../Common/BreakdownInformation/BreakdownInformation';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import DateTime from '../Common/DateTime/DateTime';
import PaperHeader from 'components/PaperHeader';
import RoutingButtons from 'components/RoutingButtons';
import StickyBottomBar from './StickyBottomBar';

interface MatchParams {
  breakdownId: string;
}

function WaitingForConfirmationPage() {
  const params: MatchParams = useParams();
  const { breakdownId } = params;

  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [detailLoading, detailLoadingDispatch] = useLoading();
  const readonlyWaitingForInformation = useTypedSelector(selectReadonlyWaitingForConfirmation);

  useEffect(() => {
    if (breakdownId) {
      detailLoadingDispatch(initializeWaitingForConfirmationDetailPage(breakdownId));
    }
  }, [breakdownId, detailLoadingDispatch]);

  useEffect(
    () => () => {
      dispatch(clearDraftInformation());
    },
    [dispatch]
  );

  const handleGoBack = useCallback(() => {
    history.push(WAITINGFORCONFIRMATIONLIST);
  }, [history]);

  usePageKeyboardActions({
    onEscape: handleGoBack
  });

  const subRoutes = [
    {
      link: '.*',
      text: 'tasks.routes.asset_information'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.breakdown_information'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.date_time'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.assignment_information'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.notes_to_assignee'
    }
  ];

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('tasks.routes.tasks')
        },
        {
          text: t('tasks.breakdowns.confirm_breakdown.breakdown_order')
        }
      ]}
      pageHeader={t('tasks.breakdowns.confirm_breakdown.page_title')}
      pageTitle={t('tasks.list.routes.waiting_for_confirmation_title')}
    >
      {!detailLoading && readonlyWaitingForInformation.assetInformation.id ? (
        <>
          <div className="grid flex-auto-flow-column ">
            <PaperHeader px={0.5}>
              <RoutingButtons routes={subRoutes} />
            </PaperHeader>
            <div className="grid gap-8 mt8" style={{ paddingBottom: '80px' }}>
              <AssetInformation assetInformation={readonlyWaitingForInformation.assetInformation} />
              <BreakdownInformation
                breakdownInformation={readonlyWaitingForInformation.breakdownInformation}
              />
              <DateTime
                requestDate={readonlyWaitingForInformation.breakdownInformation.requestDate}
              />
            </div>
          </div>
          <StickyBottomBar
            assetId={readonlyWaitingForInformation.assetInformation.id}
            breakdownId={breakdownId}
            loading={detailLoading}
          />
        </>
      ) : (
        <Grid alignItems="center" container direction="column" justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </ContentLayout>
  );
}

export default WaitingForConfirmationPage;
