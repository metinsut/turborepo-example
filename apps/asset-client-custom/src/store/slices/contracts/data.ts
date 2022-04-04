import {
  Contract,
  ContractDefinition,
  ContractStateShape,
  ContractType,
  Cost,
  CostForm,
  CostType,
  DelayTolerance,
  DowntimeRule,
  Goal,
  GoalForm,
  GoalLimitType,
  Metric,
  MetricDefinition,
  MetricType,
  PartsPolicyType,
  TimeType,
  Usability
} from './types';
import { Day } from 'store/common';
import { WorkType } from '../common/types';
import { formatISO } from 'date-fns';
import moment from 'moment';

export const costTypes: CostType[] = ['none', 'total', 'annual', 'category'];

export const contractTypes: ContractType[] = ['warranty', 'lease', 'maintenance', 'calibration'];

export const partPolicies: PartsPolicyType[] = [
  'none',
  'allParts',
  'somePartsIncluded',
  'somePartsNotIncluded',
  'partsNotIncluded'
];

export const limitTypes: GoalLimitType[] = ['timeBased', 'percentage'];

export const timeTypes: TimeType[] = ['minutes', 'hours', 'workday', 'anyday'];
export const workTypes: WorkType[] = ['breakdown', 'calibration', 'maintenance', 'retirement'];

export const delayTolerances: DelayTolerance[] = ['annualTask', 'everyTask', 'noTolerance'];
export const usabilities: Usability[] = ['usable', 'notUsable'];

export const defaultCost: Cost = {
  details: [
    {
      amount: undefined,
      categoryIds: []
    }
  ],
  type: 'none',
  valid: false
};

export const defaultCostForm: CostForm = {
  annual: { ...defaultCost, type: 'annual' },
  category: { ...defaultCost, type: 'category' },
  none: { ...defaultCost, type: 'none', valid: true },
  total: { ...defaultCost, type: 'total' },
  type: 'none'
};

const now = new Date();
const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

export const draftContract: Contract = {
  branchIds: [],
  cost: null,
  costForm: defaultCostForm,
  endDate: formatISO(endDate),
  firm: {},
  id: '',
  metrics: {
    availableStatuses: {}
  },
  notes: undefined,
  partsPolicy: {},
  startDate: formatISO(startDate),
  title: undefined,
  // TODO: Başlangıç değerini silmeliyiz ancak edit akışı etkileniyor
  type: 'maintenance'
};

export const initialState: ContractStateShape = {
  availableMetricTypes: [],
  disabledBranchIds: [],
  draftContract,
  initialDraftContract: draftContract,
  selectableBranchIds: []
};

export const initialDowntimeRule: DowntimeRule = {
  delayTolerance: 'annualTask',
  delayToleranceTimeType: 'minutes',
  delayToleranceTimeValue: 45,
  statusIds: [],
  usability: 'notUsable',
  workType: 'breakdown'
};

export const initialMetricGoal: Goal = {
  categoryGroupNo: 0,
  categoryIds: []
};

const defaultPercentageGoal: Goal = {
  ...initialMetricGoal,
  limitPercentageValue: 95,
  limitType: 'percentage'
};

const defaultTimeBasedGoal: Goal = {
  ...initialMetricGoal,
  limitTimeType: 'hours',
  limitTimeValue: 24,
  limitType: 'timeBased'
};

export const defaultGoalForm: GoalForm = {
  percentage: [{ ...defaultPercentageGoal }],
  timeBased: [{ ...defaultTimeBasedGoal }],
  type: 'timeBased'
};

// Change static +03:00 value
export const defaultValidStartTime = moment().utcOffset('+03:00').hour(0).minute(0).toISOString();

export const defaultValidEndTime = moment().utcOffset('+03:00').hour(23).minute(59).toISOString();

export const contractDefinitions: ContractDefinition[] = [
  {
    contractType: 'warranty',
    id: '1',
    properties: {
      basicInformation: {
        isVisible: true
      },
      conditions: {
        availableParameters: ['upDownTime', 'repairTime', 'response', 'partSupply'],
        isVisible: true
      },
      contractCost: {
        isVisible: false
      },
      files: {
        isVisible: true
      },
      firm: {
        isVisible: true
      },
      partsPolicy: {
        isVisible: true
      }
    }
  },
  {
    contractType: 'maintenance',
    id: '2',
    properties: {
      basicInformation: {
        isVisible: true
      },
      conditions: {
        availableParameters: ['upDownTime', 'repairTime', 'response', 'partSupply'],
        isVisible: true
      },
      contractCost: {
        availableParameters: ['none', 'total', 'annual', 'category'],
        isVisible: true
      },
      files: {
        isVisible: true
      },
      firm: {
        isVisible: true
      },
      partsPolicy: {
        isVisible: true
      }
    }
  },
  {
    contractType: 'calibration',
    id: '3',
    properties: {
      basicInformation: {
        isVisible: true
      },
      conditions: {
        isVisible: false
      },
      contractCost: {
        availableParameters: ['none', 'total', 'annual', 'category'],
        isVisible: true
      },
      files: {
        isVisible: true
      },
      firm: {
        isVisible: true
      },
      partsPolicy: {
        isVisible: false
      }
    }
  },
  {
    contractType: 'lease',
    id: '4',
    properties: {
      basicInformation: {
        isVisible: true
      },
      conditions: {
        availableParameters: ['upDownTime', 'repairTime', 'response', 'partSupply'],
        isVisible: true
      },
      contractCost: {
        availableParameters: ['none', 'total', 'annual'],
        isVisible: true
      },
      files: {
        isVisible: true
      },
      firm: {
        isVisible: true
      },
      partsPolicy: {
        isVisible: false
      }
    }
  }
];

