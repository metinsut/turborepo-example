import { CatAreaButton } from 'catamaran/core';
import { startContractFlow } from 'store/slices/contractplans/wizard/slice';
import { useTranslation } from 'react-i18next';
import ContractPlanWizard from 'views/Contracts/ContractWizard/ContractPlanWizard';
import React from 'react';
import useLoading from 'hooks/useLoading';

type Props = {
  className?: string;
};

function ContractAddButton(props: Props) {
  const { t } = useTranslation();
  const [loading, dispatchWithLoading] = useLoading();

  const { className } = props;

  const [contractWizardOpen, setContractWizardOpen] = React.useState(false);

  const handleOpen = async () => {
    await dispatchWithLoading(startContractFlow());
    setContractWizardOpen(true);
  };

  const handleClose = () => {
    setContractWizardOpen(false);
  };

  return (
    <>
      <ContractPlanWizard onClose={handleClose} open={contractWizardOpen} />
      <CatAreaButton className={className} loading={loading} onClick={handleOpen}>
        {t('assets.protection.contract_add')}
      </CatAreaButton>
    </>
  );
}

export default ContractAddButton;
