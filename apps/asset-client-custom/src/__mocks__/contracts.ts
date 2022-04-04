import {
  Contract,
  ContractAssociatedInformation,
  ContractBasicInformation,
  Cost,
  Firm,
  Metric,
  MetricType,
  PartsPolicy
} from 'store/slices/contracts/types';
import { apiWrapper, wrapErrorMessage } from './utils';
import { assets, contractMetricRelations, contractMetricTypes, contracts, plans } from './data';
import { base64ToArrayBufferConverter } from 'utils/converters';
import { categoryImportTemplate } from './categoryImportTemplate';
import { taskStatuses } from './metricsConfiguration';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import mock from '../utils/mock';

const disabledBranchIdsRegex = /registration\/contracts\/(\S+)\/asset-and-plan\/branches$/;
apiWrapper(() => {
  mock.onGet(disabledBranchIdsRegex).reply((config) => {
    const contractId = config.url.match(disabledBranchIdsRegex)[1];

    const assetBranchIds = assets
      .filter((i) => i.contractIds.includes(contractId))
      .map((i) => i.branchId);

    const planBranchIds = plans
      .filter((i) => i.contractId === contractId)
      .flatMap((i) => i.branchIds);

    const disabledBranchIds = _.union(assetBranchIds, planBranchIds);

    return [200, disabledBranchIds];
  });
});

const getContractFileRegex = /contracts\/(\S+)\/files$/;
mock.onGet(getContractFileRegex).reply(() => {
  const arrayBuffer = base64ToArrayBufferConverter(categoryImportTemplate);

  return [200, arrayBuffer];
});

const addContractRegex = /contract$/;
mock.onPost(addContractRegex).reply((config) => {
  const contract: Contract = JSON.parse(config.data);
  const existingContractIndex = contracts.findIndex((c) => c.id === contract.id);

  if (!contract.id || existingContractIndex === -1) {
    contract.id = uuid();

    contracts.push(contract);
    return [200, contract];
  }

  contracts[existingContractIndex] = contract;
  return [200, contract];
});

const contractBasicsRegex = /registration\/contracts\/basics/;
apiWrapper(() => {
  mock.onGet(contractBasicsRegex).reply(() => {
    const contractBasicInformations = contracts.map((c) => convertContractToBasicInformation(c));
    return [200, contractBasicInformations];
  });
});

const contractBasicWithIdRegex = /registration\/contracts\/(\S+)\/basics/;
apiWrapper(() => {
  mock.onGet(contractBasicWithIdRegex).reply((config) => {
    const id = config.url.match(contractBasicWithIdRegex)[1];
    const contract = contracts.find((i) => i.id === id);

    if (!contract) {
      return [404, wrapErrorMessage('Contract is not found')];
    }

    const contractBasic = convertContractToBasicInformation(contract);

    return [200, contractBasic];
  });
});

apiWrapper(() => {
  mock.onPost(contractBasicWithIdRegex).reply((config) => {
    const updatedContractInformation: ContractBasicInformation = JSON.parse(config.data);
    const id = config.url.match(contractBasicWithIdRegex)[1];
    const existingContract = contracts.find((i) => i.id === id);

    if (!existingContract) {
      return [404, null];
    }

    existingContract.branchIds = updatedContractInformation.branchIds;
    existingContract.mainCategoryId = updatedContractInformation.mainCategoryId;

    existingContract.title = updatedContractInformation.title;
    existingContract.notes = updatedContractInformation.notes;

    existingContract.startDate = updatedContractInformation.startDate;
    existingContract.endDate = updatedContractInformation.endDate;
    return [200, existingContract];
  });
});

apiWrapper(() => {
  mock.onPost(contractBasicsRegex).reply((config) => {
    const updatedContractInformation: ContractBasicInformation = JSON.parse(config.data);

    const contract: Contract = {
      branchIds: updatedContractInformation.branchIds,
      endDate: updatedContractInformation.endDate,
      id: uuid(),
      mainCategoryId: updatedContractInformation.mainCategoryId,
      metrics: {},
      notes: updatedContractInformation.notes,
      startDate: updatedContractInformation.startDate,
      title: updatedContractInformation.title,
      type: updatedContractInformation.type
    };

    contracts.push(contract);
    return [200, contract];
  });
});

const contractFirmsRegex = /registration\/contracts\/(\S+)\/firms$/;
apiWrapper(() => {
  mock.onGet(contractFirmsRegex).reply((config) => {
    const contractId = config.url.match(contractFirmsRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract || !contract.firm) {
      return [404, wrapErrorMessage('No firm - contact info')];
    }

    return [200, contract.firm];
  });

  mock.onPut(contractFirmsRegex).reply((config) => {
    const contractId = config.url.match(contractFirmsRegex)[1];
    const firmInfo: Firm = JSON.parse(config.data);
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('No contract info!')];
    }

    contract.firm = { ...firmInfo };
    return [200, contract.firm];
  });

  mock.onDelete(contractFirmsRegex).reply((config) => {
    const contractId = config.url.match(contractFirmsRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('No contract info!')];
    }

    delete contract.firm;
    return [200];
  });
});

