import { AssetStatus } from 'store/slices/common/types';
import { CatStatusCard } from 'catamaran/core';
import { Colors } from 'catamaran/core/StatusCard/StatusCard';
import { Fade, Skeleton } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import StatusIcon from 'views/Common/AssetStatus/StatusIcon';

type Props = {
  assetStatus: AssetStatus;
  passiveDate?: string;
  retiredDate?: string;
  loading: boolean;
};

function AssetStatusCard({ assetStatus, passiveDate, retiredDate, loading }: Props) {
  const { t } = useTranslation();

  const statusCardColorMap = (): Colors => {
    switch (assetStatus) {
      case 'usable':
        return 'green';
      case 'caution':
        return 'yellow';
      case 'partialDown':
        return 'orange';
      case 'passive':
        return 'grey';
      case 'down':
        return 'red';
      case 'retired':
        return 'darkGrey';
      default:
        return 'green';
    }
  };

  const statusDescriptionMap = () => {
    switch (assetStatus) {
      case 'usable':
      case 'down':
      case 'caution':
      case 'partialDown':
        return <Trans i18nKey={`assets.status_description.${assetStatus}`} t={t} />;
      case 'passive':
        return (
          <Trans
            i18nKey={`assets.status_description.${assetStatus}`}
            t={t}
            values={{ date: passiveDate }}
          />
        );
      case 'retired':
        return (
          <Trans
            i18nKey={`assets.status_description.${assetStatus}`}
            t={t}
            values={{ date: retiredDate }}
          />
        );
      default:
        return '';
    }
  };

  if (!assetStatus) {
    return null;
  }

  return !loading ? (
    <Fade in={!loading} timeout={700}>
      <div>
        <CatStatusCard
          color={statusCardColorMap()}
          description={statusDescriptionMap()}
          iconContent={<StatusIcon fontSize="small" statusType={assetStatus} />}
          title={t(`assets.statuses.${assetStatus}`)}
        />
      </div>
    </Fade>
  ) : (
    <Skeleton animation="wave" className="radius-16" height={48} width={256} />
  );
}

export default AssetStatusCard;
