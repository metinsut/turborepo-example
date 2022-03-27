import { AssetListItem, PaginatedAssetRequest } from 'store/slices/asset/detail/types';
import { PagedResult } from 'store/common';
import { apiWrapper, wrapErrorMessage } from './utils';
import { assetInfoById, assetList, assets, contracts, plans, savedFilters } from './data';
import { convertContractToBasicInformation } from './contracts';
import { convertPlanToBasicInformation } from './plans';
import mock from '../utils/mock';

apiWrapper(() => {
  const assetsRegex = /registration\/assets$/;
  mock.onGet(assetsRegex).reply(() => [200, assets]);
});

apiWrapper(() => {
  const assetListPaginatedRegex = /listing\/assets\/filter$/;
  mock.onPost(assetListPaginatedRegex).reply((config) => {
    const request: PaginatedAssetRequest = JSON.parse(config.data);
    const { size, page } = request;
    const filteredAssets = assetList;
    const slicedAssets = filteredAssets.slice((page - 1) * size, page * size);

    const pagedResult: PagedResult<AssetListItem> = {
      currentPage: page,
      items: slicedAssets,
      size,
      total: filteredAssets.length
    };

    return [200, pagedResult];
  });
});

apiWrapper(() => {
  const assetListSavedFiltersRegex = /listing\/filters$/;
  mock.onGet(assetListSavedFiltersRegex).reply((_) => [200, savedFilters]);
});

apiWrapper(() => {
  const assetContractPlansRegex =
    /registration\/assets\/(\S+)\/contract-and-plan\/contract-type\/(\S+)$/;
  mock.onGet(assetContractPlansRegex).reply((config) => {
    const assetId = config.url.match(assetContractPlansRegex)[1];
    const contractType = config.url.match(assetContractPlansRegex)[2];

    const asset = assets.find((a) => a.id === assetId);
    if (!asset) {
      return [404, 'Asset is not found'];
    }

    const existingContract = contracts.find(
      (i) =>
        (i.type === contractType || (i.type !== 'calibration' && contractType !== 'calibration')) &&
        asset.contractIds.includes(i.id)
    );

    if (!existingContract) {
      return [404, 'Existing contract not exists'];
    }

    const existingPlans = plans.filter(
      (plan) => plan.contractId === existingContract.id && asset.planIds.includes(plan.id)
    );

    return [
      200,
      {
        contracts: [existingContract],
        plans: existingPlans
      }
    ];
  });
});

apiWrapper(() => {
  const assetContractsRegex = /registration\/assets\/(\S+)\/contracts$/;
  mock.onGet(assetContractsRegex).reply((config) => {
    const assetId = config.url.match(assetContractsRegex)[1];
    const asset = assets.find((a) => a.id === assetId);
    if (!asset) {
      return [404, 'Asset is not found'];
    }

    const contractsOfAsset = asset.contractIds
      .map((contractId) => contracts.find((i) => i.id === contractId))
      .map((contract) => convertContractToBasicInformation(contract));

    return [200, contractsOfAsset];
  });
});

interface ContractData {
  contractId: string;
}

apiWrapper(() => {
  const assetContractAssociateRegex = /registration\/assets\/(\S+)\/associate-contract$/;
  mock.onPut(assetContractAssociateRegex).reply((config) => {
    const assetId = config.url.match(assetContractAssociateRegex)[1];
    const data: ContractData = JSON.parse(config.data);
    const { contractId } = data;

    const asset = assets.find((a) => a.id === assetId);
    if (!asset) {
      return [404, wrapErrorMessage('Asset is not found')];
    }

    const contract = contracts.find((a) => a.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('Contract is not found')];
    }

    const existingContractWithSameType = contracts.find(
      (i) =>
        (i.type === contract.type ||
          (i.type !== 'calibration' && contract.type !== 'calibration')) &&
        asset.contractIds.includes(i.id)
    );

    if (existingContractWithSameType) {
      const index = asset.contractIds.indexOf(existingContractWithSameType.id);
      asset.contractIds.splice(index, 1);

      const existingPlans = plans.filter(
        (plan) =>
          plan.contractId === existingContractWithSameType.id && asset.planIds.includes(plan.id)
      );

      existingPlans.forEach((plan) => {
        const index = asset.planIds.indexOf(plan.id);
        asset.planIds.splice(index, 1);
      });
    }

    asset.contractIds.push(contract.id);
    return [200, asset.contractIds.slice()];
  });
});

