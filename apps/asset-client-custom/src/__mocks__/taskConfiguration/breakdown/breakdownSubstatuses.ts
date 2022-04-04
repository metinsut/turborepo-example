import { Status, Substatus } from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import { apiWrapper } from '__mocks__/utils';
import { v4 as uuid } from 'uuid';
import mock from '../../../utils/mock';

apiWrapper(() => {
  const getConfigurableRegex =
    /breakdown\/breakdowntasksubstatuses\/configurable\?mainCategoryId=(\S+)/;
  mock.onGet(getConfigurableRegex).reply((config) => {
    const mainCategoryId = config.url.match(getConfigurableRegex)[1];
    if (!mainCategoryId) {
      return [404];
    }

    return [200, configurableTaskStatuses];
  });

  const getSelectableRegex =
    /breakdown\/breakdowntasksubstatuses\/selectable\?mainCategoryId=(\S+)/;
  mock.onGet(getSelectableRegex).reply((config) => {
    const mainCategoryId = config.url.match(getSelectableRegex)[1];
    if (!mainCategoryId) {
      return [404];
    }

    return [200, selectableTaskStatuses];
  });

  const byIdRegex = /breakdown\/breakdowntasksubstatuses\/(\S+)/;
  mock.onGet(byIdRegex).reply((config) => {
    const substatusId = config.url.match(byIdRegex)[1];
    const taskstatusId = substatusDictionary[substatusId];
    const status = configurableTaskStatuses.find((i) => i.id === taskstatusId);
    const substatuses = status?.substatuses ?? [];
    const substatus = substatuses.find((i) => i.id === substatusId);
    if (!substatus) {
      return [404];
    }

    return [200, substatus];
  });

  mock.onPost('breakdown/breakdowntasksubstatuses').reply((config) => {
    const data = JSON.parse(config.data) as Substatus & {
      taskStatusId: string;
    };

    data.id = uuid();
    configurableTaskStatuses.find((i) => i.id === data.taskStatusId).substatuses.push(data);

    substatusDictionary[data.id] = data.taskStatusId;
    return [200, data];
  });

  mock.onPut(byIdRegex).reply((config) => {
    const substatusId = config.url.match(byIdRegex)[1];
    const data = JSON.parse(config.data) as Substatus;

    const statusId = substatusDictionary[substatusId];
    const substatus = configurableTaskStatuses
      .find((i) => i.id === statusId)
      .substatuses.find((i) => i.id === substatusId);
    if (!substatus) {
      return [404];
    }

    substatus.name = data.name;

    return [200, substatus];
  });

  mock.onDelete(byIdRegex).reply((config) => {
    const substatusId = config.url.match(byIdRegex)[1];
    const statusId = substatusDictionary[substatusId];
    const status = configurableTaskStatuses.find((i) => i.id === statusId);

    const substatusIndex = status.substatuses.findIndex((i) => i.id === substatusId);

    if (substatusIndex === -1) {
      return [404];
    }

    status.substatuses.splice(substatusIndex, 1);
    delete substatusDictionary[substatusId];

    return [200];
  });
});

const configurableTaskStatuses: Status[] = [
  {
    id: '1',
    key: 'inProgress',
    name: 'In Progress',
    substatuses: [
      {
        id: '10',
        name: 'Internal Intervention'
      }
    ]
  },
  {
    id: '2',
    key: 'paused',
    name: 'Pause',
    substatuses: [
      {
        id: '20',
        name: 'Waiting for Service'
      },
      {
        id: '21',
        name: 'Waiting for Parts'
      },
      {
        id: '22',
        name: 'Waiting for Help'
      }
    ]
  },
  {
    id: '3',
    key: 'closed',
    name: 'Closed',
    substatuses: [
      {
        id: '30',
        name: 'Repaired Successfully'
      },
      {
        id: '31',
        name: 'No Problems Detected'
      }
    ]
  }
];

export const selectableTaskStatuses: Status[] = [
  {
    id: '0',
    key: 'open',
    name: 'Open',
    substatuses: []
  },
  ...configurableTaskStatuses
];

const substatusDictionary: {
  [substatusId: string]: string;
} = {
  '10': '1',
  '20': '2',
  '21': '2',
  '22': '2',
  '30': '3',
  '31': '3'
};
