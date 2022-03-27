import { AppThunk, RootState } from 'RootTypes';
import { Contract, ContractType } from 'store/slices/contracts/types';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Plan, PlanContractAssociation, PlanType } from 'store/slices/plans/types';
import {
  addDisabledBranchIds as addContractDisabledBranchIds,
  setInitialContractForm,
  upsertContracts
} from 'store/slices/contracts/slice';
import {
  addDisabledBranchIds as addPlanDisabledBranchIds,
  setInitialPlanForm,
  upsertPlans
} from 'store/slices/plans/slice';
import { apiCaller } from 'store/common';
import { getAssetContracts, getAssetPlans } from 'store/slices/asset/detail/actions';
import { selectAllBranches } from 'store/slices/branches';
import { selectAllMainCategories } from 'store/slices/session';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { selectContractById } from 'store/slices/contracts/selectors';
import { showUpdateSuccessSnackbar } from 'store/slices/application';
import axios from 'utils/axiosUtils';

export type WizardSteps =
  | 'contractStart'
  | 'contractBranch'
  | 'contractMainCategory'
  | 'contractType'
  | 'contractExistsWarning'
  | 'contractAddNewOrSelect'
  | 'contractAddNew'
  | 'contractFinished'
  | 'contractSuccess'
  | 'planStart'
  | 'planBranch'
  | 'planMainCategory'
  | 'planType'
  | 'planExistsWarning'
  | 'planContractAssociation'
  | 'planAddNew'
  | 'planAddNewOrSelect'
  | 'planSuccess';

type StateShape = {
  activeStep?: WizardSteps;
  branch: {
    selectedIds: string[];
    disabledIds: string[];
  };
  contract: {
    existingContract: {
      contractId?: string;
      planIds: string[];
    };
    selectableContractIds: string[];
    selectedContractId?: string;
    selectedType?: ContractType;
  };
  history: WizardSteps[];
  mainCategory: {
    selectedId?: string;
  };
  plan: {
    existingPlan: {
      planId?: string;
    };
    selectedType?: PlanType;
    planContractAssociation?: PlanContractAssociation;
    selectablePlanIds: string[];
    selectedPlanId?: string;
  };
  starterFlow?: 'contract' | 'plan';
};

const initialState: StateShape = {
  branch: {
    disabledIds: [],
    selectedIds: []
  },
  contract: {
    existingContract: {
      planIds: []
    },
    selectableContractIds: []
  },
  history: [],
  mainCategory: {},
  plan: {
    existingPlan: {},
    selectablePlanIds: []
  }
};

const wizardSlice = createSlice({
  initialState,
  name: 'contractPlanWizard',
  reducers: {
    clear: (draft) => {
      draft.contract.existingContract = { ...initialState.contract.existingContract };
      draft.plan.existingPlan = { ...initialState.plan.existingPlan };
      draft.branch = { ...initialState.branch };
      draft.contract = { ...initialState.contract };
      draft.mainCategory = { ...initialState.mainCategory };
      draft.plan = { ...initialState.plan };
    },
    close: (draft) => {
      draft.history = [];
      draft.activeStep = undefined;
    },
    finish: (draft) => {
      draft.history = [];
      draft.activeStep = undefined;
    },
    goBack: (draft) => {
      if (draft.history.length > 0) {
        const previousStep = draft.history.pop();

        if (previousStep === 'contractStart' || previousStep === 'planStart') {
          draft.activeStep = undefined;
        } else if (previousStep === 'contractFinished') {
          draft.activeStep = draft.history.pop();
        } else {
          draft.activeStep = previousStep;
        }
      }
    },
    gotoStep: (draft, action: PayloadAction<WizardSteps>) => {
      const currentStep = draft.activeStep;
      const nextStep = action.payload;

      draft.history.push(currentStep);
      draft.activeStep = nextStep;
    },
    setDisabledBranchIds: (draft, action: PayloadAction<string[]>) => {
      const branchIds = action.payload;
      draft.branch.disabledIds = branchIds;
    },
    setExistingContractAndPlan: (draft, action: PayloadAction<ExistingContractAndPlans>) => {
      const { contracts, plans } = action.payload;

      draft.contract.existingContract.contractId = contracts[0].id;
      draft.contract.existingContract.planIds = plans.map((i) => i.id);
    },
    setExistingPlan: (draft, action: PayloadAction<Plan>) => {
      const plan = action.payload;

      draft.plan.existingPlan.planId = plan.id;
    },
    setSelectableContractIds: (draft, action: PayloadAction<string[]>) => {
      const contractIds = action.payload;
      draft.contract.selectableContractIds = contractIds;
      delete draft.contract.selectedContractId;
    },
    setSelectablePlanIds: (draft, action: PayloadAction<string[]>) => {
      const planIds = action.payload;
      draft.plan.selectablePlanIds = planIds;
      delete draft.plan.selectedPlanId;
    },
    setSelectedContractType: (draft, action: PayloadAction<ContractType>) => {
      draft.contract.selectedType = action.payload;
    },
    setSelectedPlanType: (draft, action: PayloadAction<PlanType>) => {
      draft.plan.selectedType = action.payload;
    },
    setStarterFlow: (draft, action: PayloadAction<'contract' | 'plan'>) => {
      const flow = action.payload;
      draft.starterFlow = flow;
      draft.activeStep = flow === 'contract' ? 'contractStart' : 'planStart';
    },
    updateContractAssociation: (draft, action: PayloadAction<PlanContractAssociation>) => {
      draft.plan.planContractAssociation = action.payload;
    },
    updateSelectedBranchIds: (draft, action: PayloadAction<string[]>) => {
      const branchIds = action.payload;
      draft.branch.selectedIds = branchIds;
    },
    updateSelectedContract: (draft, action: PayloadAction<string>) => {
      draft.contract.selectedContractId = action.payload;
    },
    updateSelectedMainCategory: (draft, action: PayloadAction<string>) => {
      const mainCategoryId = action.payload;
      draft.mainCategory.selectedId = mainCategoryId;
    },
    updateSelectedPlan: (draft, action: PayloadAction<string>) => {
      draft.plan.selectedPlanId = action.payload;
    }
  }
});

