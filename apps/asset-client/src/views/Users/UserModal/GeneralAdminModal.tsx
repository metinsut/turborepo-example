import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { GoBackButton, NextButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import GeneralAdminIcon from 'catamaran/icons/GeneralAdmin';
import PlusIcon from 'catamaran/icons/Plus';
import WarningIcon from 'catamaran/icons/Warning';
import WthPersonAdminIcon from 'catamaran/icons/WthPersonAdmin';

type Props = {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => Promise<void>;
};

function GeneralAdminModal(props: Props) {
  const { onClose, open, onConfirm } = props;

  const { t } = useTranslation();

  return (
    <CatDialog onAction={onConfirm} onClose={onClose} open={open}>
      <CatDialogTitle
        closable
        iconComponent={WthPersonAdminIcon}
        title={t('users.general_admin.modal_header')}
      />
      <CatDialogContent>
        <Box flex mb={3}>
          <PlusIcon color="darkGrey" contained={false} hoverable={false} />
          <Box ml={1}>
            <GeneralAdminIcon />
          </Box>
          <Box ml={1}>
            <WarningIcon color="darkGrey" contained={false} hoverable={false} />
          </Box>
        </Box>
        <CatTypography variant="body1">
          <Trans
            components={{ bold: <b /> }}
            i18nKey="users.general_admin.modal_description_add"
            t={t}
          />
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={NextButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default GeneralAdminModal;