apiWrapper(() => {
  const contractCostsRegex = /registration\/contracts\/(\S+)\/costs$/;

  mock.onGet(contractCostsRegex).reply((config) => {
    const contractId = config.url.match(contractCostsRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract || !contract.cost) {
      return [404, wrapErrorMessage('No cost info')];
    }

    return [200, contract.cost];
  });

  mock.onPut(contractCostsRegex).reply((config) => {
    const contractId = config.url.match(contractCostsRegex)[1];
    const costInfo: Cost = JSON.parse(config.data);
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('No contract info!')];
    }

    contract.cost = { ...costInfo };
    return [200, contract.cost];
  });

  mock.onDelete(contractCostsRegex).reply((config) => {
    const contractId = config.url.match(contractCostsRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('No contract info!')];
    }

    delete contract.cost;
    return [200];
  });
});

const partsPolicyWithIdRegex = /registration\/contracts\/(\S+)\/parts-policy$/;
apiWrapper(() => {
  mock.onGet(partsPolicyWithIdRegex).reply((config) => {
    const contractId = config.url.match(partsPolicyWithIdRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract || !contract.partsPolicy) {
      return [404, wrapErrorMessage('No parts policy info')];
    }

    return [200, contract.partsPolicy];
  });

  mock.onPut(partsPolicyWithIdRegex).reply((config) => {
    const contractId = config.url.match(partsPolicyWithIdRegex)[1];
    const partsPolicy: PartsPolicy = JSON.parse(config.data);
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('No contract info!')];
    }

    contract.partsPolicy = { ...partsPolicy };
    return [200, contract.partsPolicy];
  });

  mock.onDelete(partsPolicyWithIdRegex).reply((config) => {
    const contractId = config.url.match(partsPolicyWithIdRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('No contract info!')];
    }

    delete contract.partsPolicy;
    return [200];
  });
});

const contractMetricTypesRegex = /registration\/contracts\/contract-metric-types$/;
apiWrapper(() => {
  mock.onGet(contractMetricTypesRegex).reply(200, contractMetricTypes);
});

const contractMetricTypesWithIdRegex = /registration\/metrictypes\/contract\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(contractMetricTypesWithIdRegex).reply((config) => {
    const contractId = config.url.match(contractMetricTypesWithIdRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('No contract info!')];
    }

    const availableMetrics = contractMetricTypes.map((metricType) => {
      const hasContractRelation = contractMetricRelations.find(
        (i) => i.contractId === contractId && i.metricTypeId === metricType.id
      );
      const type: MetricType = {
        ...metricType
      };
      type.isMetricExist = !!hasContractRelation;
      return type;
    });

    return [200, availableMetrics];
  });
});

const statusesRegex = /registration\/taskstatuses\/filter\?workType=(\S+)&mainCategoryId=(\S+)$/;
apiWrapper(() => {
  mock.onGet(statusesRegex).reply(() => [200, taskStatuses]);
});

const metricByContractAndMetricTypeRegex = /registration\/contracts\/(\S+)\/metrics\/(\S+)$/;
apiWrapper(() => {
  mock.onPut(metricByContractAndMetricTypeRegex).reply((config) => {
    const updatedMetric: Metric = JSON.parse(config.data);
    const contractId = config.url.match(metricByContractAndMetricTypeRegex)[1];
    const metricTypeId = config.url.match(metricByContractAndMetricTypeRegex)[2];

    const contract = contracts.find((i) => i.id === contractId);

    if (!contract) {
      return [404, wrapErrorMessage('Contract is not found')];
    }

    const metricType = contractMetricTypes.find((i) => i.id === metricTypeId);
    if (!metricType) {
      return [404, wrapErrorMessage('Metric type is not found')];
    }

    const existingRelation = contractMetricRelations.find(
      (i) => i.contractId === contractId && i.metricTypeId === metricTypeId
    );

    if (!existingRelation) {
      contractMetricRelations.push({
        contractId,
        metricTypeId
      });
    }
    contract.metrics[metricTypeId] = updatedMetric;

    return [200, updatedMetric];
  });

  mock.onGet(metricByContractAndMetricTypeRegex).reply((config) => {
    const contractId = config.url.match(metricByContractAndMetricTypeRegex)[1];
    const metricTypeId = config.url.match(metricByContractAndMetricTypeRegex)[2];
    const contract = contracts.find((i) => i.id === contractId);

    if (!contract) {
      return [404, wrapErrorMessage('Contract is not found')];
    }

    const metricType = contractMetricTypes.find((i) => i.id === metricTypeId);
    if (!metricType) {
      return [404, wrapErrorMessage('Metric type is not found')];
    }

    const existingRelation = contractMetricRelations.find(
      (i) => i.contractId === contractId && i.metricTypeId === metricTypeId
    );

    if (!existingRelation) {
      return [404, wrapErrorMessage('Metric is not found')];
    }

    const metric = contract.metrics[metricTypeId];

    return [200, metric];
  });
});

