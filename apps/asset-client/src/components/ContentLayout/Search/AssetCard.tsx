import { CatTypography } from 'catamaran/core';
import { SearchResultType } from 'store/slices/asset/search/type';
import { isObjectNullOrEmpty } from 'utils';
import { useGetImage } from 'hooks/useGetImage';
import CalibrationOkIcon from 'catamaran/icons/CalibrationOk';
import MaintenanceOkIcon from 'catamaran/icons/MaintenanceOk';
import Paper from 'catamaran/core/Paper';
import StatusIcon from 'views/Common/AssetStatus/StatusIcon';

type Props = {
  searchItem: SearchResultType;
  onAssetSelect: (assetId: string) => Promise<void>;
};

const AssetCard = (props: Props) => {
  const {
    searchItem: { id: assetId, code, categoryName, brandName, modelName, photoPath, assetStatus },
    onAssetSelect
  } = props;

  const { imageLoading, imageUrl } = useGetImage(photoPath);

  const handleOnClick = async () => {
    await onAssetSelect(assetId);
  };

  return (
    <Paper>
      <div
        className="grid grid-auto-flow-column gap-8 cursor-pointer"
        onClick={handleOnClick}
        style={{ gridTemplateColumns: 'auto 1fr auto', height: '80px' }}
      >
        <div className="grid justify-content-center pl8 pt8 pb8">
          <StatusIcon fontSize="small" statusType={assetStatus} />
          <div className="divider-horizontal mx4 my6" />
          <MaintenanceOkIcon color="green" contained={false} fontSize="small" hoverable={false} />
          <CalibrationOkIcon color="green" contained={false} fontSize="small" hoverable={false} />
        </div>
        <div className="grid gap-8 align-content-between py8">
          <div className="grid">
            <CatTypography className="three-dot" variant="caption">
              {code}
            </CatTypography>
            <CatTypography className="three-dot" variant="body1">
              {categoryName}
            </CatTypography>
          </div>
          <div className="grid">
            <CatTypography className="three-dot opacity-8" variant="caption">
              {brandName}
            </CatTypography>
            <CatTypography className="three-dot opacity-8" variant="body2">
              {modelName}
            </CatTypography>
          </div>
        </div>
        <div
          className="radius-16 opacity-7"
          style={{ height: '80px', overflow: 'hidden', width: '80px' }}
        >
          {!isObjectNullOrEmpty(imageUrl) && !imageLoading && <img alt={imageUrl} src={imageUrl} />}
        </div>
      </div>
    </Paper>
  );
};

export default AssetCard;
