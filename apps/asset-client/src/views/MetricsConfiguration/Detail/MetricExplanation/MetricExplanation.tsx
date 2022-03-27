import { CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import AssetUnreadIcon from 'catamaran/icons/AssetUnread';
import ContractIcon from 'catamaran/icons/Contract';
import LighthouseIcon from 'catamaran/icons/Lighthouse';
import UpTimeIcon from 'catamaran/icons/UpTime';

const MetricExplanation = () => {
  const { t } = useTranslation();

  return (
    <div className="grid p8 gap-24 radius-top-16 elev-1" style={{ gridTemplateColumns: '2fr 1fr' }}>
      <div className="grid align-content-start p8" style={{ gridGap: '33px' }}>
        <div className="flex gap-8 align-items-center">
          <UpTimeIcon />
          <CatTypography className="opacity-8" variant="h2">
            <Trans i18nKey="metrics_configuration.detail.explanation.title" t={t} />
          </CatTypography>
        </div>
        <div className="grid p8 gap-16" style={{ paddingLeft: '32px' }}>
          <div className="grid grid-auto-flow-column gap-8">
            <LighthouseIcon style={{ marginTop: '3px' }} />
            <CatTypography className="opacity-6" variant="body1">
              <Trans i18nKey="metrics_configuration.detail.explanation.desc1" t={t} />
            </CatTypography>
          </div>
          <div className="grid grid-auto-flow-column gap-8">
            <AssetUnreadIcon />
            <CatTypography className="opacity-6" variant="body1">
              {t('metrics_configuration.detail.explanation.desc2')}
            </CatTypography>
          </div>
          <div className="grid grid-auto-flow-column gap-8">
            <ContractIcon />
            <CatTypography className="opacity-6" variant="body1">
              <Trans i18nKey="metrics_configuration.detail.explanation.desc3" t={t} />
            </CatTypography>
          </div>
        </div>
      </div>
      <div className="bg-lightGrey-o-4 radius-16" style={{ minHeight: '308px' }} />
    </div>
  );
};

export default MetricExplanation;