apiWrapper(() => {
  const assetContractDisassociateRegex = /registration\/assets\/(\S+)\/disassociate-contract$/;
  mock.onPut(assetContractDisassociateRegex).reply((config) => {
    const assetId = config.url.match(assetContractDisassociateRegex)[1];
    const data: ContractData = JSON.parse(config.data);
    const { contractId } = data;

    const asset = assets.find((a) => a.id === assetId);
    if (!asset) {
      return [404, wrapErrorMessage('Asset is not found')];
    }

    const contract = contracts.find((a) => a.id === contractId);
    if (!contract) {
      return [404, wrapErrorMessage('Contract is not found')];
    }

    const plansAssociatedWithContractAndAsset = plans.filter(
      (plan) => plan.contractId === contract.id && asset.planIds.includes(plan.id)
    );

    plansAssociatedWithContractAndAsset.forEach((plan) => {
      const index = asset.planIds.indexOf(plan.id);
      asset.planIds.splice(index, 1);
    });

    const contractIndex = asset.contractIds.indexOf(contract.id);
    asset.contractIds.splice(contractIndex, 1);

    return [200, asset.contractIds.slice()];
  });
});

interface PlanData {
  planId: string;
}

const fetchAssetInformation = /registration\/assets\/(\S+)\/search$/;
apiWrapper(() => {
  mock.onGet(fetchAssetInformation).reply(() => [200, assetInfoById]);
});

apiWrapper(() => {
  const assetPlanAssociateRegex = /registration\/assets\/(\S+)\/associate-plan$/;
  mock.onPut(assetPlanAssociateRegex).reply((config) => {
    const assetId = config.url.match(assetPlanAssociateRegex)[1];
    const data: PlanData = JSON.parse(config.data);
    const { planId } = data;

    const asset = assets.find((a) => a.id === assetId);
    if (!asset) {
      return [404, wrapErrorMessage('Asset is not found')];
    }

    const plan = plans.find((a) => a.id === planId);
    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    const existingPlanWithSameType = plans.find(
      (i) => i.type === plan.type && asset.planIds.includes(i.id)
    );

    if (existingPlanWithSameType) {
      const index = asset.planIds.indexOf(existingPlanWithSameType.id);
      asset.planIds.splice(index, 1);
    }

    asset.planIds.push(plan.id);
    return [200, asset.planIds.slice()];
  });
});

apiWrapper(() => {
  const assetPlanDisassociateRegex = /registration\/assets\/(\S+)\/disassociate-plan$/;
  mock.onPut(assetPlanDisassociateRegex).reply((config) => {
    const assetId = config.url.match(assetPlanDisassociateRegex)[1];
    const data: PlanData = JSON.parse(config.data);
    const { planId } = data;

    const asset = assets.find((a) => a.id === assetId);
    if (!asset) {
      return [404, wrapErrorMessage('Asset is not found')];
    }

    const plan = plans.find((a) => a.id === planId);
    if (!plan) {
      return [404, wrapErrorMessage('Plan is not found')];
    }

    const index = asset.planIds.indexOf(plan.id);
    asset.planIds.splice(index, 1);

    return [200, asset.planIds.slice()];
  });
});

apiWrapper(() => {
  const assetExistingPlanRegex = /registration\/assets\/(\S+)\/plans\/(\S+)$/;
  mock.onGet(assetExistingPlanRegex).reply((config) => {
    const assetId = config.url.match(assetExistingPlanRegex)[1];
    const planType = config.url.match(assetExistingPlanRegex)[2];

    const asset = assets.find((a) => a.id === assetId);
    if (!asset) {
      return [404, 'Asset is not found'];
    }

    const existingPlan = plans.find((i) => i.type === planType && asset.planIds.includes(i.id));

    if (!existingPlan) {
      return [404, 'Existing plan not exists'];
    }

    return [200, existingPlan];
  });
});

apiWrapper(() => {
  const assetPlansRegex = /registration\/assets\/(\S+)\/plans$/;
  mock.onGet(assetPlansRegex).reply((config) => {
    const assetId = config.url.match(assetPlansRegex)[1];
    const asset = assets.find((a) => a.id === assetId);
    if (!asset) {
      return [404, 'Asset is not found'];
    }

    const plansOfAsset = asset.planIds
      .map((planId) => plans.find((i) => i.id === planId))
      .map((plan) => convertPlanToBasicInformation(plan));

    return [200, plansOfAsset];
  });
});

