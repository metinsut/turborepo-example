import { AssetInfo } from 'store/slices/breakdown/open/types';
import { CatPanel, CatPanelContent, CatPanelHeader, CatTypography } from 'catamaran/core';
import { isObjectNullOrEmpty } from 'utils';
import { useGetImage } from 'hooks/useGetImage';
import { useTranslation } from 'react-i18next';
import CalibrationOkIcon from 'catamaran/icons/CalibrationOk';
import MaintenanceIcon from 'catamaran/icons/Maintenance';
import MaintenanceOkIcon from 'catamaran/icons/MaintenanceOk';
import StatusIcon from 'views/Common/AssetStatus/StatusIcon';
import clsx from 'clsx';
import styles from '../Breakdowns.module.scss';

type Props = {
  assetInfo: AssetInfo;
};

const AssetInformation = (props: Props) => {
  const {
    assetInfo: { brandName, modelName, code, photoPath, categoryName, assetStatus }
  } = props;
  const { t } = useTranslation();
  const { imageLoading, imageUrl } = useGetImage(photoPath);

  return (
    <CatPanel className="grid align-content-start overflow-hidden">
      <CatPanelHeader
        iconComponent={MaintenanceIcon}
        title={t('tasks.breakdowns.open_breakdown.asset_information.title')}
      />
      <CatPanelContent
        className={clsx(
          styles.asset_info_content,
          'grid gap-16 grid-auto-flow-column justify-content-between'
        )}
      >
        <div className="grid gap-8">
          <div>
            <CatTypography className="opacity-6" variant="caption">
              {t('tasks.breakdowns.open_breakdown.asset_information.brand')}
            </CatTypography>
            <CatTypography variant="body1">{brandName}</CatTypography>
          </div>
          <div>
            <CatTypography className="opacity-6" variant="caption">
              {t('tasks.breakdowns.open_breakdown.asset_information.model')}
            </CatTypography>
            <CatTypography variant="body1">{modelName}</CatTypography>
          </div>
          <div>
            <CatTypography className="opacity-6" variant="caption">
              {t('tasks.breakdowns.open_breakdown.asset_information.code')}
            </CatTypography>
            <CatTypography variant="body1">{code}</CatTypography>
          </div>
        </div>
        <div className="grid justify-item-end gap-4">
          <div className={clsx('bg-lightGrey radius-8 opacity-7', styles.asset_info_img)}>
            {!isObjectNullOrEmpty(imageUrl) && !imageLoading && (
              <img alt={imageUrl} src={imageUrl} />
            )}
          </div>
          <CatTypography variant="body1">{categoryName}</CatTypography>
          <div className="grid grid-auto-flow-column align-items-center">
            <StatusIcon fontSize="small" statusType={assetStatus} />
            <div className="divider-vertical" />
            <MaintenanceOkIcon color="green" contained={false} fontSize="small" hoverable={false} />
            <CalibrationOkIcon color="green" contained={false} fontSize="small" hoverable={false} />
          </div>
        </div>
      </CatPanelContent>
    </CatPanel>
  );
};

export default AssetInformation;
