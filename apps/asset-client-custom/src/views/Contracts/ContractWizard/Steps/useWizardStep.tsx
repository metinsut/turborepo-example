import { WizardSteps, selectActiveStep } from 'store/slices/contractplans/wizard/slice';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ContractAddNew from './Contract/AddNew';
import ContractAddNewOrSelect from './Contract/AddNewOrSelect';
import ContractBranch from './Contract/Branch';
import ContractExistingWarning from './Contract/ExistingWarning';
import ContractFinished from './Contract/Finished';
import ContractMainCategory from './Contract/MainCategory';
import ContractStart from './Contract/Start';
import ContractSuccess from './Contract/Success';
import ContractType from './Contract/ContractType';
import PlanAddNew from './Plan/AddNew';
import PlanAddNewOrSelect from './Plan/AddNewOrSelect';
import PlanBranch from './Plan/Branch';
import PlanContractAssociation from './Plan/PlanContractAssociation';
import PlanExistingWarning from './Plan/ExistingWarning';
import PlanMainCategory from './Plan/MainCategory';
import PlanStart from './Plan/Start';
import PlanSuccess from './Plan/Success';
import PlanType from './Plan/PlanType';
import React from 'react';

const mapping: Partial<Record<WizardSteps, React.VFC>> = {
  contractAddNew: ContractAddNew,
  contractAddNewOrSelect: ContractAddNewOrSelect,
  contractBranch: ContractBranch,
  contractExistsWarning: ContractExistingWarning,
  contractFinished: ContractFinished,
  contractMainCategory: ContractMainCategory,
  contractStart: ContractStart,
  contractSuccess: ContractSuccess,
  contractType: ContractType,
  planAddNew: PlanAddNew,
  planAddNewOrSelect: PlanAddNewOrSelect,
  planBranch: PlanBranch,
  planContractAssociation: PlanContractAssociation,
  planExistsWarning: PlanExistingWarning,
  planMainCategory: PlanMainCategory,
  planStart: PlanStart,
  planSuccess: PlanSuccess,
  planType: PlanType
};

export function useWizardStep(): React.VFC {
  const activeStep = useTypedSelector(selectActiveStep);

  return mapping[activeStep];
}