apiWrapper(() => {
  const assetIdRegex = /registration\/assets\/(\S+)$/;
  mock.onGet(assetIdRegex).reply((config) => {
    const id = config.url.match(assetIdRegex)[1];
    const asset = assets.find((a) => a.id === id);

    if (!asset) {
      return [404, wrapErrorMessage('Asset is not found')];
    }

    return [200, asset];
  });
});

apiWrapper(() => {
  mock.onPost('registration/assets/codes/search').reply((config) => {
    const { code, page, size } = JSON.parse(config.data) as {
      code: string;
      page: number;
      size: number;
    };

    const codes = assets
      .filter((a) => a.code.toLowerCase().includes(code))
      .map((asset) => asset.code);

    const data = Array.from(new Set(codes));

    const pagedResult: PagedResult<string> = {
      currentPage: page,
      items: data.slice((page - 1) * size, page * size),
      size,
      total: data.length
    };

    return [200, pagedResult];
  });
});

apiWrapper(() => {
  const searchContractContactRegex =
    /recommendation\/registration\/firm-contact-person\/search\?text=(.+)&page=(\d+)&size=(\d+)$/;
  mock.onGet(searchContractContactRegex).reply((config) => {
    const searchText = config.url.match(searchContractContactRegex)[1].toLowerCase();
    const page = +config.url.match(searchContractContactRegex)[2];
    const size = +config.url.match(searchContractContactRegex)[3];

    const contacts = contracts
      .filter((a) => a.firm?.contactPerson?.toLowerCase().includes(searchText))
      .map((contract) => contract.firm.contactPerson);

    const data = Array.from(new Set(contacts));

    const pagedResult: PagedResult<string> = {
      currentPage: page,
      items: data.slice((page - 1) * size, page * size),
      size,
      total: data.length
    };

    return [200, pagedResult];
  });
});

apiWrapper(() => {
  const searchContractFirmRegex =
    /recommendation\/registration\/firm-name\/search\?text=(.+)&page=(\d+)&size=(\d+)$/;
  mock.onGet(searchContractFirmRegex).reply((config) => {
    const searchText = config.url.match(searchContractFirmRegex)[1].toLowerCase();
    const page = +config.url.match(searchContractFirmRegex)[2];
    const size = +config.url.match(searchContractFirmRegex)[3];
    const firms = contracts
      .filter((a) => a.firm?.firmName?.toLowerCase().includes(searchText))
      .map((contract) => contract.firm.firmName);

    const data = Array.from(new Set(firms));

    const pagedResult: PagedResult<string> = {
      currentPage: page,
      items: data.slice((page - 1) * size, page * size),
      size,
      total: data.length
    };

    return [200, pagedResult];
  });
});

apiWrapper(() => {
  const searchAssetPurchasedFirmRegex =
    /recommendation\/registration\/purchased-firm\/search\?text=(.+)&page=(\d+)&size=(\d+)$/;
  mock.onGet(searchAssetPurchasedFirmRegex).reply((config) => {
    const searchText = config.url.match(searchAssetPurchasedFirmRegex)[1].toLowerCase();
    const page = +config.url.match(searchAssetPurchasedFirmRegex)[2];
    const size = +config.url.match(searchAssetPurchasedFirmRegex)[3];

    const firms = assets
      .filter((a) => a.purchasedFirm?.toLowerCase().includes(searchText))
      .map((asset) => asset.purchasedFirm);

    const data = Array.from(new Set(firms));

    const pagedResult: PagedResult<string> = {
      currentPage: page,
      items: data.slice((page - 1) * size, page * size),
      size,
      total: data.length
    };

    return [200, pagedResult];
  });
});

apiWrapper(() => {
  const searchAssetContactPerson =
    /recommendation\/registration\/contact-person\/search\?text=(.+)&page=(\d+)&size=(\d+)$/;
  mock.onGet(searchAssetContactPerson).reply((config) => {
    const searchText = config.url.match(searchAssetContactPerson)[1].toLowerCase();
    const page = +config.url.match(searchAssetContactPerson)[2];
    const size = +config.url.match(searchAssetContactPerson)[3];

    const persons = assets
      .filter((a) => a.contactPerson?.toLowerCase().includes(searchText))
      .map((asset) => asset.contactPerson);

    const data = Array.from(new Set(persons));

    const pagedResult: PagedResult<string> = {
      currentPage: page,
      items: data.slice((page - 1) * size, page * size),
      size,
      total: data.length
    };

    return [200, pagedResult];
  });
});
