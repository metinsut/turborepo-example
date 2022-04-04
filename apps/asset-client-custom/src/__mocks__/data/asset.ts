import { Asset, AssetListItem } from 'store/slices/asset/detail/types';
import { AssetFilter } from 'store/slices/asset/filter/types';
import { AssetInfo } from 'store/slices/breakdown/open/types';
import { emptyContractFilter, emptyInformationFilter } from 'store/slices/asset/filter/data';

export const noResultFilter: AssetFilter = {
  contract: emptyContractFilter,
  definition: {
    calibration: {
      doesNotNeedPlan: false,
      endDate: {
        type: 'any'
      },
      noPlan: false,
      title: []
    },
    maintenance: {
      doesNotNeedPlan: false,
      endDate: {
        type: 'any'
      },
      noPlan: false,
      title: []
    }
  },
  information: {
    ...emptyInformationFilter,
    branches: ['1']
  }
};

export const categoryFilter: AssetFilter = {
  contract: emptyContractFilter,
  definition: {
    calibration: {
      doesNotNeedPlan: false,
      endDate: {
        type: 'any'
      },
      noPlan: false,
      title: []
    },
    maintenance: {
      doesNotNeedPlan: false,
      endDate: {
        type: 'any'
      },
      noPlan: false,
      title: []
    }
  },
  information: {
    ...emptyInformationFilter,
    branches: ['1']
  }
};

const defaultAsset: Asset = {
  branchId: '1',
  brandId: '9',
  calibrationPlanId: '15e5a5ff-c22e-44aa-976f-79d0c370ce19',
  categoryBrandModelId: '24',
  categoryId: '9',
  code: 'test1',
  contactPerson: 'Seha',
  contractIds: ['37929186-ec29-4c85-8078-6f155c59139d', '4'],
  currencyType: 'euro',
  id: '15e5a5ff-c22e-44aa-976f-79d0c370ce15',
  isCategoryAutoAssigned: false,
  isRequireCalibrationPlan: false,
  isRequireMaintenancePlan: true,
  locationId: '9d43c7db-aeff-429d-ad5f-10a15096d537',
  mainCategoryId: '1',
  maintenancePlanId: '15e5a5ff-c22e-44aa-976f-79d0c370ce16',
  modelId: '12',
  planIds: ['15e5a5ff-c22e-44aa-976f-79d0c370ce19', '15e5a5ff-c22e-44aa-976f-79d0c370ce16'],
  purchasedFirm: 'Aksu Firm'
};

export const assets: Asset[] = Array.from({ length: 40 }, (_, index) => {
  const id = index === 0 ? defaultAsset.id : `${30 + index}`;
  return {
    ...defaultAsset,
    id
  };
});

const defaultAssetListItem: AssetListItem = {
  assetId: '15e5a5ff-c22e-44aa-976f-79d0c370ce15',
  branchId: '1',
  branchName: 'MP - Bahçelievler',
  brandName: 'Audo',
  categoryFullName: 'Biomedical - Life Support and Treatment Devices - Ventilators',
  categoryName: 'Ventilators',
  code: '25',
  locationFullName: '2nd Floor',
  locationId: '9d43c7db-aeff-429d-ad5f-10a15096d537',
  locationName: '2nd Floor',
  mainCategoryId: '1',
  mainCategoryName: 'Biomedical',
  modelName: 'Vm-3020b'
};

export const assetList: AssetListItem[] = Array.from({ length: 40 }, (_, index) => {
  const assetId = index === 0 ? defaultAssetListItem.assetId : `${30 + index}`;
  const assetSerialNo = defaultAssetListItem.code + index;
  return {
    ...defaultAssetListItem,
    assetId,
    assetSerialNo
  };
});

export const assetInfoById: AssetInfo = {
  assetStatus: 'usable',
  branchId: '1',
  brandName: 'mybrand',
  categoryName: 'bilaltest',
  code: 'LH1000001',
  id: 'dfe5d763-2984-499b-a861-dd10f5cfd612',
  locationId: '91ebaa3f-e048-4f05-9401-1f7ea87044f8',
  modelName: 'model1',
  photoPath: null
};
