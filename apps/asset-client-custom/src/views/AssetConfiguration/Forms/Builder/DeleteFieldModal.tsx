import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { deleteFormField } from 'store/slices/assetConfiguration/forms/actions';
import { useLoading, withDialogWrapper } from 'hooks';
import { useTranslation } from 'react-i18next';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  formId: string;
  onClose: () => void;
  open: boolean;
  fieldId?: string;
};

const DeleteFieldModal = (props: Props) => {
  const { formId, onClose, open, fieldId } = props;
  const { t } = useTranslation();
  const [deleteFormFieldLoading, deleteFormFieldDispatch] = useLoading();

  const handleDeleteField = async () => {
    await deleteFormFieldDispatch(deleteFormField(formId, fieldId));
    onClose();
  };

  return (
    <CatDialog onAction={handleDeleteField} onClose={onClose} open={open}>
      <CatDialogTitle
        iconComponent={TrashIcon}
        title={t('categories.forms.form_builder.delete_modal.title')}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          {t('categories.forms.form_builder.delete_modal.description')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton
          component={DeleteButton}
          loading={deleteFormFieldLoading}
          variant="action"
        />
      </CatDialogAction>
    </CatDialog>
  );
};

export default withDialogWrapper(DeleteFieldModal);
