import { CatDialogContent, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import InfoIcon from 'catamaran/icons/Info';
import LighthouseIcon from 'catamaran/icons/Lighthouse';
import Plus2Icon from 'catamaran/icons/Plus2';
import SevenIcon from 'catamaran/icons/Seven';
import UniversalIcon from 'catamaran/icons/Universal';

const InfoDialogContent = () => {
  const { t } = useTranslation();

  return (
    <CatDialogContent className="grid gap-24">
      <div className="flex align-items-center gap-16">
        <Plus2Icon color="darkGrey" contained={false} hoverable={false} />
        <CatTypography>{t('asset_configurations.categories.onboarding.info1')}</CatTypography>
      </div>
      <div className="flex align-items-center gap-16">
        <UniversalIcon />
        <CatTypography>{t('asset_configurations.categories.onboarding.info2')}</CatTypography>
      </div>
      <div className="flex align-items-center gap-16">
        <LighthouseIcon />
        <CatTypography>{t('asset_configurations.categories.onboarding.info3')}</CatTypography>
      </div>
      <div className="flex align-items-center gap-16">
        <SevenIcon color="red" hoverable={false} />
        <CatTypography>
          <Trans i18nKey="asset_configurations.categories.onboarding.info4" t={t} />
        </CatTypography>
      </div>
      <div className="flex align-items-center gap-16">
        <InfoIcon color="darkGrey" contained={false} hoverable={false} />
        <CatTypography>{t('asset_configurations.categories.onboarding.info5')}</CatTypography>
      </div>
      <div />
    </CatDialogContent>
  );
};

export default InfoDialogContent;
