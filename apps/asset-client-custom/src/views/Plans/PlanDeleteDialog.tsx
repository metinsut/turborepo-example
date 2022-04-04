import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { PlanAssociatedInformation } from 'store/slices/plans/types';
import { useTranslation } from 'react-i18next';
import InformationChip from 'components/InformationChip';
import TrashIcon from 'catamaran/icons/Trash';
import UnlinkIcon from 'catamaran/icons/Unlink';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props = {
  associatedInformation?: PlanAssociatedInformation;
  branchCount?: number;
  open?: boolean;
  onCancel?: () => void;
  onDelete?: () => Promise<void>;
};

function PlanDeleteDialog(props: Props) {
  const { associatedInformation, branchCount, open, onCancel, onDelete } = props;

  const { t } = useTranslation();
  const [deleteLoading, deleteLoadingDispatch] = useLoadingWithoutDispatch();

  const handleDelete = async () => {
    deleteLoadingDispatch(onDelete());
  };

  return (
    <CatDialog onAction={handleDelete} onClose={onCancel} open={open}>
      <CatDialogTitle iconComponent={TrashIcon} title={t('plans.delete_warning_title')} />
      <CatDialogContent>
        <Box alignItems="space-between" flex flexDirection="column" my={3} px={4}>
          <CatTypography style={{ marginBottom: '24px' }} variant="body1">
            {t(
              associatedInformation?.assetCount
                ? 'plans.delete_warning_with_associated_information'
                : 'plans.delete_warning_with_associated_information_none'
            )}
          </CatTypography>
          {!!associatedInformation?.assetCount && (
            <CatTypography style={{ marginBottom: '24px' }} variant="body1">
              {t('plans.delete_warning_description')}
            </CatTypography>
          )}
          {branchCount && (
            <CatTypography style={{ marginBottom: '24px' }} variant="body1">
              <b>{t('plans.delete_warning_branch_count', { branchCount })}</b>
            </CatTypography>
          )}
          <CatTypography variant="body1">{t('plans.delete_warning_question')}</CatTypography>
          {!!associatedInformation?.assetCount && (
            <Box center flex mt={3} px={4}>
              <InformationChip
                description={t('common.associated_assets')}
                icon={<UnlinkIcon alwaysHovered color="red" fontSize="small" />}
                value={associatedInformation.assetCount}
              />
            </Box>
          )}
        </Box>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} loading={deleteLoading} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default PlanDeleteDialog;
