import { CancelButton, ConfirmButton, DeleteButton, GoBackButton } from 'catamaran/core/Button';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { Grid, IconButton } from 'catamaran/core/mui';
import { useDialogState, withDialogWrapper } from 'hooks';
import { useTranslation } from 'react-i18next';
import Export from 'catamaran/icons/Export';
import NoImageIndicator from './NoImageIndicator';
import React, { useState } from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import UploadIcon from 'catamaran/icons/Upload';

type Props = {
  itemName: string;
  imageUrl?: string;
  onCancel?: () => void;
  onConfirm: (imageFile: File) => void;
  onDelete?: () => Promise<void>;
  open: boolean;
};

function ImageSelectorDialog(props: Props) {
  const { itemName, imageUrl, onCancel, onConfirm, onDelete, open } = props;

  const [localImageUrl, setLocalImageUrl] = useState(imageUrl);
  const [imageFile, setImageFile] = useState<File>(null);
  const { t } = useTranslation();

  const imageAvailable = !!localImageUrl;
  const imageChanged = imageUrl !== localImageUrl;

  const contentMessage =
    t('models.upload_new_photo') + (imageAvailable ? t('models.delete_existing_photo') : '');
  const hiddenFileInputRef = React.useRef(null);

  const handleSelectFileButton = () => {
    hiddenFileInputRef.current.click();
  };

  const handleChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setLocalImageUrl(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const { isOpen: isDeleteOpen, togglePopup: toggleDeletePopup } = useDialogState();

  const handleDeleteButtonClick = () => {
    toggleDeletePopup(true);
  };

  const handleDeleteDialogConfirm = async () => {
    await onDelete?.();

    setLocalImageUrl(null);
    toggleDeletePopup(false);
    onCancel();
  };

  const handleDeleteDialogClose = () => {
    toggleDeletePopup(false);
  };

  const handleConfirm = async () => {
    onConfirm(imageFile);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }

    setLocalImageUrl(null);
  };

  return (
    <>
      <CatDialog onAction={handleConfirm} onClose={handleCancel} open={open}>
        <CatDialogTitle
          iconComponent={UploadIcon}
          title={t('models.change_photo_title', { modelName: itemName })}
        />
        <CatDialogContent className="grid gap-16">
          <div className="flex justify-content-center">{contentMessage}</div>
          <Grid container spacing={1}>
            <Grid alignContent="center" container item justifyContent="flex-end" xs={3}>
              <IconButton onClick={handleSelectFileButton} size="large">
                <Export color="blue" />
              </IconButton>
              <input
                accept="image/*"
                onChange={handleChange}
                ref={hiddenFileInputRef}
                style={{ display: 'none' }}
                type="file"
              />
            </Grid>
            <Grid alignContent="center" container item justifyContent="center" xs={6}>
              {!imageAvailable ? (
                <NoImageIndicator className="image" onClick={handleSelectFileButton} />
              ) : (
                <img
                  alt={`${itemName}`}
                  className="image cover"
                  src={localImageUrl}
                  style={{ height: '143px', width: '243px' }}
                />
              )}
            </Grid>
            <Grid alignContent="center" container item justifyContent="flex-start" xs={3}>
              <IconButton onClick={handleDeleteButtonClick} size="large">
                <TrashIcon color="red" />
              </IconButton>
            </Grid>
          </Grid>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={imageChanged ? CancelButton : GoBackButton} variant="close" />
          <CatDialogButton component={ConfirmButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
      <CatDialog
        onAction={handleDeleteDialogConfirm}
        onClose={handleDeleteDialogClose}
        open={isDeleteOpen}
      >
        <CatDialogTitle iconComponent={TrashIcon} title={t('images.remove_image_header')} />
        <CatDialogContent>
          <CatTypography variant="body1">{t('images.remove_image_desc')}</CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={DeleteButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
    </>
  );
}

export default withDialogWrapper(ImageSelectorDialog);
