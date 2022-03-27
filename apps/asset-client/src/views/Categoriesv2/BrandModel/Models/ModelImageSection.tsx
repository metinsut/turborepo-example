import { CatButton, CatTypography } from 'catamaran/core';
import { getImage } from 'store/slices/images';
import { styled } from 'catamaran/core/mui';
import { useLoading } from 'hooks';
import { useTranslation } from 'react-i18next';
import LoadingIcon from 'catamaran/icons/Loading';
import PhotoIcon from 'catamaran/icons/Photo';
import React, { useEffect, useMemo, useState } from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  className?: string;
  modelName: string;
  modelPhotoPath: string;
  onModelImageFileChange: (file: File) => void;
  onImageStatusChange: (status: ImageStatus) => void;
};

const ImageAddButton = styled(CatButton)(() => ({
  border: '1px dashed',
  borderRadius: '16px',
  height: '200px',
  width: '100%'
}));

const StyledImageContainer = styled('img')(() => ({
  height: '200px',
  width: '100%'
}));

export type ImageStatus = 'unchanged' | 'changed' | 'deleted' | '';

function ModelImageSection(props: Props) {
  const { className, modelName, modelPhotoPath, onModelImageFileChange, onImageStatusChange } =
    props;
  const { t } = useTranslation();
  const [localImageUrl, setLocalImageUrl] = useState('');
  const [modelImageUrl, setModelImageUrl] = useState('');

  const [imageLoading, imageLoadingDispatch] = useLoading();
  const [fetchRequired, setFetchRequired] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (modelPhotoPath && fetchRequired) {
        const image = (await imageLoadingDispatch(getImage(modelPhotoPath))) as string;
        setFetchRequired(false);
        setLocalImageUrl(image);
        setModelImageUrl(image);
      }
    };

    fetchImage();
  }, [imageLoadingDispatch, fetchRequired, modelPhotoPath]);

  useEffect(() => {
    setLocalImageUrl('');
    setModelImageUrl('');
    setFetchRequired(true);
  }, [modelPhotoPath]);

  const hiddenFileInputRef = React.useRef(null);

  const handleImageButtonClick = () => {
    hiddenFileInputRef.current.click();
  };

  const handleImageSelected = (event: any) => {
    // Get first file from input
    const selectedFile = event.target?.files[0];
    if (selectedFile) {
      // Store file on parent component
      onModelImageFileChange(selectedFile);
      const reader = new FileReader();
      // Store file name on local url variable
      reader.onload = (e: any) => {
        setLocalImageUrl(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDeleteClick = () => {
    setLocalImageUrl('');
    onModelImageFileChange(null);
    hiddenFileInputRef.current.value = null;
  };

  const localImageStatus: ImageStatus = useMemo(() => {
    if (modelImageUrl && !localImageUrl) {
      return 'deleted';
    }
    if (localImageUrl !== modelImageUrl) {
      return 'changed';
    }

    return 'unchanged';
  }, [localImageUrl, modelImageUrl]);

  useEffect(() => {
    onImageStatusChange(localImageStatus);
  }, [localImageStatus, onImageStatusChange]);

  return (
    <div className={className}>
      {localImageUrl ? (
        <div className="grid gap-16 justify-item-center">
          <StyledImageContainer alt={modelName} src={localImageUrl} />
          <CatButton
            color="red"
            endIcon={<TrashIcon style={{ marginLeft: '-8px' }} />}
            onClick={handleDeleteClick}
            size="small"
          >
            {t('asset_configurations.models.delete_photo')}
          </CatButton>
        </div>
      ) : (
        <ImageAddButton
          color="blue"
          onClick={handleImageButtonClick}
          size="small"
          transformText={false}
        >
          <div className="grid gap-8 justify-item-center">
            {imageLoading ? <LoadingIcon /> : <PhotoIcon />}
            <CatTypography color="inherit" variant="body1">
              {t('asset_configurations.models.image_button_descripion')}
            </CatTypography>
          </div>
        </ImageAddButton>
      )}
      <input
        accept="image/*"
        onChange={handleImageSelected}
        ref={hiddenFileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  );
}

export default ModelImageSection;
