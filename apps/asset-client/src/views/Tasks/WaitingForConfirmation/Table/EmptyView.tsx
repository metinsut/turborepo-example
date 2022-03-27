import { CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import LightHouseOkIcon from 'catamaran/icons/LighthouseOk';

function EmptyList() {
  const { t } = useTranslation();

  return (
    <div className="grid justify-item-center mt64">
      <LightHouseOkIcon style={{ fontSize: '72px' }} />
      <CatTypography align="center" className="mt16 c-main-green" variant="h1">
        <b>{t('tasks.common.table.empty_list.header')}</b>
      </CatTypography>
      <CatTypography align="center" color="green" variant="h2">
        <Trans
          components={{ bold: <b /> }}
          i18nKey="tasks.common.table.empty_list.desc_wfc"
          t={t}
        />
      </CatTypography>
      <CatTypography align="center" variant="body1">
        {t('tasks.common.table.empty_list.info')}
      </CatTypography>
      <CatTypography align="center" variant="body1">
        {t('tasks.common.table.empty_list.tip')}
      </CatTypography>
    </div>
  );
}

export default EmptyList;
