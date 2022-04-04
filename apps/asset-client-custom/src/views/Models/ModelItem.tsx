import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { Model } from 'store/slices/models';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useDialogState } from 'hooks';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import ImageSelectorButton from 'components/ImageSelector/ImageSelectorButton';
import NewBadge from 'catamaran/icons/NewBadge';
import React, { useCallback, useState } from 'react';
import SearchDropdownHelper from 'components/CatamaranTextField/SearchDropdownHelper';
import Searchable from 'components/CatamaranTextField/Searchable';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';
import modelValidator from 'helpers/validations/ModelValidator';
import useHover from 'hooks/useHover';

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(0.5, 0)
  },
  root: {},
  searchDropdownText: {
    padding: theme.spacing(1)
  },
  small: {
    '& .MuiInput-underline': {
      '&:after': {
        margin: theme.spacing(0, 0.8),
        marginBottom: '3px'
      },
      '&:before': {
        margin: theme.spacing(0, 0.8),
        marginBottom: '3px'
      }
    },
    '& .MuiInputAdornment-root': {},
    borderRadius: theme.spacing(8),
    height: theme.spacing(4)
  }
}));

type Props = {
  size?: 'small' | ('medium' & string);
  className?: string;
  defaultFocused?: boolean;
  defaultReadonly?: boolean;
  deletable?: boolean;
  disabled?: boolean;
  editable?: boolean;
  hasImageSelector?: boolean;
  label?: string;
  model?: Model;
  onClose?: () => void;
  onAddNew?: (model: Model) => Promise<Model>;
  onConfirm?: (model: Model) => Promise<Model>;
  onImageConfirm?: (file: File) => void;
  onImageDelete?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  searchableModels?: Model[];
  searchableModelsLoading?: boolean;
  showSearchHelperText?: boolean;
};

function ModelItem(props: Props) {
  const classes = useStyles();

  const {
    size = 'medium',
    className,
    defaultFocused,
    defaultReadonly = true,
    deletable,
    disabled,
    editable,
    hasImageSelector,
    label,
    model = { name: '' },
    onAddNew,
    onConfirm,
    onImageConfirm,
    onImageDelete,
    onEdit,
    onRemove,
    onClose,
    searchableModels,
    searchableModelsLoading,
    showSearchHelperText
  } = props;

  const [hover, hoverProps] = useHover();
  const { t } = useTranslation();
  const formHelper = useFormState(model, modelValidator);

  const { isOpen, togglePopup } = useDialogState();
  const handleDelete = useCallback(async () => {
    togglePopup(true);
  }, [togglePopup]);

  const handleRemove = useCallback(async () => {
    togglePopup(false);

    if (onRemove) {
      await onRemove();
    }
  }, [onRemove, togglePopup]);

  const handleClose = () => {
    togglePopup(false);
  };

  const [isImageFetchRequired, setIsImageFetchRequired] = useState(true);

  const handleModelImageConfirm = async (file: File) => {
    if (onImageConfirm) {
      await onImageConfirm(file);
    }
    setIsImageFetchRequired(true);
  };

  const handleModelImageDelete = async () => {
    await onImageDelete?.();
  };

  return (
    <div className={clsx(classes.root, className)}>
      <CatDialog onAction={handleRemove} onClose={handleClose} open={isOpen}>
        <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
        <CatDialogContent>
          <CatTypography variant="body1">{t('models.delete_warning')}</CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={DeleteButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
      <Searchable
        autoFocus={defaultFocused}
        className={clsx(classes.root, className)}
        formHelper={formHelper}
        minLengthForSearch={0}
        mode="editAndConfirm"
        name="name"
        noItemElement={
          <Typography className={classes.searchDropdownText} variant="body1">
            {t('models.no_model_found')}
          </Typography>
        }
        onAddNew={onAddNew}
        onClose={onClose}
        onConfirm={onConfirm}
        primaryKey="id"
        renderInput={(props) => (
          <CatamaranTextField
            adornments={[
              {
                child: model.isNew && <NewBadge key={1} />,
                hover: 'onlyOnNotHover',
                position: 'end',
                priority: 'high',
                show: 'readonly'
              },
              {
                child: hasImageSelector && (
                  <ImageSelectorButton
                    fetchRequired={isImageFetchRequired}
                    hoverOnParent={hover}
                    itemName={model.name}
                    key={2}
                    onConfirm={handleModelImageConfirm}
                    onDelete={handleModelImageDelete}
                    photoPath={model.photoPath}
                    setFetchRequired={setIsImageFetchRequired}
                    source="path"
                  />
                ),
                hover: 'always',
                position: 'end',
                priority: 'high',
                show: 'readonly'
              }
            ]}
            className={clsx({
              [classes.small]: size === 'small',
              [classes.margin]: true
            })}
            deletable={deletable}
            disabled={disabled}
            editable={editable}
            isRequired
            label={label}
            onDelete={handleDelete}
            onEdit={onEdit}
            parentHover={hover}
            parentHoverProps={hoverProps}
            validatable
            {...props}
          />
        )}
        searchHelperText={
          <SearchDropdownHelper messageKey="assets.asset_edit.model_dropdown_hint" />
        }
        searchItemsLoading={searchableModelsLoading}
        searchOptions={searchableModels}
        showSearchHelperText={showSearchHelperText}
        startWithEditMode={!defaultReadonly}
      />
    </div>
  );
}

export default ModelItem;
