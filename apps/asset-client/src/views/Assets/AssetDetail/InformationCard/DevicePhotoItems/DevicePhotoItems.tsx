import { Brand } from 'store/slices/brands/types';
import { CatTypography } from 'catamaran/core';
import { Collapse } from 'catamaran/core/mui';
import { Model } from 'store/slices/models';
import { useGetImage } from 'hooks/useGetImage';
import { useTranslation } from 'react-i18next';
import PhotoIcon from 'catamaran/icons/Photo';

type Props = {
  model: Model;
  brand: Brand;
};

const DevicePhotoItems = (props: Props) => {
  const {
    model: { name: modelName, photoPath },
    brand: { name: brandName }
  } = props;

  const { t } = useTranslation();

  const { imageLoading, imageUrl } = useGetImage(photoPath);

  return (
    <div className="grid gap-8">
      <div className="flex align-items-center gap-4">
        <PhotoIcon fontSize="small" />
        <CatTypography variant="body1">{t('assets.asset_edit.device_photo_title')}</CatTypography>
      </div>
      <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <Collapse in={!imageLoading}>
          <figure>
            {!imageLoading && (
              <img
                alt={modelName}
                className="radius-16"
                src={imageUrl}
                style={{ maxHeight: '176px' }}
              />
            )}
            <figcaption>
              <CatTypography variant="caption">
                {brandName} - <span className="font-bold">{modelName}</span>
              </CatTypography>
            </figcaption>
          </figure>
        </Collapse>
      </div>
    </div>
  );
};

export default DevicePhotoItems;