export const {
  close,
  goBack,
  setSelectedPlanType,
  setSelectedContractType,
  updateContractAssociation,
  updateSelectedBranchIds,
  updateSelectedContract,
  updateSelectedMainCategory,
  updateSelectedPlan
} = wizardSlice.actions;

const { actions } = wizardSlice;

type StepMappings = Record<
  WizardSteps,
  {
    onNext: () => AppThunk<Promise<WizardSteps>>;
  }
>;

export const startContractFlow = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const asset = selectAsset(state);

  dispatch(actions.setStarterFlow('contract'));

  if (asset.id) {
    dispatch(actions.updateSelectedBranchIds([asset.branchId]));
    dispatch(actions.setDisabledBranchIds([asset.branchId]));

    dispatch(actions.updateSelectedMainCategory(asset.mainCategoryId));
  }

  await dispatch(gotoNextStep());
};

export const startPlanFlow = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const asset = selectAsset(state);

  dispatch(actions.setStarterFlow('plan'));

  if (asset.id) {
    dispatch(actions.updateSelectedBranchIds([asset.branchId]));
    dispatch(actions.setDisabledBranchIds([asset.branchId]));

    dispatch(actions.updateSelectedMainCategory(asset.mainCategoryId));
  }

  await dispatch(gotoNextStep());
};

export const gotoNextStep = (): AppThunk => async (dispatch, getState) => {
  const step = selectActiveStep(getState());
  const stepInfo = stepMappings[step];
  const nextStep = await dispatch(stepInfo.onNext());

  dispatch(actions.gotoStep(nextStep));
};

const checkContractMainCategory =
  (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
    const state = getState();
    const asset = selectAsset(state);
    if (!asset.id) {
      const mainCategories = selectAllMainCategories(state);
      if (mainCategories.length > 1) {
        return 'contractMainCategory';
      }

      const mainCategory = mainCategories[0];
      dispatch(actions.updateSelectedMainCategory(mainCategory.id));
    }

    return undefined;
  };

const contractStartOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
  const branches = selectAllBranches(getState());
  if (branches.length > 1) {
    return 'contractBranch';
  }

  const branch = branches[0];
  dispatch(actions.updateSelectedBranchIds([branch.id]));

  const nextStep = await dispatch(checkContractMainCategory());

  return nextStep ?? 'contractType';
};

const contractBranchOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch) => {
  const nextStep = await dispatch(checkContractMainCategory());

  return nextStep ?? 'contractType';
};

const contractMainCategoryOnNext = (): AppThunk<Promise<WizardSteps>> => async () => {
  const nextStep: WizardSteps = 'contractType';
  return nextStep;
};

type ExistingContractAndPlans = {
  contracts: Contract[];
  plans: Plan[];
};

