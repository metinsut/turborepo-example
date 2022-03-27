import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { ContractAssociatedInformation } from 'store/slices/contracts/types';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { DialogProps, Typography } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import InformationChip from 'components/InformationChip';
import TrashIcon from 'catamaran/icons/Trash';
import UnlinkIcon from 'catamaran/icons/Unlink';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props = DialogProps & {
  associatedInformation?: ContractAssociatedInformation;
  branchCount?: number;
  onCancel?: () => void;
  onDelete?: () => Promise<void>;
  open?: boolean;
};

function ContractDeleteDialog(props: Props) {
  const { associatedInformation, branchCount, open, onCancel, onDelete } = props;

  const { t } = useTranslation();
  const [deleteLoading, deleteLoadingDispatch] = useLoadingWithoutDispatch();

  let associatedInformationText = t('contracts.delete_warning_with_associated_information_none');
  let associatedInformationDescription = '';

  if (associatedInformation) {
    if (associatedInformation.assetCount > 0 && associatedInformation.planCount > 0) {
      associatedInformationText = t('contracts.delete_warning_with_associated_information_both');
      associatedInformationDescription = t('contracts.delete_warning_description_both');
    } else if (associatedInformation.assetCount > 0) {
      associatedInformationText = t(
        'contracts.delete_warning_with_associated_information_only_assets'
      );
      associatedInformationDescription = t('contracts.delete_warning_description_only_assets');
    } else if (associatedInformation.planCount > 0) {
      associatedInformationText = t(
        'contracts.delete_warning_with_associated_information_only_plans'
      );
      associatedInformationDescription = t('contracts.delete_warning_description_only_plans');
    }
  }

  const handleDelete = async () => {
    deleteLoadingDispatch(onDelete());
  };

  return (
    <CatDialog onAction={handleDelete} onClose={onCancel} open={open}>
      <CatDialogTitle iconComponent={TrashIcon} title={t('contracts.delete_warning_title')} />
      <CatDialogContent>
        <Box alignItems="space-between" flex flexDirection="column" my={3} px={4}>
          {associatedInformationText && (
            <CatTypography style={{ marginBottom: '24px' }} variant="body1">
              {associatedInformationText}
            </CatTypography>
          )}
          {associatedInformationDescription && (
            <CatTypography style={{ marginBottom: '24px' }} variant="body1">
              {associatedInformationDescription}
            </CatTypography>
          )}
          {branchCount && (
            <CatTypography style={{ marginBottom: '24px' }} variant="body1">
              <b>{t('contracts.delete_warning_branch_count', { branchCount })}</b>
            </CatTypography>
          )}
          <Typography variant="body1">{t('contracts.delete_warning_question')}</Typography>
          <Box center flex mt={3}>
            {!!associatedInformation?.assetCount && (
              <Box px={4}>
                <InformationChip
                  description={t('common.associated_assets')}
                  icon={<UnlinkIcon alwaysHovered color="red" fontSize="small" />}
                  value={associatedInformation.assetCount}
                />
              </Box>
            )}
            {!!associatedInformation?.planCount && (
              <Box px={4}>
                <InformationChip
                  description={t('common.linked_plans')}
                  icon={<TrashIcon alwaysHovered color="red" fontSize="small" />}
                  value={associatedInformation.planCount}
                />
              </Box>
            )}
          </Box>
        </Box>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} loading={deleteLoading} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default ContractDeleteDialog;
