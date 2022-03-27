import { BranchLocationCode, Location } from 'store/slices/location/locations/types';
import { Brand } from 'store/slices/brands/types';
import { Category } from 'store/slices/categories/types';
import { CategoryTask } from 'store/slices/categoryTasks';
import { Contract } from 'store/slices/contracts/types';
import { Department } from 'store/slices/users/departments/types';
import { LocationLevel } from '../../store/slices/location/locationLevels/types';
import { MetricStatus, MetricSubstatus } from 'store/slices/common/types';
import { MetricType } from '../../store/slices/contracts/types';
import { Model } from 'store/slices/models';
import { Plan } from 'store/slices/plans/types';
import { SavedFilterResponse } from 'store/slices/asset/filter/types';
import { Task } from 'store/slices/tasks/common/type';
import { User } from 'store/slices/users/details/types';
import { UsersListUser } from 'store/slices/users/list/types';
import { categoryFilter, noResultFilter } from './asset';
import { formatISO } from 'date-fns';

const date = new Date();
const milliseconds = 10 * 1000; // 10 seconds = 10000 milliseconds

export const taskList: Task[] = [
  {
    assetId: '15e5a5ff-c22e-44aa-976f-79d0c370ce15',
    branchId: '1',
    brandName: 'Audo',
    categoryName: 'Ventilators',
    code: 'F-2331-223-9034',
    id: '2533-5543-4325',
    locationId: '9d43c7db-aeff-429d-ad5f-10a15096d537',
    locationName: '2nd Floor',
    modelName: 'Vm-3020b',
    priority: 'low',
    requestedDate: '12.25.2021',
    requestedPersonnel: {
      firstName: 'Molly',
      id: '00e5bdae-9dc4-44e1-96e4-fac292688c96',
      lastName: 'Nilsson'
    },
    responsiblePersonnel: {
      firstName: 'Darrel',
      id: '32a5ewae-9dc4-44e1-43e4-sdac078688c96',
      lastName: 'Steward'
    },
    status: 'open',
    substatus: 'External Intervention',
    substatusId: '1',
    taskType: 'breakdown',
    usability: 'notUsable'
  },
  {
    assetId: '15e5a5ff-c22e-44aa-976f-79d0c370ce15',
    branchId: '1',
    brandName: 'Audo',
    categoryName: 'Ventilators',
    code: 'F-2331-223-9034',
    id: '2331-223-9035',
    locationId: '9d43c7db-aeff-429d-ad5f-10a15096d537',
    locationName: '2nd Floor',
    modelName: 'Vm-3020b',
    priority: 'low',
    requestedDate: '11.25.2021',
    requestedPersonnel: {
      firstName: 'Molly',
      id: '00e5bdae-9dc4-44e1-96e4-fac292688c96',
      lastName: 'Nilsson'
    },
    resolveExpiryDate: formatISO(new Date(date.getTime() + milliseconds)),
    resolveStatus: 'waitingToBeResolved',
    responsiblePersonnel: {
      firstName: 'Wade',
      id: '89sa32kl-68cx-44e1-00c3-dsac078688c96',
      lastName: 'Warren'
    },
    status: 'closed',
    substatus: 'External Intervention',
    substatusId: '1',
    taskType: 'breakdown',
    usability: 'usable'
  },
  {
    assetId: '15e5a5ff-c22e-44aa-976f-79d0c370ce15',
    branchId: '1',
    brandName: 'Audo',
    categoryName: 'Ventilators',
    code: 'F-2331-223-9034',
    id: '9438-5345-1214',
    locationId: '9d43c7db-aeff-429d-ad5f-10a15096d537',
    locationName: '2nd Floor',
    modelName: 'Vm-3020b',
    priority: 'high',
    requestedDate: '12.24.2021',
    requestedPersonnel: {
      email: 'j_blake@mail.com',
      firstName: 'James',
      id: '9345bdae-9dc4-44e1-96e4-fac292688c96',
      lastName: 'Blake',
      phoneNumber: '4758423'
    },
    responsiblePersonnel: {
      email: 'd_steward@mail.com',
      firstName: 'Darrel',
      id: '32a5ewae-9dc4-44e1-43e4-sdac078688c96',
      lastName: 'Steward',
      phoneNumber: '4758423'
    },
    status: 'denied',
    substatus: 'External Intervention',
    substatusId: '1',
    taskType: 'breakdown',
    usability: 'usable'
  },
  {
    assetId: '15e5a5ff-c22e-44aa-976f-79d0c370ce15',
    branchId: '1',
    brandName: 'Audo',
    categoryName: 'Ventilators',
    code: 'F-2331-223-9034',
    id: '2331-2523-9037',
    locationId: '9d43c7db-aeff-429d-ad5f-10a15096d537',
    locationName: '2nd Floor',
    modelName: 'Vm-3020b',
    priority: 'low',
    requestedDate: '12.12.2021',
    requestedPersonnel: {
      firstName: 'James',
      id: '9345bdae-9dc4-44e1-96e4-fac292688c96',
      lastName: 'Blake'
    },
    resolveExpiryDate: formatISO(date.getTime() + milliseconds * 6000),
    resolveStatus: 'waitingToBeResolved',
    responsiblePersonnel: {
      firstName: 'Albert',
      id: '67dsa0vc-9sdh-44e1-43e4-98xcx32n12m39',
      lastName: 'Flores'
    },
    status: 'closed',
    substatus: 'External Intervention',
    substatusId: '1',
    taskType: 'breakdown',
    usability: 'usable'
  },
  {
    assetId: '15e5a5ff-c22e-44aa-976f-79d0c370ce15',
    branchId: '1',
    brandName: 'Audo',
    categoryName: 'Ventilators',
    code: 'F-2331-223-9034',
    id: '5331-2238-9038',
    locationId: '9d43c7db-aeff-429d-ad5f-10a15096d53',
    locationName: '2nd Floor',
    modelName: 'Vm-3020b',
    priority: 'low',
    requestedDate: '11.22.2021',
    requestedPersonnel: {
      firstName: 'Jessie',
      id: '738bdae-9dc4-44e1-96e4-fac292688c93',
      lastName: 'Ware'
    },
    responsiblePersonnel: {
      firstName: 'Albert',
      id: '67dsa0vc-9sdh-44e1-43e4-98xcx32n12m39',
      lastName: 'Flores'
    },
    status: 'waitingForConfirmation',
    taskType: 'breakdown',
    usability: 'notUsable'
  }
];

