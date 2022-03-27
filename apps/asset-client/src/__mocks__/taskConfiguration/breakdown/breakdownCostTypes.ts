import { BreakdownCostType } from 'store/slices/taskConfiguration/breakdown/breakdownCosts';
import { apiWrapper } from '__mocks__/utils';
import { v4 as uuid } from 'uuid';
import mock from 'utils/mock';

apiWrapper(() => {
  const getRegex = /breakdown\/breakdowncosttypes\?mainCategoryId=(\S+)/;
  mock.onGet(getRegex).reply((config) => {
    const mainCategoryId = config.url.match(getRegex)[1];
    if (!mainCategoryId) {
      return [404];
    }

    return [200, allCostTypes];
  });

  const getByParentIdRegex =
    /breakdown\/breakdowncosttypes\/by-parent\?mainCategoryId=(\S+)&parentId=(\S+)&/;
  mock.onGet(getByParentIdRegex).reply((config) => {
    const mainCategoryId = config.url.match(getByParentIdRegex)[1];
    const parentId = config.url.match(getByParentIdRegex)[2];

    if (!mainCategoryId) {
      return [404];
    }

    const parentCostType = allCostTypes.find((i) => i.id === parentId);

    return [200, parentCostType?.subCostTypes ?? []];
  });

  mock.onPost('breakdown/breakdowncosttypes').reply((config) => {
    const data = JSON.parse(config.data) as BreakdownCostType;

    data.id = uuid();
    data.subCostTypes = [];
    if (data.parentCostTypeId) {
      const parentCostType = allCostTypes.find((i) => i.id === data.parentCostTypeId);
      parentCostType.subCostTypes.push(data);
    } else {
      allCostTypes.push(data);
    }

    subCostDictionary[data.id] = data.parentCostTypeId;
    return [200, data];
  });

  const byIdRegex = /breakdown\/breakdowncosttypes\/(\S+)/;
  mock.onPut(byIdRegex).reply((config) => {
    const costId = config.url.match(byIdRegex)[1];
    const data = JSON.parse(config.data) as BreakdownCostType;

    const parentCostId = subCostDictionary[costId];
    let costTypeToUpdate: BreakdownCostType;
    if (parentCostId) {
      const parentCost = allCostTypes.find((i) => i.id === parentCostId);
      costTypeToUpdate = parentCost.subCostTypes.find((i) => i.id === costId);
    } else {
      costTypeToUpdate = allCostTypes.find((i) => i.id === costId);
    }

    if (!costTypeToUpdate) {
      return [404];
    }

    costTypeToUpdate.name = data.name;

    return [200, costTypeToUpdate];
  });

  mock.onDelete(byIdRegex).reply((config) => {
    const costId = config.url.match(byIdRegex)[1];
    const parentCostId = subCostDictionary[costId];

    if (parentCostId) {
      const parentCost = allCostTypes.find((i) => i.id === parentCostId);
      const subCostIndex = parentCost.subCostTypes.findIndex((i) => i.id === costId);
      if (subCostIndex === -1) {
        return [404];
      }

      parentCost.subCostTypes.splice(subCostIndex, 1);
    } else {
      const costIndex = allCostTypes.findIndex((i) => i.id === costId);
      if (costIndex === -1) {
        return [404];
      }

      allCostTypes.splice(costIndex, 1);
    }

    delete subCostDictionary[costId];

    return [200];
  });
});

const allCostTypes: BreakdownCostType[] = [
  {
    id: '1',
    name: 'Internal Cost',
    subCostTypes: [
      {
        id: '10',
        name: 'Currency Conversion Cost',
        parentCostTypeId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'External Cost',
    subCostTypes: [
      {
        id: '20',
        name: 'Part Cost',
        parentCostTypeId: '2'
      },
      {
        id: '21',
        name: 'Service Cost',
        parentCostTypeId: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Medium Cost',
    subCostTypes: []
  }
];

const subCostDictionary: {
  [costId: string]: string;
} = {
  '1': undefined,
  '10': '1',
  '2': undefined,
  '20': '2',
  '21': '2'
};
