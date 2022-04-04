import {
  BreakdownType,
  addBreakdownType,
  deleteBreakdownType,
  selectBreakdownTypeById,
  updateBreakdownType
} from 'store/slices/taskConfiguration/breakdown/breakdownTypes';
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
import { Trans, useTranslation } from 'react-i18next';
import { useDialogState, useFormState, useTypedDispatch, useTypedSelector } from 'hooks';
import InputItem from 'components/InputItem/InputItem';
import TrashIcon from 'catamaran/icons/Trash';
import breakdownTypeValidator from 'helpers/validations/TaskConfiguration/BreakdownTypeValidator';

type Props = {
  id: string;
  mainCategoryId: string;
  onAddCompleted?: () => void;
};

function TypeItem({ id, mainCategoryId, onAddCompleted }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const breakdownType = useTypedSelector((state) => selectBreakdownTypeById(state, id));

  const newItem = !id;
  const formHelper = useFormState<BreakdownType>(
    () => breakdownType ?? { name: '' },
    breakdownTypeValidator
  );

  const handleConfirm = async (breakdownType: BreakdownType) => {
    let finalItem = breakdownType;
    if (newItem) {
      finalItem = await dispatch(addBreakdownType(mainCategoryId, breakdownType));
      onAddCompleted();
    } else {
      finalItem = await dispatch(updateBreakdownType(mainCategoryId, breakdownType));
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
    await dispatch(deleteBreakdownType(mainCategoryId, breakdownType.id));
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
        label={t('task_configuration.breakdown.type.title')}
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
            title={<Trans i18nKey="task_configuration.breakdown.type.delete_dialog_header" t={t} />}
          />
          <CatDialogContent>
            <CatTypography variant="body1">
              <CatTrans
                i18nKey="task_configuration.breakdown.type.delete_dialog_desc"
                t={t}
                values={{
                  title: breakdownType.name
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

export default TypeItem;
