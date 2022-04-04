import { useTranslation } from 'react-i18next';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import DepartmentsSection from './DepartmentsSection';

function Departments() {
  const { t } = useTranslation();

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('users.departments.department_list.department_list_title')
        }
      ]}
      pageHeader={t('users.departments.department_list.department_list_title')}
      pageTitle={t('users.departments.departments')}
    >
      <DepartmentsSection />
    </ContentLayout>
  );
}

export default Departments;
