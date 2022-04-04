import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { GoBackButton, UnLinkButton } from 'catamaran/core/Button';
import { useTranslation } from 'react-i18next';
import UnlinkIcon from 'catamaran/icons/Unlink';
import useLoading from 'hooks/useLoading';

type Props = {
  open?: boolean;
  onCancel?: () => void;
  onDisassociate?: () => Promise<void>;
};

function PlanDisassociateDialog(props: Props) {
  const { open, onCancel, onDisassociate } = props;

  const { t } = useTranslation();
  const [disassociateLoading, disassociateLoadingDispatch] = useLoading();

  const handleDisassociate = async () => {
    disassociateLoadingDispatch(onDisassociate);
  };

  return (
    <CatDialog onAction={handleDisassociate} onClose={onCancel} open={open}>
      <CatDialogTitle iconComponent={UnlinkIcon} title={t('plans.disassociate_title')} />
      <CatDialogContent>
        <Box alignItems="space-between" flex flexDirection="column" my={3} px={4}>
          <CatTypography style={{ marginBottom: '24px' }} variant="body1">
            {t('plans.disassociate_description')}
          </CatTypography>
          <CatTypography style={{ marginBottom: '24px' }} variant="body1">
            {t('plans.disassociate_warning')}
          </CatTypography>
        </Box>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={UnLinkButton} loading={disassociateLoading} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default PlanDisassociateDialog;