export interface CategoryBrandModel {
  id?: string;
  categoryId?: string;
  brandId: string;
  modelId?: string;
  hasAsset?: boolean;
  approved?: boolean;
}

export const savedFilters: SavedFilterResponse[] = [
  {
    createdDate: '2021-09-23T06:14:45.160Z',
    fieldCount: 2,
    filterJson: JSON.stringify(categoryFilter),
    id: '1',
    title: 'Category Filter'
  },
  {
    createdDate: '2021-02-13T06:14:45.160Z',
    fieldCount: 3,
    filterJson: JSON.stringify(noResultFilter),
    id: '2',
    title: 'No Result Filter'
  }
];

export const categories: Category[] = [
  {
    code: 'MED',
    id: '1',
    name: 'Biomedical',
    parentCategoryId: null
  },
  {
    code: 'IT',
    id: '2',
    name: 'Information Technologies',
    parentCategoryId: null
  },
  {
    code: 'TEC',
    id: '3',
    name: 'Technical Services',
    parentCategoryId: null
  },
  {
    code: 'FUR',
    id: '4',
    name: 'Furniture',
    parentCategoryId: null
  },
  {
    code: 'ME1',
    id: '5',
    name: 'Medical Imaging Devices',
    parentCategoryId: '1'
  },
  {
    code: 'ME2',
    id: '6',
    name: 'Life Support and Treatment Devices',
    parentCategoryId: '1'
  },
  {
    code: 'ME3',
    id: '7',
    name: 'Endoscopic - Larascopic Devices',
    parentCategoryId: '1'
  },
  {
    code: 'ME4',
    id: '8',
    name: 'Angiography Devices',
    parentCategoryId: '1'
  },
  {
    code: 'ME201',
    id: '9',
    name: 'Ventilators',
    parentCategoryId: '6'
  },
  {
    code: 'ME202',
    id: '10',
    name: 'Defibrillators',
    parentCategoryId: '6'
  },
  {
    code: 'ME203',
    id: '11',
    name: 'Dialysis machines',
    parentCategoryId: '6'
  },
  {
    code: 'ME204',
    id: '12',
    name: 'Suctioning devices',
    parentCategoryId: '6'
  },
  {
    code: 'ME205',
    id: '13',
    name: 'Oxygen cocentrator machines',
    parentCategoryId: '6'
  },
  {
    code: 'ME206',
    id: '14',
    name: 'Ventricular assist devices',
    parentCategoryId: '6'
  },
  {
    code: 'ME207',
    id: '15',
    name: 'Nebulizer machines',
    parentCategoryId: '6'
  },
  {
    code: 'ME208',
    id: '16',
    name: 'IV and nutrition pumps',
    parentCategoryId: '6'
  },
  {
    code: 'ME209',
    id: '17',
    name: 'CBAP/BIBAP machines',
    parentCategoryId: '6'
  },
  {
    code: 'ME2090',
    id: '18',
    name: 'CBAP/BIBAP machines',
    parentCategoryId: '17'
  },
  {
    code: 'ME2090',
    id: '19',
    name: 'CBAP/BIBAP machines',
    parentCategoryId: '18'
  }
];

export const brands: Brand[] = [
  {
    id: '1',
    name: 'STADA Arzneimittel'
  },
  {
    id: '2',
    name: 'Steifel'
  },
  {
    id: '3',
    name: 'Strides Arcolab'
  },
  {
    id: '4',
    name: 'Stryker'
  },
  {
    id: '5',
    name: 'Schiller'
  },
  {
    id: '6',
    name: 'Saidal'
  },
  {
    id: '7',
    isNew: true,
    name: 'Sanofi'
  },
  {
    id: '8',
    name: 'Unique Brand'
  },
  {
    id: '9',
    name: 'Audo'
  }
];

export const models: Model[] = [
  {
    id: '1',
    name: 'Covonia Dry & Tickly Cough Linctus',
    photoPath: null
  },
  {
    id: '2',
    name: 'Stripox',
    photoPath: null
  },
  {
    id: '3',
    name: 'Physiogel',
    photoPath: null
  },
  {
    id: '4',
    name: 'Acarbose Tablets',
    photoPath: null
  },
  {
    id: '5',
    isNew: true,
    name: 'Lifepak 1000',
    photoPath: null
  },
  {
    id: '6',
    name: 'Lifepak 15',
    photoPath: null
  },
  {
    id: '7',
    isNew: true,
    name: 'Defigard HD-7',
    photoPath: null
  },
  {
    id: '8',
    name: 'AED Fred Easyport',
    photoPath: null
  },
  {
    id: '9',
    isNew: true,
    name: 'Lovenox 40 mg',
    photoPath: null
  },
  {
    id: '10',
    name: 'Thyrogen 0.9 mg',
    photoPath: null
  },
  {
    id: '11',
    name: 'Aubagio 14 mg',
    photoPath: null
  },
  {
    id: '12',
    name: 'Vm-3020b',
    photoPath: null
  }
];

