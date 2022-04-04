import { Metric } from 'store/slices/metricsConfiguration/detail/type';
import { MetricStatus } from 'store/slices/common/types';
import { apiWrapper } from './utils';
import mock from '../utils/mock';

const metrics: Metric[] = [
  {
    allDay: false,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    downtimeRules: [
      {
        statusIds: ['33606cc7-455a-43f7-8e53-f4e660297edb', 'e4114507-6a26-4ac3-ab07-ea8ca8c3c69b'],
        usability: 'notUsable',
        workType: 'breakdown'
      },
      {
        statusIds: ['870af7c2-32a7-4ae1-b1ee-f0ecbc7d0a7b', '95754646-107a-4951-9a79-b3f663c9c9ee'],
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
    id: '313117c2-32a7-4ae1-b1ee-f0ecbc7d0a7b',
    timeTolerance: 30,
    updatedByUser: {
      firstName: 'Tony',
      id: '7832',
      lastName: 'Hawk'
    },
    validEndTime: '2021-06-09T15:00:00.082Z',
    validStartTime: '2021-06-09T05:30:00.082Z'
  }
];

export const taskStatuses: MetricStatus[] = [
  {
    id: '33606cc7-455a-43f7-8e53-f4e660297edb',
    key: 'waitingForConfirmation',
    name: 'Waiting For Confirmation',
    taskSubStatuses: []
  },
  {
    id: 'd70fce92-b09f-4f78-bb42-f9c6785b19df',
    key: 'open',
    name: 'Open',
    taskSubStatuses: []
  },
  {
    id: '8cd51a8e-c22b-460a-89fa-aa3ba88aecbe',
    key: 'inProgress',
    name: 'In Progress',
    taskSubStatuses: [
      {
        id: '667eb94a-d537-4df6-94b8-a28795a561a3',
        key: 'external-intervention',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'External Intervention'
      },
      {
        id: 'dc29d826-45c4-4a03-a94c-68a52fbd1f9c',
        key: 'internal-intervention',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'Internal Intervention'
      },
      {
        id: 'e4114507-6a26-4ac3-ab07-ea8ca8c3c69b',
        key: 'waiting-for-service',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'Waiting For Service'
      },

      {
        id: '2',
        key: 'waiting-for-parts',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'Waiting for parts'
      },
      {
        id: '1ba743b4-ef3e-4442-b3cf-83fa60f5fb82',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'opopopo'
      },
      {
        id: '087227bf-2077-49f8-bfb3-3cb7c0bf803d',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'sub1'
      },
      {
        id: '0edb9719-a32b-4541-8597-5272e447b273',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'sub34'
      }
    ]
  },
  {
    id: '56396eaf-ce5b-49d2-b9f4-1df28c02a170',
    key: 'paused',
    name: 'Paused',
    taskSubStatuses: [
      {
        id: '63875d34-4b56-44c2-b555-870eb908528a',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'asd'
      },
      {
        id: '3',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'iser'
      }
    ]
  },
  {
    id: '870af7c2-32a7-4ae1-b1ee-f0ecbc7d0a7b',
    key: 'denied',
    name: 'Deny',
    taskSubStatuses: [
      {
        id: '1',
        key: 'open-another-breakdown-request',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'Open another breakdown request'
      },
      {
        id: '52c71703-cdf6-453b-87d0-684e4150ade2',
        mainCategoryId: 'e17d6946-e673-4ee5-9bc7-bb9d7c961ba6',
        name: 'Deny tester'
      }
    ]
  }
];

apiWrapper(() => {
  const metricTypesRegex = /registration\/assetmetrics\/(\S+)\/by-main-category$/;
  mock.onGet(metricTypesRegex).reply((config) => {
    const mainCategoryId = config.url.match(metricTypesRegex)[1];

    const result = metrics.map((m) => {
      const returnedMetric: Metric = {
        ...m,
        mainCategoryId
      };
      return returnedMetric;
    });

    return [200, result];
  });
  const statusesRegex = /registration\/taskstatuses\/filter\?workType=(\S+)&mainCategoryId=(\S+)$/;
  mock.onGet(statusesRegex).reply(() => [200, taskStatuses]);

  const metricsConfiguration = /registration\/assetmetrics\/(\S+)$/;
  mock.onPut(metricsConfiguration).reply((config) => {
    const updatedMetric: Metric = JSON.parse(config.data);
    const metricId = config.url.match(metricsConfiguration)[1];
    const existingMetric = metrics.find((i) => i.id === metricId);

    if (!existingMetric) {
      return [404, 'Metric not found!'];
    }

    existingMetric.allDay = updatedMetric.allDay;
    existingMetric.days = [...updatedMetric.days];
    existingMetric.downtimeRules = [...updatedMetric.downtimeRules];
    existingMetric.goals = [...updatedMetric.goals];
    existingMetric.holidaysIncluded = updatedMetric.holidaysIncluded;
    existingMetric.id = updatedMetric.id;
    existingMetric.timeTolerance = updatedMetric.timeTolerance;
    existingMetric.validEndTime = updatedMetric.validEndTime;
    existingMetric.validStartTime = updatedMetric.validStartTime;

    return [200, updatedMetric];
  });
});
