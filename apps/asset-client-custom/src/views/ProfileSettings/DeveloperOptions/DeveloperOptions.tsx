import { ACCOUNTINFORMATION, DEVELOPEROPTIONS } from 'routes/constant-route';
import { CatPaper } from 'catamaran/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import React from 'react';
import SettingsDialog from 'views/Settings/SettingsDialog';

function DeveloperOptions() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleSettingsDialogClose = () => {
    history.push(ACCOUNTINFORMATION);
  };

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('layout.navbar.profile_settings')
        },
        {
          href: DEVELOPEROPTIONS,
          text: t('profile_settings.routes.developer_options')
        }
      ]}
      pageHeader={t('profile_settings.developer_options.title')}
      pageTitle={t('profile_settings.developer_options.title')}
    >
      <CatPaper className="overflow-hidden">
        {t('profile_settings.routes.developer_options')}
        <SettingsDialog onClose={handleSettingsDialogClose} open />
      </CatPaper>
    </ContentLayout>
  );
}

export default DeveloperOptions;