const getSelectableContracts = (): AppThunk<Promise<Contract[]>> => async (dispatch, getState) => {
  const state = getState();

  let data: Contract[] = [];
  const starterFlow = selectStarterFlow(state);

  const asset = selectAsset(state);
  const contractType = selectSelectedContractType(state);

  if (asset.id) {
    const { mainCategoryId, branchId } = asset;
    const branchIds = [branchId];

    const requestBuilder = () =>
      axios.post<Contract[]>('registration/contracts/filter', {
        branchIds,
        contractType,
        mainCategoryId
      });

    data = await dispatch(apiCaller(requestBuilder));
  } else if (starterFlow === 'plan') {
    const branchIds = selectSelectedBranchIds(state);
    const mainCategoryId = selectSelectedMainCategoryId(state);
    const requestBuilder = () =>
      axios.post<Contract[]>('registration/contracts/filter', {
        branchIds,
        contractType,
        mainCategoryId
      });

    data = await dispatch(apiCaller(requestBuilder));
  }

  dispatch(upsertContracts(data));
  dispatch(actions.setSelectableContractIds(data.map((i) => i.id)));

  return data;
};

const initializeContractPage = (): AppThunk => async (dispatch, getState) => {
  const state = getState();

  const disabledBranchIds = selectDisabledBranchIds(state);
  const branchIds = selectSelectedBranchIds(state);
  const mainCategoryId = selectSelectedMainCategoryId(state);
  const contractType = selectSelectedContractType(state);

  dispatch(addContractDisabledBranchIds(disabledBranchIds));
  dispatch(
    setInitialContractForm({
      branchIds,
      mainCategoryId,
      type: contractType
    })
  );
};

const contractTypeOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
  const state = getState();
  const assetId = selectAsset(state).id;
  const starterFlow = selectStarterFlow(state);
  const contractType = selectSelectedContractType(state);

  if (!assetId) {
    if (starterFlow === 'plan') {
      await dispatch(getSelectableContracts());
      return 'contractAddNewOrSelect';
    }

    await dispatch(initializeContractPage());
    return 'contractAddNew';
  }

  try {
    const requestBuilder = () =>
      axios.get<ExistingContractAndPlans>(
        `registration/assets/${assetId}/contract-and-plan/contract-type/${contractType}`
      );
    const data = await dispatch(apiCaller(requestBuilder, { autoHandleExceptions: [404] }));

    dispatch(upsertContracts(data.contracts));
    dispatch(upsertPlans(data.plans));

    dispatch(actions.setExistingContractAndPlan(data));

    return 'contractExistsWarning';
  } catch (error: any) {
    if (error?.response?.status !== 404) {
      throw error;
    }
  }

  await dispatch(getSelectableContracts());

  return 'contractAddNewOrSelect';
};

const contractExistsWarningOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch) => {
  await dispatch(getSelectableContracts());

  return 'contractAddNewOrSelect';
};

const associateContractWithAsset = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const selectedContractId = selectSelectedContractId(state);
  const assetId = selectAsset(state).id;

  if (assetId) {
    // If existing contract selected, don't make API call
    const assetContracts = await dispatch(getAssetContracts(assetId));
    if (assetContracts.some((i) => i.id === selectedContractId)) {
      return;
    }

    const requestBuilder = () =>
      axios.put(`registration/assets/${assetId}/associate-contract`, {
        contractId: selectedContractId
      });
    await dispatch(apiCaller(requestBuilder));
    dispatch(getAssetContracts(assetId));
    dispatch(getAssetPlans(assetId));
  }
};

const contractAddNewOrSelectOnNext =
  (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
    const state = getState();
    const selectedContractId = selectSelectedContractId(state);
    if (selectedContractId) {
      await dispatch(associateContractWithAsset());

      return 'contractFinished';
    }

    await dispatch(initializeContractPage());
    return 'contractAddNew';
  };

const contractAddNewOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch) => {
  await dispatch(associateContractWithAsset());

  return 'contractFinished';
};

const contractFinishedOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
  const state = getState();
  const starterFlow = selectStarterFlow(state);
  const assetId = selectAsset(state).id;

  if (starterFlow === 'plan') {
    const selectedContractId = selectSelectedContractId(state);
    const selectedContract = selectContractById(state, selectedContractId);

    dispatch(actions.updateSelectedBranchIds(selectedContract.branchIds));
    dispatch(actions.updateSelectedMainCategory(selectedContract.mainCategoryId));

    if (!assetId) {
      await dispatch(initializePlanPage());
      return 'planAddNew';
    }

    await dispatch(getSelectablePlans());
    return 'planAddNewOrSelect';
  }

  return 'contractSuccess';
};

// Add Plan flow
const contractSuccessOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
  const state = getState();

  const selectedContractId = selectSelectedContractId(state);
  const selectedContract = selectContractById(state, selectedContractId);

  dispatch(actions.updateSelectedBranchIds(selectedContract.branchIds));
  dispatch(actions.updateSelectedMainCategory(selectedContract.mainCategoryId));

  const asset = selectAsset(state);
  if (asset.id) {
    dispatch(actions.setDisabledBranchIds([asset.branchId]));
  }

  return 'planType';
};

