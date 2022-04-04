import { CatIconButton, CatMenu, CatMenuDivider, CatMenuItem, CatTypography } from 'catamaran/core';
import { Draggable } from 'react-beautiful-dnd';
import { FormField } from 'store/slices/assetConfiguration/forms/types';
import { Trans } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { styled } from 'catamaran/core/mui';
import { t } from 'i18next';
import DragAffordanceIcon from 'catamaran/icons/DragAffordance';
import EditIcon from 'catamaran/icons/Edit';
import EllipsisIcon from 'catamaran/icons/Ellipsis';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

const StyledWrapper = styled('div')(({ theme }) => ({
  '& .fade-in': {
    opacity: 0,
    transition: 'all 0.4s ease-out'
  },
  '& .slide-in': {
    opacity: 0,
    transition: 'all 0.4s ease-out',
    width: '0px'
  },
  '&.isDragging, :hover': {
    '& .fade-in': {
      opacity: 1
    },
    '& .slide-in': {
      opacity: 1,
      width: '24px'
    },
    backgroundColor: theme.palette.common.white,
    border: '1px solid rgba(73, 73, 73, 0.2)'
  },
  alignItems: 'center',
  backgroundColor: theme.palette.lightGrey.main,
  border: '1px solid transparent',
  borderRadius: '8px',
  display: 'flex',
  height: '40px',
  justifyContent: 'space-between',
  padding: '8px',
  transition: 'background-color 0.30s ease-out'
}));

type Props = {
  className?: string;
  formField?: FormField;
  onDelete?: () => void;
  onEdit?: () => void;
  index?: number;
  draggableId?: string;
};

function DraggableFieldItem(props: Props) {
  const { className, formField, onDelete, onEdit, index, draggableId } = props;

  const popupState = usePopupState({ popupId: 'formBuilderDraggableField', variant: 'popover' });

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <StyledWrapper
          className={clsx({ [className]: true, isDragging: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex align-items-center gap-8">
            <div {...provided.dragHandleProps}>
              <DragAffordanceIcon className="opacity-8 slide-in cursor-pointer" />
            </div>
            <CatTypography className="flex align-items-center opacity-6" variant="body1">
              {formField.title}
            </CatTypography>
          </div>
          <CatIconButton {...bindTrigger(popupState)}>
            <EllipsisIcon
              className="opacity-8 cursor-pointer"
              color="darkGrey"
              contained
              containerClassName="fade-in"
              hoverable
            />
          </CatIconButton>
          <CatMenu {...bindMenu(popupState)} addEmptyFirstItem width="300px">
            <CatMenuItem onClick={onEdit}>
              <EditIcon color="blue" fontSize="small" hoverable={false} />
              <CatTypography variant="body2">
                <Trans i18nKey="categories.forms.form_builder.fields.edit_field" t={t} />
              </CatTypography>
            </CatMenuItem>
            <CatMenuDivider />
            <CatMenuItem onClick={onDelete}>
              <TrashIcon color="red" fontSize="small" hoverable={false} />
              <CatTypography variant="body2">
                <Trans i18nKey="categories.forms.form_builder.fields.delete_field" t={t} />
              </CatTypography>
            </CatMenuItem>
          </CatMenu>
        </StyledWrapper>
      )}
    </Draggable>
  );
}

export default DraggableFieldItem;
