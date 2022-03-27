import { CatPaper } from 'catamaran/core';
import { CircularProgress } from 'catamaran/core/mui';
import { METRICSCONFIGURATION_LIST } from 'routes/constant-route';
import { dequal } from 'dequal';
import { initializeMetricDetailPage } from 'store/slices/metricsConfiguration/detail/action';
import { isArrayNullOrEmpty } from 'utils';
import { metricCleared } from 'store/slices/metricsConfiguration/detail/slice';
import {
  selectDraftMetric,
  selectInitialDraftMetric
} from 'store/slices/metricsConfiguration/detail/selectors';
import { useCallback, useEffect, useMemo } from 'react';
import {
  useDialogState,
  useLoading,
  usePageKeyboardActions,
  useTypedDispatch,
  useTypedSelector
} from 'hooks';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CancelDialog from './CancelDialog';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import DowntimeRules from './DowntimeRules/DowntimeRules';
import Goals from './Goal/Goals';
import MetricExplanation from './MetricExplanation/MetricExplanation';
import StickyBottomBar from './StickyBottomBar';
import TimeTolerance from './TimeTolerance/TimeTolerance';
import ValidIntervals from './ValidIntervals/ValidIntervals';

interface MatchParams {
  metricId: string;
}

const Detail = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const history = useHistory();
  const { metricId }: MatchParams = useParams();

  const draftMetric = useTypedSelector(selectDraftMetric);
  const initialMetric = useTypedSelector(selectInitialDraftMetric);

  const [initializeLoading, initializeLoadingDispatch] = useLoading({
    initialState: true
  });

  const handleInitializePage = useCallback(() => {
    if (metricId) {
      initializeLoadingDispatch(initializeMetricDetailPage(metricId));
    }
  }, [initializeLoadingDispatch, metricId]);

  useEffect(() => {
    handleInitializePage();
  }, [handleInitializePage]);

  useEffect(
    () => () => {
      dispatch(metricCleared());
    },
    [dispatch]
  );

  const metricChanged = !dequal(draftMetric, initialMetric);
  const metricValid = useMemo(() => {
    const hasAnyEmptyStatus = draftMetric.downtimeRules?.some((rule) =>
      isArrayNullOrEmpty(rule.statusIds)
    );
    return !hasAnyEmptyStatus;
  }, [draftMetric.downtimeRules]);

  const { isOpen: revertDialogOpen, togglePopup: toggleRevertPopup } = useDialogState();
  const handleRevert = useCallback(() => {
    toggleRevertPopup(true);
  }, [toggleRevertPopup]);

  const handleGoBack = useCallback(() => {
    history.push(`${METRICSCONFIGURATION_LIST}?main-category=${draftMetric?.mainCategoryId}`);
  }, [draftMetric?.mainCategoryId, history]);

  const handleEscape = useMemo(
    () => (metricChanged ? handleRevert : handleGoBack),
    [handleGoBack, handleRevert, metricChanged]
  );

  usePageKeyboardActions({
    onEscape: handleEscape
  });

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          href: METRICSCONFIGURATION_LIST,
          text: t('metrics_configuration.routes.configuration')
        },
        {
          href: METRICSCONFIGURATION_LIST,
          text: t('metrics_configuration.routes.metric_configuration')
        },
        {
          text: t('metrics_configuration.routes.forms')
        }
      ]}
      pageHeader={t('metrics_configuration.detail.page_header')}
      pageTitle={t('metrics_configuration.routes.metric_configuration')}
    >
      {initializeLoading ? (
        <div className="flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <CatPaper className="grid" style={{ marginBottom: '80px' }}>
            <MetricExplanation />
            <ValidIntervals />
            <div className="divider-horizontal mx32" />
            <DowntimeRules />
            <div className="divider-horizontal mx32" />
            <TimeTolerance />
            <div className="divider-horizontal mx32" />
            <Goals />
          </CatPaper>
          <StickyBottomBar
            mainCategoryId={draftMetric?.mainCategoryId}
            metricChanged={metricChanged}
            metricValid={metricValid}
          />
          <CancelDialog onClose={() => toggleRevertPopup(false)} open={revertDialogOpen} />
        </>
      )}
    </ContentLayout>
  );
};

export default Detail;
