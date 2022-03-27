import { CatAreaButton } from 'catamaran/core';
import { startPlanFlow } from 'store/slices/contractplans/wizard/slice';
import { useTranslation } from 'react-i18next';
import ContractPlanWizard from 'views/Contracts/ContractWizard/ContractPlanWizard';
import React from 'react';
import useLoading from 'hooks/useLoading';

type Props = {
  className?: string;
};

function PlanAddButton(props: Props) {
  const { t } = useTranslation();
  const [loading, dispatchWithLoading] = useLoading();

  const { className } = props;

  const [contractPlanWizardOpen, setContractPlanWizardOpen] = React.useState(false);

  const handleOpen = async () => {
    await dispatchWithLoading(startPlanFlow());
    setContractPlanWizardOpen(true);
  };

  const handleClose = () => {
    setContractPlanWizardOpen(false);
  };

  return (
    <>
      <ContractPlanWizard onClose={handleClose} open={contractPlanWizardOpen} />
      <CatAreaButton className={className} loading={loading} onClick={handleOpen}>
        {t('assets.protection.plan_add')}
      </CatAreaButton>
    </>
  );
}

export default PlanAddButton;