export const categoryBrandModels: CategoryBrandModel[] = [
  {
    brandId: '1',
    categoryId: '7',
    id: '1'
  },
  {
    brandId: '2',
    categoryId: '7',
    id: '2'
  },
  {
    brandId: '3',
    categoryId: '7',
    id: '3'
  },
  {
    brandId: '4',
    categoryId: '2',
    id: '4'
  },
  {
    brandId: '5',
    categoryId: '2',
    id: '5'
  },
  {
    brandId: '5',
    categoryId: '10',
    id: '6'
  },
  {
    brandId: '6',
    categoryId: '2',
    id: '7'
  },
  {
    brandId: '3',
    categoryId: '3',
    id: '8'
  },
  {
    brandId: '1',
    categoryId: '3',
    id: '9'
  },
  {
    brandId: '4',
    categoryId: '3',
    id: '10'
  },
  {
    brandId: '7',
    categoryId: '15',
    id: '11'
  },
  {
    brandId: '4',
    categoryId: '16',
    id: '12'
  },
  {
    brandId: '1',
    categoryId: '7',
    id: '13',
    modelId: '1'
  },
  {
    brandId: '2',
    categoryId: '7',
    id: '14',
    modelId: '2'
  },
  {
    brandId: '2',
    categoryId: '7',
    id: '15',
    modelId: '3'
  },
  {
    brandId: '3',
    categoryId: '7',
    id: '16',
    modelId: '4'
  },
  {
    brandId: '4',
    categoryId: '2',
    id: '17',
    modelId: '6'
  },
  {
    brandId: '4',
    categoryId: '3',
    id: '18',
    modelId: '6'
  },
  {
    brandId: '5',
    categoryId: '2',
    id: '19',
    modelId: '8'
  },
  {
    brandId: '3',
    categoryId: '3',
    id: '20',
    modelId: '9'
  },
  {
    brandId: '3',
    categoryId: '3',
    id: '21',
    modelId: '10'
  },
  {
    // This brand is unique, just used here
    brandId: '8',
    categoryId: '2',
    id: '22'
  },
  {
    // Ventilator - Audo
    brandId: '9',
    categoryId: '9',
    id: '23'
  },
  {
    // Ventilator - Audo - Vm-3030b
    brandId: '9',
    categoryId: '9',
    hasAsset: true,
    id: '24',
    modelId: '12'
  },
  {
    // Not task, just has asset
    brandId: '3',
    categoryId: '3',
    hasAsset: true,
    id: '25',
    modelId: '11'
  },
  {
    // Task
    approved: false,
    brandId: '4',
    categoryId: '16',
    hasAsset: true,
    id: '26',
    modelId: '5'
  },
  {
    // Task
    approved: false,
    brandId: '5',
    categoryId: '10',
    hasAsset: true,
    id: '27',
    modelId: '7'
  },
  {
    // Task
    approved: false,
    brandId: '7',
    categoryId: '15',
    hasAsset: true,
    id: '28',
    modelId: '9'
  }
];

export const tasks: CategoryTask[] = [
  {
    brandId: '4',
    categoryId: '16',
    createdBy: '1',
    createdDate: formatISO(new Date()),
    id: '1',
    modelId: '5',
    numberOfAssets: 1,
    status: 'Unapproved'
  },
  {
    brandId: '5',
    categoryId: '10',
    createdBy: '1',
    createdDate: formatISO(new Date()),
    id: '2',
    modelId: '7',
    numberOfAssets: 2,
    status: 'Unapproved'
  },
  {
    brandId: '7',
    categoryId: '15',
    createdBy: '1',
    createdDate: formatISO(new Date(2020, 9, 10)),
    id: '3',
    modelId: '9',
    numberOfAssets: 0,
    status: 'Unapproved'
  },
  {
    brandId: '4',
    categoryId: '14',
    createdBy: '1',
    createdDate: formatISO(new Date(2020, 9, 20)),
    id: '4',
    modelId: '6',
    numberOfAssets: 1,
    status: 'Approved'
  },
  {
    brandId: '9',
    categoryId: '9',
    createdBy: '1',
    createdDate: formatISO(new Date(2020, 9, 20)),
    id: '24',
    modelId: '12',
    numberOfAssets: 1,
    status: 'Approved'
  }
];

