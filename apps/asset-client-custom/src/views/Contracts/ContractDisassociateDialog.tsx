import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle
} from 'catamaran/core';
import { DialogProps, Divider, Typography } from 'catamaran/core/mui';
import { GoBackButton, UnLinkButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { selectAssociatedPlansInAssetByContractId } from 'store/slices/plans/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ExistingContractCard from 'views/Assets/AssetDetail/ContractProtectionDefinition/Contract/ExistingContractCard';
import ExistingPlanCard from 'views/Assets/AssetDetail/ContractProtectionDefinition/Plan/ExistingPlanCard';
import UnlinkIcon from 'catamaran/icons/Unlink';
import useLoading from 'hooks/useLoading';

type Props = DialogProps & {
  contractId: string;
  onCancel?: () => void;
  onDisassociate?: () => Promise<void>;
  open?: boolean;
};

function ContractDisassociateDialog(props: Props) {
  const { contractId, onCancel, onDisassociate, open } = props;
  const { t } = useTranslation();

  const [disassociateLoading, disassociateLoadingDispatch] = useLoading();

  const plans = useTypedSelector((state) =>
    selectAssociatedPlansInAssetByContractId(state, contractId)
  );

  const hasPlan = plans.length > 0;

  const handleDisassociate = async () => {
    disassociateLoadingDispatch(onDisassociate);
  };

  const titleContent = (
    <Trans
      components={{
        hide: <span hidden={!hasPlan} />
      }}
      i18nKey="contracts.disassociate_title"
      t={t}
    />
  );

  return (
    <CatDialog onAction={handleDisassociate} onClose={onCancel} open={open}>
      <CatDialogTitle closable iconComponent={UnlinkIcon} title={titleContent} />
      <CatDialogContent>
        <Box alignItems="space-between" flex flexDirection="column" my={3} px={4}>
          <Typography style={{ marginBottom: '24px' }} variant="body1">
            <Trans
              components={{
                hide: <span hidden={!hasPlan} />
              }}
              i18nKey="contracts.disassociate_description"
              t={t}
            />
          </Typography>
          <Typography style={{ marginBottom: '24px' }} variant="body1">
            {t('contracts.disassociate_warning')}
          </Typography>
          {hasPlan && (
            <>
              <ExistingContractCard contractId={contractId} />
              <Divider style={{ margin: '16px 0' }} />
              {plans.map((plan) => (
                <ExistingPlanCard key={plan.id} planId={plan.id} style={{ marginBottom: '16px' }} />
              ))}
            </>
          )}
        </Box>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={UnLinkButton} loading={disassociateLoading} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default ContractDisassociateDialog;
