import { CatDialogTitle, CatIconButton } from 'catamaran/core';
import { DisplayType } from 'utils';
import { useDialogState } from 'hooks';
import { useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import DepartmentDeleteDialog from './DepartmentDeleteDialog';
import EditIcon from 'catamaran/icons/Edit';
import PlusIcon from 'catamaran/icons/Plus';
import TrashIcon from 'catamaran/icons/Trash';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props = {
  cancelDisabled?: boolean;
  closeDisabled?: boolean;
  confirmDisabled?: boolean;
  deleteDisabled?: boolean;
  isDepartmentChanged?: boolean;
  mode: DisplayType;
  onClose?: (() => Promise<void>) | (() => void);
  onConfirm?: () => Promise<void>;
  onDelete?: () => Promise<void>;
};

function DepartmentPageHeader(props: Props) {
  const {
    cancelDisabled,
    closeDisabled,
    confirmDisabled,
    deleteDisabled,
    isDepartmentChanged,
    mode,
    onClose,
    onConfirm,
    onDelete
  } = props;

  const { t } = useTranslation();
  const [confirmLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<any>();

  const commonLoading = confirmLoading;

  const { isOpen: deletePopupOpen, togglePopup: toggleDeletePopup } = useDialogState();

  const handleConfirm = async () => {
    await asyncConfirmLoading(onConfirm());
  };

  const deleteVisible = mode === 'edit';
  const confirmVisible = mode === 'add' || isDepartmentChanged;
  const cancelVisible = mode === 'add';
  const closeVisible = mode === 'edit' && !isDepartmentChanged;

  const iconComponent = () =>
    mode === 'edit' ? (
      <EditIcon contained={false} hoverable={false} />
    ) : (
      <PlusIcon contained={false} hoverable={false} />
    );

  const dialogTitle =
    mode === 'edit'
      ? t('users.departments.edit.edit_header')
      : t('users.departments.edit.create_header');

  const actionArea = () => (
    <>
      {deleteVisible && (
        <CatIconButton
          disabled={deleteDisabled || commonLoading}
          onClick={() => toggleDeletePopup(true)}
        >
          <TrashIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      )}
      {cancelVisible && (
        <CatIconButton disabled={cancelDisabled || commonLoading} onClick={onClose}>
          <CancelIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      )}
      {closeVisible && (
        <CatIconButton disabled={closeDisabled || commonLoading} onClick={onClose}>
          <CancelIcon color="darkGrey" contained fontSize="medium" />
        </CatIconButton>
      )}
      {confirmVisible && (
        <CatIconButton
          disabled={confirmDisabled || commonLoading}
          loading={confirmLoading}
          onClick={handleConfirm}
        >
          <CheckIcon color="green" contained fontSize="medium" />
        </CatIconButton>
      )}
    </>
  );

  return (
    <>
      <CatDialogTitle actionArea={actionArea()} iconComponent={iconComponent} title={dialogTitle} />
      <DepartmentDeleteDialog
        onClose={() => toggleDeletePopup(false)}
        onDelete={onDelete}
        open={deletePopupOpen}
      />
    </>
  );
}

export default DepartmentPageHeader;