export const contracts: Contract[] = [
  {
    branchIds: ['1'],
    endDate: '2022-03-14T12:58:47+03:00',
    id: '1',
    mainCategoryId: '1',
    metrics: {},
    notes: 'For testing',
    startDate: '2021-03-14T12:58:47+03:00',
    title: 'Siemens ventilators',
    type: 'warranty'
  },
  {
    branchIds: ['1'],
    endDate: '2022-03-14T12:58:47+03:00',
    firm: {
      contactPerson: 'Erdem Altunbaş',
      email: 'info@bordatech.com',
      firmName: 'Borda Teknoloji',
      phone: '+905558525232'
    },
    id: '2',
    mainCategoryId: '1',
    metrics: {},
    notes: 'For testing',
    partsPolicy: {
      partList: ['Wheel', 'Gearbox', 'Battery'],
      partPolicyType: 'somePartsIncluded'
    },
    startDate: '2021-03-14T12:58:47+03:00',
    title: 'Dell Laptops',
    type: 'warranty'
  },
  {
    branchIds: ['1'],
    cost: {
      details: [{ amount: 10000, categoryIds: [] }],
      type: 'total',
      valid: true
    },
    endDate: '2022-03-14T12:58:47+03:00',
    firm: {},
    id: '3',
    mainCategoryId: '1',
    metrics: {},
    notes: 'Contract for Stryker',
    startDate: '2021-03-14T12:58:47+03:00',
    title: 'Stryker lease contract',
    type: 'lease'
  },
  {
    branchIds: ['1'],
    cost: {
      details: [
        {
          amount: 45,
          categoryIds: ['16', '15', '14']
        },
        {
          amount: 45,
          categoryIds: ['5', '8']
        },
        {
          amount: 45,
          categoryIds: ['18']
        }
      ],
      type: 'category',
      valid: true
    },
    endDate: '2022-06-16T12:58:47+03:00',
    firm: {
      contactPerson: 'Seha yigit guryol',
      firmName: 'Borda Tech'
    },
    id: '4',
    mainCategoryId: '1',
    metrics: {},
    notes: 'For testing',
    startDate: '2021-06-16T12:58:47+03:00',
    title: 'MR calibration contract',
    type: 'calibration'
  },
  {
    branchIds: ['1'],
    cost: {
      details: [{ amount: 10000, categoryIds: [] }],
      type: 'annual',
      valid: true
    },
    endDate: '2022-06-16T12:58:47+03:00',
    firm: {},
    id: '5',
    mainCategoryId: '1',
    metrics: {},
    notes: 'Only for ventilators',
    startDate: '2021-06-16T12:58:47+03:00',
    title: 'Ventilator calibration contract',
    type: 'calibration'
  },
  {
    branchIds: ['1'],
    endDate: '2022-06-16T12:58:47+03:00',
    firm: {},
    id: '6',
    mainCategoryId: '1',
    metrics: {},
    notes: 'Only for fridge',
    startDate: '2021-06-16T12:58:47+03:00',
    title: 'Fridge maintenance contract',
    type: 'maintenance'
  },
  {
    branchIds: ['1', '2'],
    endDate: '2022-03-14T12:58:47+03:00',
    id: '37929186-ec29-4c85-8078-6f155c59139d',
    mainCategoryId: '1',
    metrics: {
      '33fed84b-8fe0-4167-b828-ae202c74abae': {
        allDay: false,
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        downtimeRules: [
          {
            delayTolerance: 'annualTask',
            delayToleranceTimeType: 'minutes',
            delayToleranceTimeValue: 45,
            statusIds: ['1', '3'],
            usability: 'notUsable',
            workType: 'breakdown'
          },
          {
            delayTolerance: 'annualTask',
            delayToleranceTimeType: 'hours',
            delayToleranceTimeValue: 2,
            statusIds: ['2'],
            usability: 'usable',
            workType: 'breakdown'
          }
        ],
        goals: [
          {
            categoryGroupNo: 0,
            limitPercentageValue: 95,
            limitType: 'percentage'
          }
        ],
        holidaysIncluded: true,
        timeTolerance: 30,
        validEndTime: '2021-06-09T15:00:00.082Z',
        validStartTime: '2021-06-09T05:30:00.082Z'
      }
    },
    notes: 'Testing contract',
    partsPolicy: {
      partList: ['Monitor', 'Keyboard', 'Mouse'],
      partPolicyType: 'somePartsIncluded'
    },
    startDate: '2021-03-14T12:58:47+03:00',
    title: 'Audo Ventilators',
    type: 'warranty'
  }
];

export const contractMetricTypes: MetricType[] = [
  {
    id: '33fed84b-8fe0-4167-b828-ae202c74abae',
    isDefault: true,
    isMetricExist: false,
    name: 'Updown'
  },
  {
    id: 'db67fef2-e945-408e-9ea9-9b14c40842da',
    isDefault: true,
    isMetricExist: false,
    name: 'Response'
  },
  {
    id: '5f435350-9007-4fa6-b113-547daf59f82e',
    isDefault: true,
    isMetricExist: false,
    name: 'Repair'
  },
  {
    id: '3da38f56-bc8c-4424-8683-9cfb0c738aa9',
    isDefault: true,
    isMetricExist: false,
    name: 'Part Supply'
  }
];

export interface ContractMetricRelation {
  contractId?: string;
  metricTypeId?: string;
}

export const contractMetricRelations: ContractMetricRelation[] = [
  {
    contractId: '37929186-ec29-4c85-8078-6f155c59139d',
    metricTypeId: '33fed84b-8fe0-4167-b828-ae202c74abae'
  }
];

