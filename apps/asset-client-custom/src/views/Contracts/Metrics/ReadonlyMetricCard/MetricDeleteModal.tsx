import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { useTranslation } from 'react-i18next';
import { withDialogWrapper } from 'hooks';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  open: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
};

const MetricDeleteDialog = (props: Props) => {
  const { onCancel, onDelete, open } = props;
  const { t } = useTranslation();
  const handleAction = async () => {
    onDelete();
  };
  return (
    <CatDialog onAction={handleAction} onClose={onCancel} open={open}>
      <CatDialogTitle
        iconComponent={TrashIcon}
        title={t('contracts.edit.metrics.delete_warning_title')}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          {t('contracts.edit.metrics.delete_warning_question')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
};

export default withDialogWrapper(MetricDeleteDialog);
