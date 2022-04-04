import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { ContinueButton, GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import CostIcon from 'catamaran/icons/Cost';
import React from 'react';

type Props = {
  onToggle: (open: boolean) => void;
  onContinue: () => void;
  open: boolean;
};

function ContractWarning({ onToggle, onContinue, open }: Props) {
  const { t } = useTranslation();

  const handleContinue = async () => onContinue();
  return (
    <CatDialog onAction={handleContinue} onClose={() => onToggle(false)} open={open}>
      <CatDialogTitle iconComponent={CostIcon} title={t('tasks.detail.cost.cost_warning')} />
      <CatDialogContent>
        <CatTypography className="mb16" variant="body1">
          <Trans i18nKey="tasks.detail.cost.contract_warning_info" t={t} />
        </CatTypography>
        <CatTypography variant="body1">
          {t('tasks.detail.cost.contract_warning_detail')}
        </CatTypography>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={ContinueButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default ContractWarning;