export const plans: Plan[] = [
  {
    branchIds: ['1', '2'],
    contractId: '37929186-ec29-4c85-8078-6f155c59139d',
    days: ['Friday'],
    endDate: '2022-03-14T12:58:47+03:00',
    frequency: 1,
    id: '15e5a5ff-c22e-44aa-976f-79d0c370ce16',
    mainCategoryId: '1',
    notes: 'testing plan',
    notifyPersonIds: [
      '633a22c2-304d-4800-98e9-de43490471e0',
      '58a52be2-66ac-4bca-99af-949ae94eb8dc'
    ],
    period: 'weekly',
    startDate: '2021-03-14T12:58:47+03:00',
    title: 'HL Elisa Maintenance plan',
    type: 'maintenance'
  },
  {
    branchIds: ['1', '3', '5'],
    endDate: '2022-03-14T12:58:47+03:00',
    id: '15e5a5ff-c22e-44aa-976f-79d0c370ce18',
    mainCategoryId: '1',
    notes: '',
    period: 'daily',
    startDate: '2021-03-14T12:58:47+03:00',
    title: 'HL patient systems maintenance',
    type: 'maintenance'
  },
  {
    branchIds: ['1', '2'],
    contractId: '37929186-ec29-4c85-8078-6f155c59139d',
    endDate: '2022-03-14T12:58:47+03:00',
    id: '15e5a5ff-c22e-44aa-976f-79d0c370ce19',
    mainCategoryId: '1',
    notes: '',
    period: 'every2Year',
    startDate: '2021-03-14T12:58:47+03:00',
    title: 'HL patient systems calibration',
    type: 'calibration'
  },
  {
    branchIds: ['1', '6', '5'],
    endDate: '2022-03-14T12:58:47+03:00',
    id: '15e5a5ff-c22e-44aa-976f-79d0c370ce20',
    mainCategoryId: '1',
    notes: '',
    period: 'every6Month',
    personnelAssignment: {
      assistantPersonnelIds: [
        '47e5bdae-9dc4-44e1-96e4-fac292688c96',
        '33f03a31-6e66-4d83-bdac-7719d27d4787'
      ],
      responsiblePersonnelId: 'e1425570-9d55-4317-9aa3-1c60245e91f4'
    },
    startDate: '2021-03-14T12:58:47+03:00',
    title: 'HL Elisa calibration p',
    type: 'calibration'
  }
];

export const branchLocationCodes: BranchLocationCode[] = [
  {
    branchId: '1',
    id: '1',
    isAutoCode: true
  },
  {
    branchId: '2',
    id: '2',
    isAutoCode: false
  }
];

export const locationLevels: LocationLevel[] = [
  {
    branchId: '1',
    id: '0c01aab4-ef90-4056-8328-b76f16900bd9',
    level: 1,
    name: 'Buildings',
    parentLocationLevel: null,
    parentLocationLevelId: null,
    systemId: 10
  },
  {
    branchId: '1',
    id: '62c20233-68f6-4d62-afde-e9ff87f30821',
    level: 2,
    name: 'Floors',
    parentLocationLevelId: '0c01aab4-ef90-4056-8328-b76f16900bd9',
    systemId: 20
  }
];

export const locations: Location[] = [
  {
    area: 1,
    branchId: '1',
    description: null,
    id: '71ca6f18-9f52-49ac-9969-d365d4880ad3',
    isSearchResult: false,
    locationCode: null,
    locationLevelId: '0c01aab4-ef90-4056-8328-b76f16900bd9',
    name: 'A Blok',
    parentLocation: null,
    parentLocationId: null
  },
  {
    area: 1,
    branchId: '1',
    description: null,
    id: '91ebaa3f-e048-4f05-9401-1f7ea87044f8',
    isSearchResult: false,
    locationCode: null,
    locationLevelId: '0c01aab4-ef90-4056-8328-b76f16900bd9',
    name: 'B Blok',
    parentLocation: null,
    parentLocationId: null
  },
  {
    area: 1,
    branchId: '1',
    description: null,
    id: 'ab44478d-1014-4ddd-8d39-de1e900e3318',
    isSearchResult: false,
    locationCode: null,
    locationLevelId: '62c20233-68f6-4d62-afde-e9ff87f30821',
    name: '1st Floor',
    parentLocation: null,
    parentLocationId: '91ebaa3f-e048-4f05-9401-1f7ea87044f8'
  },
  {
    area: 1,
    branchId: '1',
    description: null,
    id: '2f88917e-5916-48ff-903c-4f69c277e4b2',
    isSearchResult: false,
    locationCode: null,
    locationLevelId: '62c20233-68f6-4d62-afde-e9ff87f30821',
    name: '1st Floor',
    parentLocation: null,
    parentLocationId: '71ca6f18-9f52-49ac-9969-d365d4880ad3'
  },
  {
    area: 1,
    branchId: '1',
    description: null,
    id: '9d43c7db-aeff-429d-ad5f-10a15096d537',
    isSearchResult: false,
    locationCode: null,
    locationLevelId: '62c20233-68f6-4d62-afde-e9ff87f30821',
    name: '2nd Floor',
    parentLocation: null,
    parentLocationId: '71ca6f18-9f52-49ac-9969-d365d4880ad3'
  }
];

export const taskStatuses: MetricStatus[] = [
  {
    id: '1',
    key: 'inProgress',
    name: 'In Progress',
    taskSubStatuses: [],
    workType: 'breakdown'
  },
  {
    id: '2',
    key: 'paused',
    name: 'Paused',
    taskSubStatuses: [],
    workType: 'breakdown'
  },
  {
    id: '3',
    key: 'inProgress',
    name: 'In Progress',
    taskSubStatuses: [],
    workType: 'calibration'
  }
];

export const taskSubStatuses: MetricSubstatus[] = [
  {
    id: '1',
    mainCategoryId: '1',
    name: 'External Intervention'
  },
  {
    id: '2',
    mainCategoryId: '1',
    name: 'Internal Intervention'
  },
  {
    id: '3',
    mainCategoryId: '1',
    name: 'Waiting For Service'
  },
  {
    id: '4',
    mainCategoryId: '1',
    name: 'Waiting For Part'
  },
  {
    id: '5',
    mainCategoryId: '1',
    name: 'Other'
  },
  {
    id: '6',
    mainCategoryId: '2',
    name: 'IP - Sub1'
  },
  {
    id: '7',
    mainCategoryId: '1',
    name: 'External Intervention - Calibration'
  },
  {
    id: '8',
    mainCategoryId: '1',
    name: 'Internal Intervention - Calibration'
  }
];

