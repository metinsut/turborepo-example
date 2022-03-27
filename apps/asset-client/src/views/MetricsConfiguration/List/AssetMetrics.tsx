import { CatTypography } from 'catamaran/core';
import { getAssetMetrics, selectAllMetrics } from 'store/slices/metricsConfiguration/list/list';
import { useLoading, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import LifetimeIcon from 'catamaran/icons/Lifetime';
import MetricCardSkeleton from './MetricCardSkeleton';
import MetricItemCard from './MetricItemCard';
import React, { useEffect } from 'react';

type Props = {
  mainCategoryId?: string;
};

function AssetMetrics({ mainCategoryId }: Props) {
  const { t } = useTranslation();

  const [metricsLoading, metricsLoadingDispatch] = useLoading();
  const metrics = useTypedSelector(selectAllMetrics);
  useEffect(() => {
    if (mainCategoryId) {
      metricsLoadingDispatch(getAssetMetrics(mainCategoryId));
    }
  }, [mainCategoryId, metricsLoadingDispatch]);

  return (
    <div className="grid gap-8">
      <div className="grid grid-auto-flow-column gap-10 align-items-center justify-content-start my8 mx16">
        <LifetimeIcon className="opacity-6" color="darkGrey" contained={false} hoverable={false} />
        <CatTypography className="opacity-8" variant="subtitle1">
          {t('metrics_configuration.list.asset_performance_metrics')}
        </CatTypography>
      </div>
      {!metricsLoading &&
        metrics.map((metric) => <MetricItemCard key={metric.id} metric={metric} />)}
      {metricsLoading && <MetricCardSkeleton />}
    </div>
  );
}

export default AssetMetrics;
