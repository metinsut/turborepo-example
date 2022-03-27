import { CancelButton, ConfirmButton } from 'catamaran/core/Button';
import {
  CatKeyboardButton,
  CatKeyboardSection,
  CatPopover,
  CatTooltip,
  CatTypography
} from 'catamaran/core';
import { PopupState, bindPopover } from 'material-ui-popup-state/hooks';
import { modifyModelImage } from 'store/slices/modelsv2/actions';
import { selectModelById } from 'store/slices/modelsv2/selectors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import CantEditIcon from 'catamaran/icons/CantEdit';
import ModelImageSection, { ImageStatus } from './ModelImageSection';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';

type Props = {
  className?: string;
  modelId?: string;
  onClose?: () => void;
  open: boolean;
  popupState: PopupState;
};

function EditModelPopover(props: Props) {
  const { className, modelId, onClose, open, popupState } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const model = useTypedSelector((state) => selectModelById(state, modelId));
  const handlePopoverClose = () => {
    popupState.close();
    onClose?.();
  };

  const handleEnter = async () => {
    await dispatch(modifyModelImage(model.id, imageStatus, modelImageFile));
    handlePopoverClose();
  };

  const handleEscape = async () => {
    handlePopoverClose();
  };

  const [modelImageFile, setModelImageFile] = useState<File>(null);
  const [imageStatus, setImageStatus] = useState<ImageStatus>('');

  const handleModelImageFileChange = (file: File) => {
    setModelImageFile(file);
  };

  const handleImageStatusChanged = (status: ImageStatus) => {
    setImageStatus(status);
  };

  return (
    <CatPopover
      {...bindPopover(popupState)}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top'
      }}
      className={className}
      onClose={handlePopoverClose}
      open={open}
      transformOrigin={{
        horizontal: 'center',
        vertical: 'top'
      }}
      width="317px"
    >
      <CatKeyboardSection
        className="grid gap-16 p8"
        onEnter={handleEnter}
        onEscape={handleEscape}
        open
      >
        <CatTypography className="ml8" variant="body1">
          {t('asset_configurations.models.edit_model')}
        </CatTypography>
        <ReadonlyTextField
          disabled
          endAdornment={
            <CatTooltip
              arrow
              title={t('asset_configurations.models.model_name_cant_change_tooltip')}
            >
              <div>
                <CantEditIcon className="opacity-6" />
              </div>
            </CatTooltip>
          }
          label={t('asset_configurations.models.name_field')}
          text={model?.name}
        />
        <ModelImageSection
          className="m4 w-inherit"
          modelName={model?.name}
          modelPhotoPath={model?.photoPath}
          onImageStatusChange={handleImageStatusChanged}
          onModelImageFileChange={handleModelImageFileChange}
        />
        <div className="flex gap-16 justify-content-center">
          <CatKeyboardButton component={CancelButton} keyboardKey="escape" />
          <CatKeyboardButton
            component={ConfirmButton}
            disabled={imageStatus === 'unchanged'}
            keyboardKey="enter"
          />
        </div>
      </CatKeyboardSection>
    </CatPopover>
  );
}

export default withDialogWrapper(EditModelPopover);