const checkPlanMainCategory = (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
  const state = getState();
  const asset = selectAsset(state);
  if (!asset.id) {
    const mainCategories = selectAllMainCategories(state);
    if (mainCategories.length > 1) {
      return 'planMainCategory';
    }

    const mainCategory = mainCategories[0];
    dispatch(actions.updateSelectedMainCategory(mainCategory.id));
  }

  return undefined;
};

const planStartOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
  const branches = selectAllBranches(getState());
  if (branches.length > 1) {
    return 'planBranch';
  }

  const branch = branches[0];
  dispatch(actions.updateSelectedBranchIds([branch.id]));

  const nextStep = await dispatch(checkPlanMainCategory());

  return nextStep ?? 'planType';
};

const planBranchOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch) => {
  const nextStep = await dispatch(checkPlanMainCategory());

  return nextStep ?? 'planType';
};

const planMainCategoryOnNext = (): AppThunk<Promise<WizardSteps>> => async () => {
  const nextStep: WizardSteps = 'planType';
  return nextStep;
};

export const finish = (): AppThunk => async (dispatch) => {
  dispatch(wizardSlice.actions.finish());
  dispatch(showUpdateSuccessSnackbar(true));
};

const getSelectablePlans = (): AppThunk<Promise<Plan[]>> => async (dispatch, getState) => {
  const state = getState();

  const asset = selectAsset(state);

  if (!asset.id) {
    return [];
  }

  const planType = selectSelectedPlanType(state);
  const contractId = selectSelectedContractId(state);
  const { mainCategoryId, branchId } = asset;

  const requestBuilder = () =>
    axios.get<Plan[]>(
      `registration/plans/filter?branchId=${branchId}&mainCategoryId=${mainCategoryId}&planType=${planType}&contractId=${
        contractId ?? ''
      }`
    );
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(upsertPlans(data));
  dispatch(actions.setSelectablePlanIds(data.map((i) => i.id)));

  return data;
};

const planTypeOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
  const state = getState();
  const assetId = selectAsset(state).id;
  const planType = selectSelectedPlanType(state);
  const { starterFlow } = state.contractPlan.wizard;

  if (assetId) {
    try {
      const requestBuilder = () =>
        axios.get<Plan>(`registration/assets/${assetId}/plans/${planType}`);
      const data = await dispatch(apiCaller(requestBuilder, { autoHandleExceptions: [404] }));

      dispatch(upsertPlans([data]));
      dispatch(actions.setExistingPlan(data));

      return 'planExistsWarning';
    } catch (error: any) {
      if (error?.response?.status !== 404) {
        throw error;
      }
    }

    if (starterFlow === 'contract') {
      await dispatch(getSelectablePlans());
      return 'planAddNewOrSelect';
    }
  } else if (starterFlow === 'contract') {
    await dispatch(initializePlanPage());
    return 'planAddNew';
  }

  return 'planContractAssociation';
};

const planExistsWarningOnNext =
  (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
    const { starterFlow } = getState().contractPlan.wizard;
    if (starterFlow === 'contract') {
      await dispatch(getSelectablePlans());
      return 'planAddNewOrSelect';
    }

    return 'planContractAssociation';
  };

const initializePlanPage = (): AppThunk => async (dispatch, getState) => {
  const state = getState();

  const disabledBranchIds = selectDisabledBranchIds(state);
  const branchIds = selectSelectedBranchIds(state);
  const mainCategoryId = selectSelectedMainCategoryId(state);
  const planType = selectSelectedPlanType(state);
  const contractId = selectSelectedContractId(state);

  dispatch(addPlanDisabledBranchIds(disabledBranchIds));
  dispatch(
    setInitialPlanForm({
      branchIds,
      contractId,
      mainCategoryId,
      type: planType
    })
  );
};

const planContractAssociationOnNext =
  (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
    const state = getState();

    const planContractAssociation = selectPlanContractAssociation(state);
    const asset = selectAsset(state);

    if (planContractAssociation === 'withContract') {
      return 'contractType';
    }

    if (!asset.id) {
      await dispatch(initializePlanPage());
      return 'planAddNew';
    }

    await dispatch(getSelectablePlans());
    return 'planAddNewOrSelect';
  };

