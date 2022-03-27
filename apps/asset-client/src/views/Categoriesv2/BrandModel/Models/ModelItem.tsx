import { CatIconButton, CatMenu, CatMenuDivider, CatMenuItem, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { selectModelById } from 'store/slices/modelsv2/selectors';
import { styled } from 'catamaran/core/mui';
import { useDialogState, useTypedSelector } from 'hooks';
import EditIcon from 'catamaran/icons/Edit';
import EllipsisIcon from 'catamaran/icons/Ellipsis';
import ModelDeleteDialog from './ModelDeleteDialog';
import ModelItemImage from './ModelItemImage';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  brandId: string;
  categoryId: string;
  modelId: string;
  onChangePhotoClick: (modelId: string) => void;
};

const StyledWrapper = styled('div')(({ theme }) => ({
  '& .slide-in': {
    opacity: 0,
    transition: 'all 0.4s ease-out',
    width: '0px'
  },
  '& p': {
    color: theme.palette.darkGrey.main
  },
  '&:hover': {
    '& .slide-in': {
      opacity: 1,
      width: '24px'
    }
  },
  alignItems: 'center',
  backgroundColor: theme.palette.lightGrey.main,
  borderRadius: '16px',
  display: 'grid',
  gridAutoFlow: 'column',
  height: '32px',
  justifyContent: 'space-between',
  paddingLeft: '8px',
  paddingRight: '8px'
}));

function ModelItem(props: Props, ref: React.Ref<any>) {
  const { brandId, categoryId, modelId, onChangePhotoClick } = props;
  const { t } = useTranslation();
  const model = useTypedSelector((state) => selectModelById(state, modelId));

  const popupState = usePopupState({ popupId: 'modelItemContextMenu', variant: 'popover' });
  const { isOpen, togglePopup } = useDialogState();

  const handleDelete = () => {
    popupState.close();
    togglePopup(true);
  };

  const handleChangePhotoClick = () => {
    popupState.close();
    onChangePhotoClick(modelId);
  };

  return (
    <>
      <StyledWrapper ref={ref}>
        <CatTypography className="three-dot" variant="body2">
          {model?.name}
        </CatTypography>
        <div className="flex gap-8 align-items-center">
          <ModelItemImage modelId={modelId} photoPath={model.photoPath} />
          <CatIconButton {...bindTrigger(popupState)}>
            <EllipsisIcon className="opacity-8" color="darkGrey" containerClassName="slide-in" />
          </CatIconButton>
        </div>
      </StyledWrapper>
      <CatMenu {...bindMenu(popupState)}>
        <CatMenuItem onClick={handleChangePhotoClick}>
          <EditIcon color="blue" fontSize="small" hoverable={false} />
          <CatTypography variant="body2">
            <Trans i18nKey="asset_configurations.models.upload_change_photo" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuDivider />
        <CatMenuItem onClick={handleDelete}>
          <TrashIcon color="red" fontSize="small" hoverable={false} />
          <CatTypography variant="body2">
            <Trans i18nKey="asset_configurations.models.delete_model" t={t} />
          </CatTypography>
        </CatMenuItem>
      </CatMenu>
      <ModelDeleteDialog
        brandId={brandId}
        categoryId={categoryId}
        modelId={modelId}
        onClose={() => togglePopup(false)}
        open={isOpen}
      />
    </>
  );
}

export default React.forwardRef(ModelItem);
