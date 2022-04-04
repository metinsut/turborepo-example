import { CatKeyboardButton, CatKeyboardSection, CatPopover, CatTypography } from 'catamaran/core';
import { PopupState, bindPopover } from 'material-ui-popup-state/hooks';
import { addModel, getSearchableModels } from 'store/slices/modelsv2/actions';
import { selectSearchModels } from 'store/slices/modelsv2/selectors';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import CancelButton from 'catamaran/core/Button/CommonButtons/CancelButton';
import CancelIcon from 'catamaran/icons/Cancel';
import ConfirmButton from 'catamaran/core/Button/CommonButtons/ConfirmButton';
import CreatableAutocomplete from 'catamaran/core/Autocomplete/CreatableAutocomplete';
import ModelImageSection, { ImageStatus } from './ModelImageSection';
import modelValidator from 'helpers/validations/ModelValidator';

type Props = {
  brandId: string;
  className?: string;
  categoryId: string;
  onClose?: () => void;
  open: boolean;
  popupState: PopupState;
};

function AddModelPopover(props: Props) {
  const { brandId, className, categoryId, onClose, open, popupState } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [selectedModelName, setSelectedModelName] = useState<string>(null);

  const searchableModels = useTypedSelector(selectSearchModels);
  const modelNames = useMemo(() => searchableModels.map((i) => i.name), [searchableModels]);

  useEffect(() => {
    dispatch(getSearchableModels(brandId));
  }, [dispatch, brandId, categoryId]);

  const handlePopoverClose = () => {
    popupState.close();
    onClose?.();
  };

  const asyncAddModel = async () => {
    await dispatch(addModel(selectedModelName, categoryId, brandId, imageStatus, modelImageFile));
    handlePopoverClose();
    setSelectedModelName(null);
  };

  const handleEscape = async () => {
    handlePopoverClose();
    setSelectedModelName(null);
  };

  const invalidText = useMemo(
    () => modelValidator({ name: selectedModelName }),
    [selectedModelName]
  );

  const handleChange = (value: string | string[]) => {
    setSelectedModelName(value as string);
  };

  const { isNewModel, modelPhotoPath } = useMemo(() => {
    if (!selectedModelName) {
      return { isNewModel: false, modelPhotoPath: '' };
    }
    const selectedModel = searchableModels.find((i) => i.name === selectedModelName);
    return {
      isNewModel: !selectedModel,
      modelPhotoPath: selectedModel?.photoPath ?? ''
    };
  }, [searchableModels, selectedModelName]);

  const [modelImageFile, setModelImageFile] = useState<File>(null);
  const [imageStatus, setImageStatus] = useState<ImageStatus>('');

  const handleModelImageFileChange = (file: File) => {
    setModelImageFile(file);
  };

  const handleImageStatusChanged = (status: ImageStatus) => {
    setImageStatus(status);
  };

  // when model changes, file selected from pc should be removed, since previous image will be irrelevant
  useEffect(() => {
    setModelImageFile(null);
  }, [selectedModelName]);

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
        onEnter={asyncAddModel}
        onEscape={handleEscape}
        open
      >
        <CatTypography className="ml8" variant="body1">
          {t('asset_configurations.models.add_a_model')}
        </CatTypography>
        <CreatableAutocomplete
          addHintObjectName={t('asset_configurations.models.add_hint')}
          autoFocus
          className="m4 w-inherit"
          clearIcon={<CancelIcon color="darkGrey" />}
          displayAddButtonWhenNoMatch
          getOptionValue={(option) => option}
          label={t('asset_configurations.models.select_model')}
          onChange={handleChange}
          onKeyDown={(e: any) => {
            e.stopPropagation();
          }}
          options={modelNames}
          selectedValues={selectedModelName}
          showNewBadge={isNewModel}
          TextFieldProps={{
            error: !!invalidText.name,
            helperText: <span>{invalidText.name}</span>
          }}
        />
        <ModelImageSection
          className="m4 w-inherit"
          modelName={selectedModelName}
          modelPhotoPath={modelPhotoPath}
          onImageStatusChange={handleImageStatusChanged}
          onModelImageFileChange={handleModelImageFileChange}
        />
        <div className="flex gap-16 justify-content-center">
          <CatKeyboardButton component={CancelButton} keyboardKey="escape" />
          <CatKeyboardButton
            component={ConfirmButton}
            disabled={!!invalidText.name}
            keyboardKey="enter"
          />
        </div>
      </CatKeyboardSection>
    </CatPopover>
  );
}

export default withDialogWrapper(AddModelPopover);
