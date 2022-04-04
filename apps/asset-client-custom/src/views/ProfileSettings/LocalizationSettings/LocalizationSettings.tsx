import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { LOCALIZATIONSETTINGS } from 'routes/constant-route';
import { useTranslation } from 'react-i18next';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import LanguageSelector from './LanguageSelector';
import LocaleSelector from './LocaleSelector';
import TimeZoneSelector from './TimeZoneSelector';

function LocalizationSettings() {
  const { t } = useTranslation();

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('layout.navbar.profile_settings')
        },
        {
          href: LOCALIZATIONSETTINGS,
          text: t('profile_settings.routes.localization_settings')
        }
      ]}
      pageHeader={t('profile_settings.localization_settings.title')}
      pageTitle={t('profile_settings.localization_settings.title')}
    >
      <CatPanel>
        <CatPanelHeader title={t('profile_settings.localization_settings.panel_header')} />
        <div className="divider-horizontal" />
        <CatPanelContent>
          <div className="grid gap-16">
            <LanguageSelector />
            <div className="divider-horizontal" />
            <TimeZoneSelector />
            <LocaleSelector />
          </div>
        </CatPanelContent>
      </CatPanel>
    </ContentLayout>
  );
}

export default LocalizationSettings;
