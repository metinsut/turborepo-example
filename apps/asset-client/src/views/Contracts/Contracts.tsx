import { useTranslation } from 'react-i18next';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import ContractsSection from './ContractsSection';
import PlansSection from 'views/Plans/PlansSection';

function Contracts() {
  const { t } = useTranslation();

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('contracts.contract_list.contract_plan_list_title')
        }
      ]}
      pageHeader={t('contracts.contract_list.contract_plan_list_title')}
      pageTitle={t('assets.routes.contracts')}
    >
      <ContractsSection />
      <PlansSection />
    </ContentLayout>
  );
}

export default Contracts;
