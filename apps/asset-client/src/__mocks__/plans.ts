import {
  NotifyPersonResponse,
  PersonnelAssignment,
  PlanAssociatedInformation
} from '../store/slices/plans/types';
import { Plan, PlanBasicInformation } from 'store/slices/plans/types';

import { apiWrapper, wrapErrorMessage } from './utils';
import { assets, plans } from './data';
import { formatISO } from 'date-fns';
import { v4 as uuid } from 'uuid';
import mock from '../utils/mock';

const planBasicsRegex = /registration\/plans\/basics/;
apiWrapper(() => {
  mock.onGet(planBasicsRegex).reply(() => {
    const planBasicInformations = plans.map((p) => convertPlanToBasicInformation(p));
    return [200, planBasicInformations];
  });
});

const planBasicWithIdRegex = /registration\/plans\/(\S+)\/basics/;
apiWrapper(() => {
  mock.onGet(planBasicWithIdRegex).reply((config) => {
    const id = config.url.match(planBasicWithIdRegex)[1];
    const plan = plans.find((i) => i.id === id);

    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    const planBasic = convertPlanToBasicInformation(plan);

    return [200, planBasic];
  });

  mock.onPut(planBasicWithIdRegex).reply((config) => {
    const updatedPlanInformation: PlanBasicInformation = JSON.parse(config.data);
    const id = config.url.match(planBasicWithIdRegex)[1];

    const existingPlan = plans.find((i) => i.id === id);

    if (!existingPlan) {
      return [404, wrapErrorMessage('Plan is not found, post basic')];
    }

    existingPlan.branchIds = updatedPlanInformation.branchIds;
    existingPlan.mainCategoryId = updatedPlanInformation.mainCategoryId;

    existingPlan.title = updatedPlanInformation.title;
    existingPlan.notes = updatedPlanInformation.notes;
    existingPlan.contractId = updatedPlanInformation.contractId;

    existingPlan.startDate = updatedPlanInformation.startDate;
    existingPlan.endDate = updatedPlanInformation.endDate;

    existingPlan.period = updatedPlanInformation.period;
    existingPlan.frequency = updatedPlanInformation.frequency;
    existingPlan.days = updatedPlanInformation.days;

    return [200, existingPlan];
  });
});

apiWrapper(() => {
  mock.onPost(planBasicsRegex).reply((config) => {
    const updatedPlanInformation: PlanBasicInformation = JSON.parse(config.data);

    const plan: Plan = {
      branchIds: updatedPlanInformation.branchIds,
      contractId: updatedPlanInformation.contractId,
      days: updatedPlanInformation.days,
      endDate: updatedPlanInformation.endDate,
      frequency: updatedPlanInformation.frequency,
      id: uuid(),
      mainCategoryId: updatedPlanInformation.mainCategoryId,
      notes: updatedPlanInformation.notes,
      period: updatedPlanInformation.period,
      startDate: updatedPlanInformation.startDate,
      title: updatedPlanInformation.title,
      type: updatedPlanInformation.type
    };

    plans.push(plan);
    return [200, plan];
  });
});

const createSamplePlanDates = /registration\/plans\/task-samples\?startDate=(\S+)&endDate=(\S+)/;
apiWrapper(() => {
  mock.onGet(createSamplePlanDates).reply((config) => {
    const startDate = config.url.match(createSamplePlanDates)[1];
    const samplePlans: string[] = [];

    const millis = new Date(startDate).getTime();
    for (let index = 0; index < 5; index++) {
      const nextPlan = millis + index * 500000000;
      samplePlans.push(formatISO(new Date(nextPlan)));
    }
    return [200, samplePlans];
  });
});

const notifyPersonRegex = /registration\/plans\/(\S+)\/personnel-to-be-notified/;
apiWrapper(() => {
  mock.onGet(notifyPersonRegex).reply((config) => {
    const id = config.url.match(notifyPersonRegex)[1];
    const plan = plans.find((i) => i.id === id);

    if (!plan || !plan.notifyPersonIds) {
      return [404, wrapErrorMessage('Plan does not have persons to be notified')];
    }

    return [200, plan.notifyPersonIds];
  });

  mock.onPut(notifyPersonRegex).reply((config) => {
    const id = config.url.match(notifyPersonRegex)[1];
    const notifyPersonResponse: NotifyPersonResponse = JSON.parse(config.data);

    const plan = plans.find((i) => i.id === id);

    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    plan.notifyPersonIds = notifyPersonResponse.notifiedPersonnelIds;

    return [200, notifyPersonResponse.notifiedPersonnelIds];
  });

  mock.onDelete(notifyPersonRegex).reply((config) => {
    const id = config.url.match(notifyPersonRegex)[1];

    const plan = plans.find((i) => i.id === id);

    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    delete plan.notifyPersonIds;

    return [200];
  });
});

