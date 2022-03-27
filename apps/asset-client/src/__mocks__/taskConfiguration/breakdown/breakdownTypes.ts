import { BreakdownType } from 'store/slices/taskConfiguration/breakdown/breakdownTypes';
import { apiWrapper } from '__mocks__/utils';
import mock from '../../../utils/mock';

apiWrapper(() => {
  const getRegex = /breakdown\/breakdowntypes\?mainCategoryId=(\S+)/;
  mock.onGet(getRegex).reply((config) => {
    const mainCategoryId = config.url.match(getRegex)[1];
    if (!mainCategoryId) {
      return [404];
    }

    return [200, allTypes];
  });

  const byIdRegex = /breakdown\/breakdowntypes\/(\S+)/;
  mock.onGet(byIdRegex).reply((config) => {
    const typeId = config.url.match(byIdRegex)[1];
    const type = allTypes.find((i) => i.id === typeId);
    if (!type) {
      return [404];
    }

    return [200, type];
  });

  mock.onPost('breakdown/breakdowntypes').reply((config) => {
    const data = JSON.parse(config.data) as BreakdownType;

    data.id = (allTypes.length + 1).toString();
    allTypes.push(data);

    return [200, data];
  });

  mock.onPut(byIdRegex).reply((config) => {
    const typeId = config.url.match(byIdRegex)[1];
    const data = JSON.parse(config.data) as BreakdownType;

    const type = allTypes.find((i) => i.id === typeId);
    if (!type) {
      return [404];
    }

    type.name = data.name;

    return [200, type];
  });

  mock.onDelete(byIdRegex).reply((config) => {
    const typeId = config.url.match(byIdRegex)[1];

    const typeIndex = allTypes.findIndex((i) => i.id === typeId);
    if (typeIndex === -1) {
      return [404];
    }

    allTypes.splice(typeIndex, 1);

    return [200];
  });
});

export const allTypes: BreakdownType[] = [
  {
    id: '1',
    name: 'Electronic Breakdown'
  },
  {
    id: '2',
    name: 'Manufacturing Error'
  },
  {
    id: '3',
    name: 'User Error'
  },
  {
    id: '4',
    name: 'Mechanical Error'
  },
  {
    id: '5',
    name: 'Power Fail'
  },
  {
    id: '6',
    name: 'Deprecation'
  },
  {
    id: '7',
    name: 'Hazardous Conditions'
  },
  {
    id: '8',
    name: 'External Supply Fail (gas, electric liquid connection, etc.)'
  },
  {
    id: '9',
    name: 'Device Related Issues'
  },
  {
    id: '10',
    name: 'Consumable Related Issues'
  },
  {
    id: '11',
    name: 'Patient Related Issues'
  }
];
