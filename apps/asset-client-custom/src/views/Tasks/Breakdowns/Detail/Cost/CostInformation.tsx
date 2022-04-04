import { BreakdownCost } from 'store/slices/breakdown/common/types';
import {
  CatAreaButton,
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatTypography
} from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { useState } from 'react';
import AddOrEditCostDialog from './AddOrEditCostDialog';
import ContractWarning from './ContractWarning';
import CostCard from './CostCard';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import clsx from 'clsx';
import styles from '../Detail.module.scss';

type Props = {
  breakdownId: string;
  breakdownCosts: BreakdownCost[];
  hasContract: boolean;
};

function CostInformation({ breakdownId, breakdownCosts, hasContract }: Props) {
  const { t } = useTranslation();
  const [warningOpen, toggleWarning] = useState(false);
  const [costDialogOpen, setCostDialogOpen] = useState(false);

  const handleToggleWarning = (open: boolean) => {
    toggleWarning(open);
  };

  const handleAddCost = () => {
    if (hasContract) {
      handleToggleWarning(true);
    } else {
      handleWarningContinue();
    }
  };

  const handleClose = () => {
    setCostDialogOpen(false);
  };

  const handleWarningContinue = () => {
    toggleWarning(false);
    setCostDialogOpen(true);
  };
  return (
    <>
      <CatPanel className={styles.panel_wrapper}>
        <CatPanelHeader title={t('tasks.detail.cost.cost_title')} />
        <CatPanelContent className="grid gap-24">
          <div className={clsx('grid align-items-center', styles.cost_info_content)}>
            {breakdownCosts?.map((breakdownCost) => (
              <CostCard
                breakdownCost={breakdownCost}
                breakdownId={breakdownId}
                key={breakdownCost.id}
              />
            ))}
            <CatAreaButton onClick={() => handleAddCost()} sx={{ minHeight: '112px' }}>
              <CatTypography color="inherit">{t('tasks.detail.cost.add_cost')}</CatTypography>
            </CatAreaButton>
          </div>
          <div className="flex align-items-center">
            <InfoCautionIcon className="mr8" color="darkGrey" hoverable={false} />
            <CatTypography className="opacity-8" variant="body2">
              <Trans i18nKey="tasks.detail.cost.cost_dialog_warning_text" t={t} />
            </CatTypography>
          </div>
        </CatPanelContent>
      </CatPanel>
      {hasContract && warningOpen && (
        <ContractWarning
          onContinue={handleWarningContinue}
          onToggle={handleToggleWarning}
          open={warningOpen}
        />
      )}
      <AddOrEditCostDialog breakdownId={breakdownId} onClose={handleClose} open={costDialogOpen} />
    </>
  );
}

export default CostInformation;
