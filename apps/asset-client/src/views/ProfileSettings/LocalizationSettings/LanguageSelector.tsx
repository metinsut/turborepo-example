import { CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { Settings, changeUserSettings, selectUserLanguage } from 'store/slices/session';
import { useLoading, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'tr', disabled: false, name: 'Türkçe' },
  { code: 'en', disabled: false, name: 'English' },
  { code: 'arb', disabled: true, name: 'عربى' }
];

function LanguageSelector() {
  const { t } = useTranslation();
  const [loading, loadingDispatch] = useLoading<Settings>();

  const languageCode = useTypedSelector(selectUserLanguage);
  const handleChange = async (e: any) => {
    const selectedLanguage = e.target.value as string;
    await loadingDispatch(changeUserSettings({ languageCode: selectedLanguage }));
  };

  return (
    <div className="flex align-items-center justify-content-between">
      <CatTypography className="opacity-6" variant="body1">
        {t('profile_settings.localization_settings.language_title')}
      </CatTypography>
      <div className="w-half">
        <CatSelect
          disabled={loading}
          label="Application Language / Uygulama Dili / لغة التطبيق"
          loading={loading}
          onChange={handleChange}
          value={languageCode}
        >
          {languages.map((language) => (
            <CatMenuItem
              autoFocus={languageCode === language.code}
              disabled={language.disabled}
              key={language.code}
              value={language.code}
            >
              {language.name}
            </CatMenuItem>
          ))}
        </CatSelect>
      </div>
    </div>
  );
}

export default LanguageSelector;
