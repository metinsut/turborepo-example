import { ACCOUNTINFORMATION } from 'routes/constant-route';
import { RequestRegisterUser } from 'store/slices/users/details/types';
import { getUserDetails } from 'store/slices/users/details/actions';
import { selectSessionUser } from 'store/slices/session';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import DesignatedPermission from 'views/Public/Invitation/DesignatedPermission';
import PersonalInformation from './PersonalInformation';
import useLoading from 'hooks/useLoading';

function AccountInformation() {
  const { t } = useTranslation();
  const [loading, loadingDispatch] = useLoading<RequestRegisterUser>({ initialState: true });

  const currentSessionUser = useTypedSelector(selectSessionUser);
  const userId = currentSessionUser.id;

  useEffect(() => {
    const fetchUser = async () => {
      await loadingDispatch(getUserDetails(userId));
    };

    fetchUser();
  }, [userId, loadingDispatch]);

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('layout.navbar.profile_settings')
        },
        {
          href: ACCOUNTINFORMATION,
          text: t('profile_settings.routes.account_information')
        }
      ]}
      pageHeader={t('profile_settings.account_information.title')}
      pageTitle={t('profile_settings.account_information.title')}
    >
      {!loading && (
        <>
          <PersonalInformation />
          <DesignatedPermission className="mt16" loading={loading} />
        </>
      )}
    </ContentLayout>
  );
}

export default AccountInformation;