export const metricDefinitions: MetricDefinition[] = [
  {
    id: '1',
    metricType: {
      name: 'Updown'
    },
    properties: {
      downtimeRules: {
        isVisible: true
      },
      metricGoals: {
        availableParameters: ['none', 'timeBased', 'percentage'],
        isVisible: true
      },
      timeTolerance: {
        isVisible: true
      },
      validIntervals: {
        isVisible: true
      }
    }
  },
  {
    id: '2',
    metricType: {
      name: 'Response'
    },
    properties: {
      downtimeRules: {
        isVisible: true
      },
      metricGoals: {
        availableParameters: ['timeBased'],
        isVisible: true
      },
      timeTolerance: {
        isVisible: false
      },
      validIntervals: {
        isVisible: true
      }
    }
  },
  {
    id: '3',
    metricType: {
      name: 'Part Supply'
    },
    properties: {
      downtimeRules: {
        isVisible: true
      },
      metricGoals: {
        availableParameters: ['timeBased'],
        isVisible: true
      },
      timeTolerance: {
        isVisible: false
      },
      validIntervals: {
        isVisible: true
      }
    }
  },
  {
    id: '4',
    metricType: {
      name: 'Repair'
    },
    properties: {
      downtimeRules: {
        isVisible: true
      },
      metricGoals: {
        availableParameters: ['timeBased'],
        isVisible: true
      },
      timeTolerance: {
        isVisible: false
      },
      validIntervals: {
        isVisible: true
      }
    }
  }
];

const allDays: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const draftMetricDictionary: { [metricName: string]: Metric } = {
  'Part Supply': {
    allDay: false,
    days: allDays,
    downtimeRules: [
      {
        defaultStatusKeys: ['waiting-for-parts'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        usability: 'notUsable',
        workType: 'breakdown'
      },
      {
        defaultStatusKeys: ['waiting-for-parts'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        usability: 'usable',
        workType: 'breakdown'
      }
    ],
    goalForm: { ...defaultGoalForm },
    goals: [{ ...defaultTimeBasedGoal }],
    holidaysIncluded: false,
    validEndTime: defaultValidEndTime,
    validStartTime: defaultValidStartTime
  },
  Repair: {
    allDay: false,
    days: allDays,
    downtimeRules: [
      {
        defaultStatusKeys: ['external-intervention', 'waiting-for-service'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        usability: 'notUsable',
        workType: 'breakdown'
      },
      {
        defaultStatusKeys: ['external-intervention', 'waiting-for-service'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        usability: 'usable',
        workType: 'breakdown'
      }
    ],
    goalForm: { ...defaultGoalForm },
    goals: [{ ...defaultTimeBasedGoal }],
    holidaysIncluded: false,
    validEndTime: defaultValidEndTime,
    validStartTime: defaultValidStartTime
  },
  Response: {
    allDay: false,
    days: allDays,
    downtimeRules: [
      {
        defaultStatusKeys: ['waiting-for-service'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        usability: 'notUsable',
        workType: 'breakdown'
      },
      {
        defaultStatusKeys: ['waiting-for-service'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        usability: 'usable',
        workType: 'breakdown'
      }
    ],
    goalForm: { ...defaultGoalForm },
    goals: [{ ...defaultTimeBasedGoal }],
    holidaysIncluded: false,
    validEndTime: defaultValidEndTime,
    validStartTime: defaultValidStartTime
  },
  Updown: {
    allDay: false,
    days: allDays,
    downtimeRules: [
      {
        defaultStatusKeys: ['open-another-breakdown-request', 'inProgress', 'paused'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        usability: 'notUsable',
        workType: 'breakdown'
      },
      {
        defaultStatusKeys: ['inProgress'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        usability: 'usable',
        workType: 'breakdown'
      },
      {
        defaultStatusKeys: ['inProgress'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        workType: 'maintenance'
      },
      {
        defaultStatusKeys: ['inProgress'],
        delayTolerance: 'noTolerance',
        statusIds: [],
        workType: 'calibration'
      }
    ],
    goalForm: {
      ...defaultGoalForm,
      type: 'percentage'
    },
    goals: [{ ...defaultPercentageGoal }],
    holidaysIncluded: false,
    timeTolerance: 30,
    validEndTime: defaultValidEndTime,
    validStartTime: defaultValidStartTime
  }
};

export function getDraftMetric(metricType: MetricType) {
  return draftMetricDictionary[metricType.name] ?? { allDay: false };
}
