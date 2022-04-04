import { AssetStatus } from 'store/slices/common/types';

export type SearchResultType = {
  id: string;
  code: string;
  categoryName: string;
  brandName: string;
  modelName: string;
  photoPath: string;
  assetStatus: AssetStatus;
};