const associatedInformationRegex = /registration\/contracts\/(\S+)\/asset-and-plan\/counts$/;
apiWrapper(() => {
  mock.onGet(associatedInformationRegex).reply((config) => {
    const contractId = config.url.match(associatedInformationRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);

    if (!contract) {
      return [404, wrapErrorMessage('Contract is not found')];
    }

    const contractAssets = assets.filter((a) => a.contractIds.includes(contract.id));
    const contractPlans = plans.filter((p) => p.contractId === contract.id);

    const associatedInformation: ContractAssociatedInformation = {
      assetCount: contractAssets.length,
      planCount: contractPlans.length
    };

    return [200, associatedInformation];
  });
});

const removeMetric = /registration\/contracts\/(\S+)\/metrics\/(\S+)$/;
apiWrapper(() => {
  mock.onDelete(removeMetric).reply((config) => {
    const contractId = config.url.match(removeMetric)[1];
    const metricTypeId = config.url.match(removeMetric)[2];
    const contract = contracts.find((i) => i.id === contractId);

    if (!contract) {
      return [404, wrapErrorMessage('Contract is not found')];
    }

    const metricType = contractMetricTypes.find((i) => i.id === metricTypeId);
    if (!metricType) {
      return [404, wrapErrorMessage('Metric type is not found')];
    }

    const existingRelationIndex = contractMetricRelations.findIndex(
      (i) => i.contractId === contractId && i.metricTypeId === metricTypeId
    );

    if (existingRelationIndex === -1) {
      return [400, wrapErrorMessage('Invalid metric type')];
    }

    contractMetricRelations.splice(existingRelationIndex, 1);
    delete contract.metrics[metricTypeId];

    return [200, null];
  });
});

const removeRegex = /registration\/contracts\/(\S+)$/;
apiWrapper(() => {
  mock.onDelete(removeRegex).reply((config) => {
    const contractId = config.url.match(removeRegex)[1];
    const contract = contracts.find((i) => i.id === contractId);

    if (!contract) {
      return [404, wrapErrorMessage('Contract is not found')];
    }

    const contractAssets = assets.filter((a) => a.contractIds.includes(contract.id));
    const contractPlans = plans.filter((p) => p.contractId === contract.id);
    const contractPlanIds = plans.map((i) => i.id);
    // Clearing contracts associated with asset
    contractAssets.forEach((asset) => {
      const contractIndex = asset.contractIds.findIndex((i) => i === contract.id);
      if (contractIndex !== -1) {
        asset.contractIds.splice(contractIndex, 1);
      }
    });

    // Clearing plans associated with asset
    contractAssets.forEach((asset) => {
      asset.planIds.forEach((planId, index) => {
        if (contractPlanIds.some((i) => i === planId)) {
          asset.planIds.splice(index, 1);
        }
      });
    });

    // Deleting associated plans
    contractPlans.forEach((planToDelete) => {
      const planIndex = plans.findIndex((i) => i.id === planToDelete.id);
      if (planIndex !== -1) {
        plans.splice(planIndex, 1);
      }
    });

    // Deleting contract
    const contractIndex = contracts.findIndex((c) => c.id === contract.id);
    contracts.splice(contractIndex, 1);

    return [200, null];
  });
});

apiWrapper(() => {
  mock.onPost('registration/contracts/filter').reply((config) => {
    const { branchIds, mainCategoryId, contractType } = JSON.parse(config.data);

    const filteredContracts = contracts.filter(
      (i) =>
        i.branchIds.some((branchId) => branchIds.includes(branchId)) &&
        i.mainCategoryId === mainCategoryId &&
        i.type === contractType
    );

    return [200, filteredContracts];
  });
});

export const convertContractToBasicInformation = (
  sourceContract: Contract
): ContractBasicInformation => {
  const returnedContract: ContractBasicInformation = {
    branchIds: sourceContract.branchIds,
    endDate: sourceContract.endDate,
    id: sourceContract.id,
    mainCategoryId: sourceContract.mainCategoryId,
    notes: sourceContract.notes,
    startDate: sourceContract.startDate,
    title: sourceContract.title,
    type: sourceContract.type
  };

  return returnedContract;
};
