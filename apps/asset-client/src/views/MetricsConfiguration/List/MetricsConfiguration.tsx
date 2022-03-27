import { useQuery } from 'hooks/useQuery';
import { useTranslation } from 'react-i18next';
import AssetMetrics from './AssetMetrics';
import AssetsBranchButton from 'views/Assets/AssetsBranchButton';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import MetricCriteriaCard from './MetricCriteriaCard';

function MetricsConfiguration() {
  const { t } = useTranslation();
  const queries = useQuery();
  const mainCategoryId = queries.get('main-category');

  return (
    <ContentLayout
      branchSelector={<AssetsBranchButton disabled />}
      pageBreadcrumbs={[
        {
          text: 'Admin'
        },
        {
          text: t('metrics_configuration.routes.metric_configuration')
        }
      ]}
      pageHeader={t('metrics_configuration.page_title')}
      pageTitle={t('metrics_configuration.routes.metric_configuration')}
    >
      <div className="grid gap-24">
        <MetricCriteriaCard />
        <AssetMetrics mainCategoryId={mainCategoryId} />
      </div>
    </ContentLayout>
  );
}

export default MetricsConfiguration;
