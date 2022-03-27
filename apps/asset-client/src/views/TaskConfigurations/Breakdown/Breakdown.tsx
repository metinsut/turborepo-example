import { styled } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import BreakdownTabs, { useActiveTab } from './BreakdownTabs';
import ContentLayout from 'components/ContentLayout/ContentLayout';

const StyledBreakdownTabs = styled(BreakdownTabs)(({ theme }) => ({
  height: 'auto',
  padding: theme.spacing(1)
}));

const tabs = ['substatuses', 'autoflows', 'breakdown_types', 'breakdown_costs'];

function Breakdown() {
  const { t } = useTranslation();

  const activeTab = useActiveTab();

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: 'Admin'
        },
        {
          text: t(`task_configuration.breakdown_tabs.${tabs[activeTab]}`)
        }
      ]}
      pageHeader={t(`task_configuration.breakdown_page_titles.${tabs[activeTab]}`)}
      pageTitle={t('task_configuration.routes.breakdown')}
    >
      <StyledBreakdownTabs activeTabIndex={activeTab} />
    </ContentLayout>
  );
}

export default Breakdown;
