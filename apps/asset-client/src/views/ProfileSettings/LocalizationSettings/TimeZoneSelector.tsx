import { CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { Settings, changeUserSettings, selectUserTimeZone } from 'store/slices/session';
import { useLoading, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { t } = useTranslation();
  const [loading, loadingDispatch] = useLoading<Settings>();

  const userTimeZone = useTypedSelector(selectUserTimeZone);
  const handleChange = async (e: any) => {
    const timeZone = e.target.value as string;
    await loadingDispatch(changeUserSettings({ timeZone }));
  };

  return (
    <div className="flex align-items-center justify-content-between">
      <CatTypography className="opacity-6" variant="body1">
        {t('profile_settings.localization_settings.time_zone_title')}
      </CatTypography>
      <div className="w-half">
        <CatSelect
          disabled={loading}
          label={t('profile_settings.localization_settings.time_zone_title')}
          loading={loading}
          onChange={handleChange}
          value={userTimeZone}
        >
          {timeZones.map((timeZone) => (
            <CatMenuItem autoFocus={userTimeZone === timeZone} key={timeZone} value={timeZone}>
              {timeZone}
            </CatMenuItem>
          ))}
        </CatSelect>
      </div>
    </div>
  );
}

const timeZones = [
  '-11:00',
  '-10:00',
  '-09:00',
  '-08:00',
  '-07:00',
  '-06:00',
  '-05:00',
  '-04:00',
  '-03:00',
  '-02:00',
  '-01:00',
  '00:00',
  '+01:00',
  '+02:00',
  '+03:00',
  '+04:00',
  '+05:00',
  '+06:00',
  '+07:00',
  '+08:00',
  '+09:00',
  '+10:00',
  '+11:00'
];

export default LanguageSelector;
