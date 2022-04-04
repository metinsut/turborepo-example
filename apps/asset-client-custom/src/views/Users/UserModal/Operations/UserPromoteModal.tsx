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
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import CheckIcon from 'catamaran/icons/Check';
import WthPersonAdminIcon from 'catamaran/icons/WthPersonAdmin';
import inputValidator from 'helpers/validations/InputValidator';

type Props = {
  className?: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

function UserPromoteModal(props: Props) {
  const { className, onClose, open, onConfirm } = props;

  const { t } = useTranslation();

  const promoteKey = t('users.modal.promote.promote_key');
  const formHelper = useFormState({ value: '' }, inputValidator(promoteKey));

  const handlePromote = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <CatDialog className={className} onAction={handlePromote} onClose={onClose} open={open}>
      <CatDialogTitle
        iconComponent={WthPersonAdminIcon}
        title={<Trans i18nKey="users.modal.promote.header" t={t} />}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          <Trans i18nKey="users.modal.promote.description" t={t} />
        </CatTypography>
        <Box mt={4}>
          <CatTypography variant="body1">
            <Trans i18nKey="users.modal.promote.type_promote_description" t={t} />
          </CatTypography>
        </Box>
        <Box mt={1}>
          <CatamaranTextField
            formHelper={formHelper}
            isRequired
            label={t('users.modal.promote.type_promote')}
            mode="editOnly"
            name="value"
          />
        </Box>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton
          color="green"
          disabled={!formHelper.formState.isValid}
          endIcon={<CheckIcon />}
          size="large"
          variant="action"
        >
          {t('common.promote')}
        </CatDialogButton>
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(UserPromoteModal);