const personnelAssignmentRegex = /registration\/plans\/(\S+)\/assignment/;
apiWrapper(() => {
  mock.onGet(personnelAssignmentRegex).reply((config) => {
    const id = config.url.match(personnelAssignmentRegex)[1];
    const plan = plans.find((i) => i.id === id);

    if (!plan || !plan.personnelAssignment) {
      return [404, wrapErrorMessage('No assignment info!')];
    }

    const assignment: PersonnelAssignment = {
      ...plan.personnelAssignment
    };

    return [200, assignment];
  });

  mock.onPut(personnelAssignmentRegex).reply((config) => {
    const id = config.url.match(personnelAssignmentRegex)[1];
    const assignment: PersonnelAssignment = JSON.parse(config.data);

    const plan = plans.find((i) => i.id === id);

    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    plan.personnelAssignment = assignment;

    return [200, assignment];
  });

  mock.onDelete(personnelAssignmentRegex).reply((config) => {
    const id = config.url.match(personnelAssignmentRegex)[1];

    const plan = plans.find((i) => i.id === id);

    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    delete plan.personnelAssignment;

    return [200];
  });

  const plansByMainCategoryBranchAndType =
    /registration\/plans\/filter\?branchId=(\S+)&mainCategoryId=(\S+)&planType=(\S+)&contractId=(\S+|)$/;
  apiWrapper(() => {
    mock.onGet(plansByMainCategoryBranchAndType).reply((config) => {
      const branchId = config.url.match(plansByMainCategoryBranchAndType)[1];
      const mainCategoryId = config.url.match(plansByMainCategoryBranchAndType)[2];
      const planType = config.url.match(plansByMainCategoryBranchAndType)[3];
      const contractId = config.url.match(plansByMainCategoryBranchAndType)[4];

      const filteredPlans = plans.filter(
        (i) =>
          i.branchIds.includes(branchId) &&
          i.mainCategoryId === mainCategoryId &&
          i.type === planType &&
          ((!contractId && !i.contractId) || (!!contractId && i.contractId === contractId))
      );

      return [200, filteredPlans];
    });
  });
});

const associatedInformationRegex = /registration\/plans\/(\S+)\/asset\/count$/;
apiWrapper(() => {
  mock.onGet(associatedInformationRegex).reply((config) => {
    const planId = config.url.match(associatedInformationRegex)[1];
    const plan = plans.find((i) => i.id === planId);

    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    const planAssets = assets.filter((a) => a.planIds.includes(plan.id));

    const associatedInformation: PlanAssociatedInformation = {
      assetCount: planAssets.length
    };

    return [200, associatedInformation];
  });
});

const removeRegex = /registration\/plans\/(\S+)$/;
apiWrapper(() => {
  mock.onDelete(removeRegex).reply((config) => {
    const planId = config.url.match(removeRegex)[1];
    const plan = plans.find((i) => i.id === planId);

    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    const planAssets = assets.filter((a) => a.planIds.includes(plan.id));

    // Clearing plans associated with asset
    planAssets.forEach((asset) => {
      const planIndex = asset.planIds.findIndex((i) => i === plan.id);
      if (planIndex !== -1) {
        asset.planIds.splice(planIndex, 1);
      }
    });

    // Deleting plan
    const planIndex = plans.findIndex((p) => p.id === plan.id);
    plans.splice(planIndex, 1);

    return [200, null];
  });
});

export const convertPlanToBasicInformation = (sourcePlan: Plan): PlanBasicInformation => {
  const returnedPlan: PlanBasicInformation = {
    branchIds: sourcePlan.branchIds,
    contractId: sourcePlan.contractId,
    days: sourcePlan.days,
    endDate: sourcePlan.endDate,
    frequency: sourcePlan.frequency,
    id: sourcePlan.id,
    mainCategoryId: sourcePlan.mainCategoryId,
    notes: sourcePlan.notes,
    period: sourcePlan.period,
    startDate: sourcePlan.startDate,
    title: sourcePlan.title,
    type: sourcePlan.type
  };

  return returnedPlan;
};
