import { CatMenuItem, CatSelect, CatTypography, supportedLocales } from 'catamaran/core';
import { Settings, changeUserSettings, selectUserLocale } from 'store/slices/session';
import { useLoading, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { t } = useTranslation();
  const [loading, loadingDispatch] = useLoading<Settings>();

  const userLocale = useTypedSelector(selectUserLocale);
  const handleChange = async (e: any) => {
    const locale = e.target.value as string;
    await loadingDispatch(changeUserSettings({ locale }));
  };

  return (
    <div className="flex align-items-center justify-content-between">
      <CatTypography className="opacity-6" variant="body1">
        {t('profile_settings.localization_settings.locale_title')}
      </CatTypography>
      <div className="w-half">
        <CatSelect
          disabled={loading}
          label={t('profile_settings.localization_settings.locale_title')}
          loading={loading}
          onChange={handleChange}
          value={userLocale}
        >
          {supportedLocales.map((locale) => (
            <CatMenuItem autoFocus={userLocale === locale} key={locale} value={locale}>
              {locale}
            </CatMenuItem>
          ))}
        </CatSelect>
      </div>
    </div>
  );
}

export default LanguageSelector;
