import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { CatTrans } from 'components/CatTrans';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import {
  Substatus,
  addBreakdownSubstatus,
  deleteBreakdownSubstatus,
  updateBreakdownSubstatus
} from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import { Trans, useTranslation } from 'react-i18next';
import { useDialogState, useFormState, useTypedDispatch } from 'hooks';
import InputItem from 'components/InputItem/InputItem';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import breakdownSubstatusValidator from 'helpers/validations/TaskConfiguration/BreakdownSubstatusValidator';

type Props = {
  mainCategoryId: string;
  onAddCompleted?: () => void;
  substatus: Substatus;
  statusId: string;
};

function SubstatusItem({ mainCategoryId, onAddCompleted, substatus, statusId }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const newItem = !substatus.id;
  const formHelper = useFormState<Substatus>(
    () => substatus ?? { name: '' },
    breakdownSubstatusValidator
  );

  const handleConfirm = async (substatus: Substatus) => {
    let finalItem = substatus;
    if (newItem) {
      finalItem = await dispatch(addBreakdownSubstatus(mainCategoryId, statusId, substatus));
      onAddCompleted();
    } else {
      finalItem = await dispatch(updateBreakdownSubstatus(mainCategoryId, substatus));
    }

    return finalItem;
  };

  const { isOpen, togglePopup } = useDialogState();

  const handleClose = () => {
    if (newItem) {
      onAddCompleted();
    }
  };

  const handleDeleteConfirmed = async () => {
    await dispatch(deleteBreakdownSubstatus(mainCategoryId, substatus.id));
  };

  return (
    <>
      <InputItem
        addMode={newItem}
        checkable={false}
        defaultFocused={newItem}
        defaultReadonly={!newItem}
        deletable
        editable
        formHelper={formHelper}
        formKey="name"
        inlineEditable
        label={t('task_configuration.breakdown.substatuses.title')}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onDelete={() => togglePopup(true)}
      />
      {isOpen && (
        <CatDialog
          onAction={handleDeleteConfirmed}
          onClose={() => togglePopup(false)}
          open={isOpen}
        >
          <CatDialogTitle
            iconComponent={TrashIcon}
            title={
              <Trans
                i18nKey="task_configuration.breakdown.substatuses.delete_dialog_header"
                t={t}
              />
            }
          />
          <CatDialogContent>
            <CatTypography variant="body1">
              <CatTrans
                i18nKey="task_configuration.breakdown.substatuses.delete_dialog_desc"
                t={t}
                values={{
                  title: substatus.name
                }}
              />
            </CatTypography>
          </CatDialogContent>
          <CatDialogAction>
            <CatDialogButton component={GoBackButton} variant="close" />
            <CatDialogButton component={DeleteButton} variant="action" />
          </CatDialogAction>
        </CatDialog>
      )}
    </>
  );
}

export default SubstatusItem;