const associatePlanWithAsset = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const selectedPlanId = selectSelectedPlanId(state);
  const assetId = selectAsset(state).id;

  if (assetId) {
    // If existing contract selected, don't make API call
    const assetPlans = await dispatch(getAssetPlans(assetId));
    if (assetPlans.some((i) => i.id === selectedPlanId)) {
      return;
    }

    const requestBuilder = () =>
      axios.put(`registration/assets/${assetId}/associate-plan`, { planId: selectedPlanId });
    await dispatch(apiCaller(requestBuilder));
    dispatch(getAssetPlans(assetId));
  }
};

const planAddNewOrSelectOnNext =
  (): AppThunk<Promise<WizardSteps>> => async (dispatch, getState) => {
    const state = getState();
    const selectedPlanId = selectSelectedPlanId(state);
    if (selectedPlanId) {
      await dispatch(associatePlanWithAsset());

      return 'planSuccess';
    }

    await dispatch(initializePlanPage());
    return 'planAddNew';
  };

const planAddNewOnNext = (): AppThunk<Promise<WizardSteps>> => async (dispatch) => {
  await dispatch(associatePlanWithAsset());

  return 'planSuccess';
};

const planSuccessOnNext = (): AppThunk<Promise<WizardSteps>> => async () => {
  const nextStep: WizardSteps = undefined;
  return nextStep;
};

export const clearWizard = (): AppThunk => async (dispatch) => {
  dispatch(actions.clear());
};

const stepMappings: StepMappings = {
  contractAddNew: {
    onNext: contractAddNewOnNext
  },
  contractAddNewOrSelect: {
    onNext: contractAddNewOrSelectOnNext
  },
  contractBranch: {
    onNext: contractBranchOnNext
  },
  contractExistsWarning: {
    onNext: contractExistsWarningOnNext
  },
  contractFinished: {
    onNext: contractFinishedOnNext
  },
  contractMainCategory: {
    onNext: contractMainCategoryOnNext
  },
  contractStart: {
    onNext: contractStartOnNext
  },
  contractSuccess: {
    onNext: contractSuccessOnNext
  },
  contractType: {
    onNext: contractTypeOnNext
  },
  planAddNew: {
    onNext: planAddNewOnNext
  },
  planAddNewOrSelect: {
    onNext: planAddNewOrSelectOnNext
  },
  planBranch: {
    onNext: planBranchOnNext
  },
  planContractAssociation: {
    onNext: planContractAssociationOnNext
  },
  planExistsWarning: {
    onNext: planExistsWarningOnNext
  },
  planMainCategory: {
    onNext: planMainCategoryOnNext
  },
  planStart: {
    onNext: planStartOnNext
  },
  planSuccess: {
    onNext: planSuccessOnNext
  },
  planType: {
    onNext: planTypeOnNext
  }
};

const selectStarterFlow = (state: RootState) => state.contractPlan.wizard.starterFlow;

export const selectActiveStep = (state: RootState) => state.contractPlan.wizard.activeStep;

export const selectExistingContractInfo = (state: RootState) =>
  state.contractPlan.wizard.contract.existingContract;

export const selectSelectableContractIds = (state: RootState) =>
  state.contractPlan.wizard.contract.selectableContractIds;

export const selectSelectableContracts = createSelector(
  (state: RootState) => state,
  selectSelectableContractIds,
  (state, ids) => ids.map((id) => state.contracts.entities[id])
);

export const selectSelectedContractType = (state: RootState) =>
  state.contractPlan.wizard.contract.selectedType;

export const selectSelectedContractId = (state: RootState) =>
  state.contractPlan.wizard.contract.selectedContractId;

export const selectExistingPlanId = (state: RootState) =>
  state.contractPlan.wizard.plan.existingPlan.planId;

export const selectPlanContractAssociation = (state: RootState) =>
  state.contractPlan.wizard.plan.planContractAssociation;

export const selectSelectablePlanIds = (state: RootState) =>
  state.contractPlan.wizard.plan.selectablePlanIds;

export const selectSelectablePlans = createSelector(
  (state: RootState) => state,
  selectSelectablePlanIds,
  (state, ids) => ids.map((id) => state.plans.entities[id])
);

export const selectSelectedPlanId = (state: RootState) =>
  state.contractPlan.wizard.plan.selectedPlanId;

export const selectSelectedPlanType = (state: RootState) =>
  state.contractPlan.wizard.plan.selectedType;

export const selectSelectedBranchIds = (state: RootState) =>
  state.contractPlan.wizard.branch.selectedIds;

export const selectDisabledBranchIds = (state: RootState) =>
  state.contractPlan.wizard.branch.disabledIds;

export const selectSelectedMainCategoryId = (state: RootState) =>
  state.contractPlan.wizard.mainCategory.selectedId;

export default wizardSlice.reducer;