export const departments: Department[] = [
  {
    autoAdded: true,
    id: '00a85f64-5717-4562-b3fc-2c963f66afa6',
    mainCategories: [
      {
        mainCategoryId: '1',
        workTypes: ['breakdown', 'calibration']
      }
    ],
    name: 'Biomedical'
  },
  {
    autoAdded: true,
    id: '53a85f64-5717-4562-b3fc-2c963f66afa6',
    mainCategories: [
      {
        mainCategoryId: '2',
        workTypes: ['breakdown', 'calibration']
      }
    ],
    name: 'Information Technologies'
  },
  {
    autoAdded: true,
    id: '99a85f64-5717-4562-b3fc-2c963f66afa6',
    mainCategories: [
      {
        mainCategoryId: '3',
        workTypes: ['breakdown', 'calibration']
      }
    ],
    name: 'Technical Services'
  },
  {
    autoAdded: true,
    id: 'eea85f64-5717-4562-b3fc-2c963f66afa6',
    mainCategories: [
      {
        mainCategoryId: '4',
        workTypes: ['breakdown', 'calibration', 'maintenance']
      }
    ],
    name: 'Furniture'
  },
  {
    autoAdded: false,
    id: '2385f64-5717-4562-b3fc-2c963f66afa6',
    mainCategories: [
      {
        mainCategoryId: '1',
        workTypes: ['maintenance', 'calibration', 'breakdown']
      },
      {
        mainCategoryId: '3',
        workTypes: ['maintenance', 'retirement']
      },
      {
        mainCategoryId: '4',
        workTypes: ['breakdown', 'maintenance']
      }
    ],
    name: 'Supply'
  },
  {
    autoAdded: false,
    id: '94285f64-5717-4562-b3fc-2c963f66afa6',
    mainCategories: [
      {
        mainCategoryId: '2',
        workTypes: ['maintenance', 'retirement']
      },
      {
        mainCategoryId: '4',
        workTypes: ['breakdown', 'maintenance']
      }
    ],
    name: 'Inventory Ops'
  }
];

export const users: User[] = [
  {
    email: 'carol.warren@bordatech.com',
    firstName: 'Carol',
    id: 'c00eb414-1d0e-4129-b39c-79369fd1ec76',
    jobTitle: 'Hemşire',
    lastName: 'Warren',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  },
  {
    email: 'susan.ochoa@bordatech.com',
    firstName: 'Susan',
    id: 'f8a93533-846a-4cf4-8e0b-b82bfb869bcf',
    jobTitle: 'Doctor',
    lastName: 'Ochoa',
    phoneNumber: '+44 992 99012',
    role: 'Technician'
  }
];

