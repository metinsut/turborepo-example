import { Day, daysOfWeek } from 'store/common';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PersonnelAssignment, Plan, PlanPeriodType } from './types';
import { draftPlan, initialState } from './data';

export const plansAdapter = createEntityAdapter<Plan>({
  sortComparer: (first, second) => first.title.localeCompare(second.title)
});

const plansSlice = createSlice({
  initialState: plansAdapter.getInitialState(initialState),
  name: 'plans',
  reducers: {
    addDisabledBranchIds: (draft, action: PayloadAction<string[]>) => {
      const disabledBranchIds = action.payload;
      disabledBranchIds.forEach((id) => {
        if (!draft.disabledBranchIds.includes(id)) {
          draft.disabledBranchIds.push(id);
        }
      });
    },
    addPlan: plansAdapter.upsertOne,
    addPlans: plansAdapter.upsertMany,
    clearInitialPlanForm: (draft) => {
      draft.initialDraftPlan = { ...draftPlan };
      draft.draftPlan = { ...draftPlan };

      draft.disabledBranchIds = [];
      draft.selectableBranchIds = [];
    },
    removeAssistantPersonIds: (draft) => {
      draft.draftPlan.personnelAssignment.assistantPersonnelIds =
        initialState.draftPlan.personnelAssignment.assistantPersonnelIds;
    },
    removeNotifyPersonIds: (draft) => {
      draft.draftPlan.notifyPersonIds = undefined;
    },
    removeNotifyPersonsSection: (draft) => {
      const initialNotifyPersonIds = initialState.initialDraftPlan.notifyPersonIds;

      draft.initialDraftPlan.notifyPersonIds = initialNotifyPersonIds;
      draft.draftPlan.notifyPersonIds = initialNotifyPersonIds;
    },
    removePersonnelAssignmentSection: (draft) => {
      const initialAssignment = initialState.initialDraftPlan.personnelAssignment;

      draft.initialDraftPlan.personnelAssignment = { ...initialAssignment };
      draft.draftPlan.personnelAssignment = { ...initialAssignment };
    },
    removePlan: plansAdapter.removeOne,
    removePlans: plansAdapter.removeMany,
    removeResponsiblePersonId: (draft) => {
      draft.draftPlan.personnelAssignment.responsiblePersonnelId =
        initialState.draftPlan.personnelAssignment.responsiblePersonnelId;
    },
    setInitialPlanForm: (draft, action: PayloadAction<Plan>) => {
      const basicInfo = action.payload;

      draft.initialDraftPlan = {
        ...draft.draftPlan,
        ...basicInfo
      };

      draft.draftPlan = {
        ...draft.draftPlan,
        ...basicInfo
      };
    },
    setPlanForm: (draft, action: PayloadAction<Plan>) => {
      draft.draftPlan = action.payload;
    },
    setPlanSampleTaskDates: (draft, action: PayloadAction<string[]>) => {
      draft.sampleTaskDates = action.payload;
    },
    setSelectableBranchIds: (draft, action: PayloadAction<string[]>) => {
      const selectableBranchIds = action.payload;
      draft.selectableBranchIds = selectableBranchIds;
    },
    updateAssistantPersonIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftPlan.personnelAssignment.assistantPersonnelIds = action.payload;
    },
    updateBasicPlanInformation: (
      draft,
      action: PayloadAction<{
        endDate: string;
        notes: string;
        startDate: string;
        title: string;
      }>
    ) => {
      const { endDate, notes, startDate, title } = action.payload;
      draft.draftPlan.endDate = endDate;
      draft.draftPlan.notes = notes;
      draft.draftPlan.startDate = startDate;
      draft.draftPlan.title = title;
    },
    updateBranchIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftPlan.branchIds = action.payload;
    },
    updateFrequency: (draft, action: PayloadAction<number>) => {
      draft.draftPlan.frequency = action.payload;
    },
    updateInitialNotifyPersonIds: (draft, action: PayloadAction<string[]>) => {
      draft.initialDraftPlan.notifyPersonIds = action.payload;
      draft.draftPlan.notifyPersonIds = action.payload;
    },
    updateInitialPersonnelAssignment: (draft, action: PayloadAction<PersonnelAssignment>) => {
      draft.draftPlan.personnelAssignment = action.payload;
      draft.initialDraftPlan.personnelAssignment = action.payload;
    },
    updateMainCategoryId: (draft, action: PayloadAction<string>) => {
      draft.draftPlan.mainCategoryId = action.payload;
    },
    updateNotifyPersonIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftPlan.notifyPersonIds = action.payload;
    },
    updateNotifyPersonIdsOfPlan: (
      draft,
      action: PayloadAction<{ planId: string; personIds: string[] }>
    ) => {
      const { planId, personIds } = action.payload;
      draft.entities[planId].notifyPersonIds = personIds;
    },
    updatePeriodDay: (draft, action: PayloadAction<Day>) => {
      const day = action.payload;
      const index = draft.draftPlan.days.indexOf(day);
      if (index === -1) {
        draft.draftPlan.days.push(day);
      } else {
        draft.draftPlan.days.splice(index, 1);
      }
    },
    updatePersonnelAssignment: (draft, action: PayloadAction<PersonnelAssignment>) => {
      draft.draftPlan.personnelAssignment = action.payload;
    },
    updatePersonnelAssignmnetOfPlan: (
      draft,
      action: PayloadAction<{ planId: string; personelAssignment: PersonnelAssignment }>
    ) => {
      const { planId, personelAssignment } = action.payload;
      draft.entities[planId].personnelAssignment = personelAssignment;
    },
    updatePlanPeriodType: (draft, action: PayloadAction<PlanPeriodType>) => {
      const periodType = action.payload;
      draft.draftPlan.period = periodType;

      if (periodType === 'daily') {
        draft.draftPlan.frequency = 1;
        draft.draftPlan.days = [];
      } else if (periodType === 'weekly') {
        draft.draftPlan.frequency = 1;
        draft.draftPlan.days = [...daysOfWeek];
      } else {
        delete draft.draftPlan.frequency;
        draft.draftPlan.days = [];
      }
    },
    updateResponsiblePersonIds: (draft, action: PayloadAction<string>) => {
      draft.draftPlan.personnelAssignment.responsiblePersonnelId = action.payload;
    },
    upsertPlans: plansAdapter.upsertMany
  }
});

export const {
  addDisabledBranchIds,
  addPlan,
  addPlans,
  clearInitialPlanForm,
  removeAssistantPersonIds,
  removeNotifyPersonIds,
  removeNotifyPersonsSection,
  removePlan,
  removePlans,
  removeResponsiblePersonId,
  removePersonnelAssignmentSection,
  setInitialPlanForm,
  setPlanForm,
  setPlanSampleTaskDates,
  setSelectableBranchIds,
  updateAssistantPersonIds,
  updateBasicPlanInformation,
  updateBranchIds,
  updateFrequency,
  updateInitialNotifyPersonIds,
  updateInitialPersonnelAssignment,
  updateMainCategoryId,
  updateNotifyPersonIds,
  updateNotifyPersonIdsOfPlan,
  updatePeriodDay,
  updatePersonnelAssignment,
  updatePersonnelAssignmnetOfPlan,
  updatePlanPeriodType,
  updateResponsiblePersonIds,
  upsertPlans
} = plansSlice.actions;

export default plansSlice.reducer;
