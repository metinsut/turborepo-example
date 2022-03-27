import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { useFormState, withDialogWrapper } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import PersonIcon from 'catamaran/icons/Person';
import inputValidator from 'helpers/validations/InputValidator';

type Props = {
  className?: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

function UserDemoteModal(props: Props) {
  const { className, onClose, open, onConfirm } = props;

  const { t } = useTranslation();

  const demoteKey = t('users.modal.demote.demote_key');
  const formHelper = useFormState({ value: '' }, inputValidator(demoteKey));

  const handleDemote = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <CatDialog className={className} onAction={handleDemote} onClose={onClose} open={open}>
      <CatDialogTitle
        iconComponent={PersonIcon}
        title={<Trans i18nKey="users.modal.demote.header" t={t} />}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          <Trans i18nKey="users.modal.demote.description" t={t} />
        </CatTypography>
        <Box mt={4}>
          <CatTypography variant="body1">
            <Trans i18nKey="users.modal.demote.type_demote_description" t={t} />
          </CatTypography>
        </Box>
        <Box mt={1}>
          <CatamaranTextField
            formHelper={formHelper}
            isRequired
            label={t('users.modal.demote.type_demote')}
            mode="editOnly"
            name="value"
          />
        </Box>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton
          color="red"
          disabled={!formHelper.formState.isValid}
          endIcon={<CancelIcon />}
          size="large"
          variant="action"
        >
          {t('common.demote')}
        </CatDialogButton>
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(UserDemoteModal);
