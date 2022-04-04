import { CatAreaButton } from 'catamaran/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FormField, SectionTypes } from 'store/slices/assetConfiguration/forms/types';
import { orderFormFields } from 'store/slices/assetConfiguration/forms/actions';
import { styled } from 'catamaran/core/mui';
import { t } from 'i18next';
import { useDialogState, useTypedDispatch } from 'hooks';
import AddEditFieldModal from './AddEditFieldModal';
import DeleteFieldModal from './DeleteFieldModal';
import DraggableFieldItem from './DraggableFieldItem';
import React, { useEffect, useState } from 'react';

const FieldsWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  paddingBottom: '32px',
  paddingTop: '8px'
});

type Props = {
  formFields: FormField[];
  formId: string;
  remainingFieldNumber: number;
  sectionType: SectionTypes;
  staticFormFields?: React.ReactNode;
};

function EditableFormSection(props: Props) {
  const { formFields, formId, remainingFieldNumber, sectionType, staticFormFields } = props;

  const [selectedSectionField, setSelectedSectionField] = useState<FormField>(null);

  const { isOpen: addEditOpen, togglePopup: toggleAddEditOpen } = useDialogState();
  const { isOpen: deleteOpen, togglePopup: toggleDeleteOpen } = useDialogState();

  const dispatch = useTypedDispatch();

  const toggleAddEditModal = (formField?: FormField) => {
    setSelectedSectionField(formField);
    toggleAddEditOpen(true);
  };

  const handleAddEditDialogClose = () => {
    toggleAddEditOpen(false);
  };

  const handleDelete = async (field: FormField) => {
    setSelectedSectionField(field);
    toggleDeleteOpen();
  };

  const handleDeleteDialogClose = () => {
    toggleDeleteOpen(false);
  };

  const reorder = (list: FormField[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const [orderedFields, setOrderedFields] = useState(formFields);

  useEffect(() => {
    setOrderedFields(formFields);
  }, [formFields]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const fields = reorder(orderedFields, result.source.index, result.destination.index);
    setOrderedFields(fields);
    dispatch(orderFormFields(formId, sectionType, fields));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable direction="horizontal" droppableId="list">
          {(provided) => (
            <FieldsWrapper ref={provided.innerRef} {...provided.droppableProps}>
              {staticFormFields}
              {orderedFields.map((field, index) => (
                <DraggableFieldItem
                  className="mr16"
                  draggableId={field.id}
                  formField={field}
                  index={index}
                  key={field.id}
                  onDelete={() => handleDelete(field)}
                  onEdit={() => toggleAddEditModal(field)}
                />
              ))}
              {provided.placeholder}
              <CatAreaButton
                disabled={!(remainingFieldNumber > 0)}
                onClick={() => toggleAddEditModal()}
              >
                {t('categories.forms.form_builder.create_a_new_field')}
              </CatAreaButton>
            </FieldsWrapper>
          )}
        </Droppable>
      </DragDropContext>
      <AddEditFieldModal
        field={sectionType}
        formId={formId}
        onClose={handleAddEditDialogClose}
        open={addEditOpen}
        sectionField={selectedSectionField}
      />
      <DeleteFieldModal
        fieldId={selectedSectionField?.id}
        formId={formId}
        onClose={handleDeleteDialogClose}
        open={deleteOpen}
      />
    </>
  );
}

export default EditableFormSection;
