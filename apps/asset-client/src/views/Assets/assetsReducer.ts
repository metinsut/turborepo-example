import { AssetListItem } from 'store/slices/asset/detail/types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export type AssetListState = {
  checkedAssetIds: { [id: string]: boolean };
  page: number;
  pageSize: number;
  total: number;
};

const assetSelectorAdapter = createEntityAdapter<AssetListItem>({
  selectId: (asset) => asset.assetId
});

const defaultState: AssetListState = {
  checkedAssetIds: {},
  page: 1,
  pageSize: 30,
  total: 0
};

export const initialState = assetSelectorAdapter.getInitialState(defaultState);

const assetSelectorSlice = createSlice({
  initialState,
  name: 'assetSelector',
  reducers: {
    checkAllAssets: (draft) => {
      if (Object.keys(draft.checkedAssetIds)?.length > 0) {
        draft.checkedAssetIds = {};
      } else {
        const allIdsChecked: { [id: string]: boolean } = {};
        draft.ids.forEach((id) => {
          allIdsChecked[id] = true;
        });
        draft.checkedAssetIds = allIdsChecked;
      }
    },
    checkAsset: (draft, action: PayloadAction<string>) => {
      const id = action.payload;
      if (draft.checkedAssetIds[id]) {
        delete draft.checkedAssetIds[id];
      } else {
        draft.checkedAssetIds[id] = true;
      }
    },
    clear: (draft) => {
      draft.page = initialState.page;
      draft.pageSize = initialState.pageSize;
      draft.total = initialState.total;
      assetSelectorAdapter.removeAll(draft);
    },
    incrementPage: (draft) => {
      draft.page += 1;
    },
    initializePage: (draft) => {
      draft.page = 1;
      draft.checkedAssetIds = {};
      assetSelectorAdapter.removeAll(draft);
    },
    setAssets: (
      draft,
      action: PayloadAction<{
        assets: AssetListItem[];
        total: number;
      }>
    ) => {
      const { assets, total } = action.payload;
      const isAllChecked = selectAllChecked(draft);
      assetSelectorAdapter.upsertMany(draft, assets);
      draft.total = total;
      if (isAllChecked) {
        assets.forEach((asset) => {
          draft.checkedAssetIds[asset.assetId] = true;
        });
      }
    }
  }
});

type AssetSelectorStateShape = ReturnType<typeof assetSelectorSlice.reducer>;

export const {
  selectAll: selectAllAssets,
  selectById: selectAssetsById,
  selectIds: selectAllAssetIds,
  selectEntities
} = assetSelectorAdapter.getSelectors();

export const selectPage = (state: AssetSelectorStateShape) => state.page;
export const selectPageSize = (state: AssetSelectorStateShape) => state.pageSize;
export const selectTotalNumberOfAssets = (state: AssetSelectorStateShape) => state.total;

export const selectAssetChecked = (state: AssetSelectorStateShape, id: string) =>
  !!state.checkedAssetIds[id];

export const selectAllChecked = (state: AssetSelectorStateShape) =>
  Object.keys(state.checkedAssetIds).length === state.ids.length && state.ids.length > 0;

export const selectAnyChecked = (state: AssetSelectorStateShape) =>
  Object.keys(state.checkedAssetIds)?.length > 0;

export const selectCheckedAssetIds = (state: AssetSelectorStateShape) =>
  Object.keys(state.checkedAssetIds);

export const { reducer: assetSelectorReducer } = assetSelectorSlice;
export const { checkAllAssets, checkAsset, setAssets, incrementPage, initializePage } =
  assetSelectorSlice.actions;