export const userList: UsersListUser[] = [
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [],
    assetRole: {
      level: 50,
      name: 'RequestOnly'
    },
    branches: [],
    dateAdded: '2021-08-26T17:50:35.648592+03:00',
    firstName: 'add user',
    isGeneralAdmin: false,
    lastName: 'test',
    lastUpdate: '2021-08-26T17:50:35.648592+03:00',
    userId: '3aec31de-b46a-4389-9d1d-91c9c01790ed',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: ['LocationAdmin', 'UserAdmin'],
    allBranches: true,
    assetDepartments: [
      {
        autoAdded: true,
        id: '29436687-d4e2-4b3c-bade-4c5b8ff15b4e',
        mainCategories: null,
        name: 'asdasd',
        notes: ''
      },
      {
        autoAdded: true,
        id: '4ba98834-bf3b-4816-8d73-b36c0ba91f8a',
        mainCategories: null,
        name: 'EMRE4',
        notes: ''
      },
      {
        autoAdded: true,
        id: '75155729-b54a-49b9-ab11-510e126f7bec',
        mainCategories: null,
        name: 'EmreTest3',
        notes: ''
      }
    ],
    assetRole: {
      level: 30,
      name: 'Manager'
    },
    branches: [],
    dateAdded: '2021-09-03T11:15:53.245935+03:00',
    firstName: 'ali',
    isGeneralAdmin: false,
    lastName: 'veli',
    lastUpdate: '2021-09-03T11:15:53.245935+03:00',
    userId: 'e572c3db-a8f8-42de-94b4-33996b0cab9b',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: ['LocationAdmin', 'UserAdmin'],
    allBranches: true,
    assetDepartments: [
      {
        autoAdded: true,
        id: '29436687-d4e2-4b3c-bade-4c5b8ff15b4e',
        mainCategories: null,
        name: 'asdasd',
        notes: ''
      },
      {
        autoAdded: true,
        id: '4ba98834-bf3b-4816-8d73-b36c0ba91f8a',
        mainCategories: null,
        name: 'EMRE4',
        notes: ''
      },
      {
        autoAdded: true,
        id: '75155729-b54a-49b9-ab11-510e126f7bec',
        mainCategories: null,
        name: 'EmreTest3',
        notes: ''
      }
    ],
    assetRole: {
      level: 30,
      name: 'Manager'
    },
    branches: [],
    dateAdded: '2021-09-03T11:16:32.033957+03:00',
    firstName: 'aliwwe',
    isGeneralAdmin: false,
    lastName: 'veli',
    lastUpdate: '2021-09-03T11:16:32.033957+03:00',
    userId: '0e7a52cb-3365-44b1-a3d1-e08054569d9a',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: false,
    assetDepartments: [
      {
        autoAdded: false,
        id: '8ba34f15-cc3d-4313-af29-810d6c9fed81',
        mainCategories: null,
        name: 'Test Ömer',
        notes: null
      }
    ],
    assetRole: {
      level: 40,
      name: 'Technician'
    },
    branches: [
      {
        id: '9eda2e32-6f21-417d-be62-4f9450a3099c',
        name: 'Ferahevler Office'
      }
    ],
    dateAdded: '2021-09-06T10:56:55.006678+03:00',
    firstName: 'asasd',
    isGeneralAdmin: false,
    lastName: 'asdasdas',
    lastUpdate: '2021-09-06T10:56:55.006678+03:00',
    userId: '60538d98-b4fa-4fe0-bea4-88d007dfd26c',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: false,
    assetDepartments: [
      {
        autoAdded: true,
        id: '47bd63f1-73a4-42a5-9003-86334a23c46a',
        mainCategories: null,
        name: 'test 080421',
        notes: ''
      }
    ],
    assetRole: {
      level: 30,
      name: 'Manager'
    },
    branches: [
      {
        id: '9eda2e32-6f21-417d-be62-4f9450a3099c',
        name: 'Ferahevler Office'
      }
    ],
    dateAdded: '2021-09-07T15:52:37.129919+03:00',
    firstName: 'asdasd',
    isGeneralAdmin: false,
    lastName: 'asdasd',
    lastUpdate: '2021-09-07T15:52:37.129919+03:00',
    userId: 'b0a09fee-0436-4766-babd-9b2b9a6b6ac5',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: false,
    assetDepartments: [
      {
        autoAdded: true,
        id: '6db27c00-6bfd-4ae9-ad77-606f8a0a81bb',
        mainCategories: null,
        name: 'iser2 (Dont Delete Please)',
        notes: ''
      }
    ],
    assetRole: {
      level: 30,
      name: 'Manager'
    },
    branches: [
      {
        id: '9eda2e32-6f21-417d-be62-4f9450a3099c',
        name: 'Ferahevler Office'
      }
    ],
    dateAdded: '2021-09-07T15:59:09.870395+03:00',
    firstName: 'asdasd',
    isGeneralAdmin: false,
    lastName: 'asdasd',
    lastUpdate: '2021-09-07T15:59:09.870395+03:00',
    userId: 'c55cbca3-ea60-4a43-8191-d2493b887bd6',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [
      {
        autoAdded: true,
        id: '75155729-b54a-49b9-ab11-510e126f7bec',
        mainCategories: null,
        name: 'EmreTest3',
        notes: ''
      }
    ],
    assetRole: {
      level: 30,
      name: 'Manager'
    },
    branches: [],
    dateAdded: '2021-09-03T17:37:16.363869+03:00',
    firstName: 'asdasd',
    isGeneralAdmin: false,
    lastName: 'qweqwe',
    lastUpdate: '2021-09-03T17:37:16.363869+03:00',
    userId: 'f97ca035-fa5b-4538-9f72-11d719c4f627',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: false,
    assetDepartments: [
      {
        autoAdded: true,
        id: '631705e5-4aa8-450e-8f27-ff50c281d0ad',
        mainCategories: null,
        name: 'Department of IT',
        notes: 'We provide IT services'
      }
    ],
    assetRole: {
      level: 30,
      name: 'Manager'
    },
    branches: [
      {
        id: '9eda2e32-6f21-417d-be62-4f9450a3099c',
        name: 'Ferahevler Office'
      }
    ],
    dateAdded: '2021-09-07T15:54:42.373811+03:00',
    firstName: 'asdasdsadqq',
    isGeneralAdmin: false,
    lastName: '123123',
    lastUpdate: '2021-09-07T15:54:42.373811+03:00',
    userId: '3f83dee8-3dc1-4b02-8fa6-9b4c21d37252',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [],
    assetRole: null,
    branches: [],
    dateAdded: '2021-02-16T17:31:04.429046+03:00',
    firstName: 'Berk',
    isGeneralAdmin: true,
    lastName: 'Coşardemir',
    lastUpdate: '2021-06-01T06:17:46.357936+03:00',
    userId: 'db3e0bcd-f9b9-4bbe-bd4a-91f4c8b24ae8',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: false,
    assetDepartments: [
      {
        autoAdded: true,
        id: '47bd63f1-73a4-42a5-9003-86334a23c46a',
        mainCategories: null,
        name: 'test 080421',
        notes: ''
      },
      {
        autoAdded: true,
        id: '4ba98834-bf3b-4816-8d73-b36c0ba91f8a',
        mainCategories: null,
        name: 'EMRE4',
        notes: ''
      },
      {
        autoAdded: true,
        id: '75155729-b54a-49b9-ab11-510e126f7bec',
        mainCategories: null,
        name: 'EmreTest3',
        notes: ''
      }
    ],
    assetRole: {
      level: 40,
      name: 'Technician'
    },
    branches: [
      {
        id: '9eda2e32-6f21-417d-be62-4f9450a3099c',
        name: 'Ferahevler Office'
      },
      {
        id: '8c388fc0-e0ac-47dc-a516-e2ecfff3adae',
        name: 'IYTE Office'
      }
    ],
    dateAdded: '2021-09-09T12:49:05.576566+03:00',
    firstName: 'Britney',
    isGeneralAdmin: false,
    lastName: 'Spears',
    lastUpdate: '2021-09-09T12:49:05.576566+03:00',
    userId: 'd24daf37-17d3-4cbe-b9ae-fabb0301b5c2',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [
      {
        autoAdded: true,
        id: '47bd63f1-73a4-42a5-9003-86334a23c46a',
        mainCategories: null,
        name: 'test 080421',
        notes: ''
      },
      {
        autoAdded: true,
        id: '4ba98834-bf3b-4816-8d73-b36c0ba91f8a',
        mainCategories: null,
        name: 'EMRE4',
        notes: ''
      }
    ],
    assetRole: {
      level: 30,
      name: 'Manager'
    },
    branches: [],
    dateAdded: '2021-09-08T10:24:29.595711+03:00',
    firstName: 'Britney ',
    isGeneralAdmin: false,
    lastName: 'Spears',
    lastUpdate: '2021-09-08T10:24:29.595711+03:00',
    userId: '6d58008e-75bb-4e6e-857e-8d67d0a4b727',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [],
    assetRole: null,
    branches: [],
    dateAdded: '2021-03-31T10:43:23.379581+03:00',
    firstName: 'Burak',
    isGeneralAdmin: true,
    lastName: 'Bardak',
    lastUpdate: '2021-06-01T06:16:57.877199+03:00',
    userId: 'ee924d1e-6336-455f-a9e0-80a2cbcbb2c2',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [],
    assetRole: null,
    branches: [],
    dateAdded: '2021-07-12T12:53:43.775349+03:00',
    firstName: 'Burcu',
    isGeneralAdmin: true,
    lastName: 'Bunyak',
    lastUpdate: '2021-07-12T12:53:43.775349+03:00',
    userId: '6cc89403-3326-44c3-a4f4-941dbfe92c24',
    userStatus: 'active'
  },
  {
    additionalPermissions: [],
    allBranches: false,
    assetDepartments: [
      {
        autoAdded: true,
        id: '75155729-b54a-49b9-ab11-510e126f7bec',
        mainCategories: null,
        name: 'EmreTest3',
        notes: ''
      },
      {
        autoAdded: false,
        id: 'c9be877d-0b41-4382-b742-300e8e43923d',
        mainCategories: null,
        name: 'seha123',
        notes: '1111'
      }
    ],
    assetRole: {
      level: 20,
      name: 'Executive'
    },
    branches: [
      {
        id: '9bfd0f1e-b0f2-4650-9fa8-adb98028943e',
        name: 'Arı 3 Office'
      }
    ],
    dateAdded: '2021-09-07T15:39:10.793484+03:00',
    firstName: 'Carlos',
    isGeneralAdmin: false,
    lastName: 'Sainz',
    lastUpdate: '2021-09-07T15:39:10.793484+03:00',
    userId: '083356ee-3672-4447-b7e1-da8fb030a272',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: false,
    assetDepartments: [
      {
        autoAdded: true,
        id: '47bd63f1-73a4-42a5-9003-86334a23c46a',
        mainCategories: null,
        name: 'test 080421',
        notes: ''
      }
    ],
    assetRole: {
      level: 30,
      name: 'Manager'
    },
    branches: [
      {
        id: '8c388fc0-e0ac-47dc-a516-e2ecfff3adae',
        name: 'IYTE Office'
      }
    ],
    dateAdded: '2021-09-07T15:41:18.443634+03:00',
    firstName: 'dasdasd',
    isGeneralAdmin: false,
    lastName: '2222',
    lastUpdate: '2021-09-07T15:41:18.443634+03:00',
    userId: '0d31312b-89f6-4252-95ca-77bea121efdb',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [],
    assetRole: null,
    branches: [],
    dateAdded: '2021-03-31T09:34:29.691113+03:00',
    firstName: 'Dawood',
    isGeneralAdmin: true,
    lastName: 'Malik',
    lastUpdate: '2021-05-08T15:39:12.963477+03:00',
    userId: 'd4b97efb-0292-466f-9aea-9bfa4a6823ec',
    userStatus: 'active'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [
      {
        autoAdded: true,
        id: '6db27c00-6bfd-4ae9-ad77-606f8a0a81bb',
        mainCategories: null,
        name: 'iser2 (Dont Delete Please)',
        notes: ''
      },
      {
        autoAdded: true,
        id: '75155729-b54a-49b9-ab11-510e126f7bec',
        mainCategories: null,
        name: 'EmreTest3',
        notes: ''
      }
    ],
    assetRole: {
      level: 10,
      name: 'Admin'
    },
    branches: [],
    dateAdded: '2021-09-08T11:02:56.423304+03:00',
    firstName: 'deneme',
    isGeneralAdmin: false,
    lastName: '123',
    lastUpdate: '2021-09-08T11:02:56.423304+03:00',
    userId: 'bcf78a0e-eea1-4d32-934d-11317684debb',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [],
    assetRole: null,
    branches: [],
    dateAdded: '2021-03-31T09:33:26.54085+03:00',
    firstName: 'Doğukan',
    isGeneralAdmin: true,
    lastName: 'Arkan',
    lastUpdate: '2021-05-08T15:37:02.990198+03:00',
    userId: '12e89f88-1845-4d2f-afcc-ad5c6e5d9df8',
    userStatus: 'waiting'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [],
    assetRole: null,
    branches: [],
    dateAdded: '2021-02-16T16:52:54.415882+03:00',
    firstName: 'Duygu',
    isGeneralAdmin: true,
    lastName: 'Yıldıran',
    lastUpdate: '2021-05-08T15:36:07.736935+03:00',
    userId: '2ca8a347-df73-43ed-aa03-ebd0f914fa71',
    userStatus: 'active'
  },
  {
    additionalPermissions: [],
    allBranches: true,
    assetDepartments: [],
    assetRole: null,
    branches: [],
    dateAdded: '2021-03-02T11:55:33.041296+03:00',
    firstName: 'Duygu',
    isGeneralAdmin: true,
    lastName: 'Yıldıran',
    lastUpdate: '2021-03-02T11:55:33.041296+03:00',
    userId: 'e1824957-de25-4f65-a354-493eced60446',
    userStatus: 'waiting'
  }
];
