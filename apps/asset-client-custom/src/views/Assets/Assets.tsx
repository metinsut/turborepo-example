import { ASSET_DETAIL } from 'routes/constant-route';
import { Asset } from 'store/slices/asset/detail/types';
import { Box, CatIconButton } from 'catamaran/core';
import { Divider, Paper } from 'catamaran/core/mui';
import {
  assetSelectorReducer,
  initialState,
  selectAllChecked,
  selectCheckedAssetIds
} from './assetsReducer';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AssetActionButton from './AssetActionButton/AssetActionButton';
import AssetAddOptions from './AssetAddOptions';
import AssetList from './AssetList';
import AssetListBottomBar from 'views/Assets/List/AssetListBottomBar';
import AssetStatusButtons from './AssetStatusButtons';
import AssetsBranchButton from './AssetsBranchButton';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import FilterDrawer from 'views/Assets/Filter/FilterDrawer';
import FilterIcon from 'catamaran/icons/Filter';
import React, { useState } from 'react';
import clsx from 'clsx';

export const AssetContext = React.createContext<Asset | undefined>(undefined);

function Assets() {
  const [state, assetDispatch] = React.useReducer(assetSelectorReducer, initialState);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const history = useHistory();
  const { t } = useTranslation();

  const [saveFilterOpen, setSaveFilterOpen] = useState(false);

  const toggleSaveFilter = () => {
    setSaveFilterOpen(!saveFilterOpen);
  };

  const checkedIdList = selectCheckedAssetIds(state);
  const isAllSelected = selectAllChecked(state);

  const handleAssetEdit = (id: string) => {
    history.push(`${ASSET_DETAIL.replace(':id', id)}`);
  };

  const setDrawerOpen = (open: boolean) => {
    setFilterOpen(open);
  };

  return (
    <ContentLayout
      branchSelector={<AssetsBranchButton />}
      pageBreadcrumbs={[
        {
          text: t('assets.asset_list.asset_list_title')
        }
      ]}
      pageHeader={t('assets.asset_list.asset_list_title')}
      pageTitle={t('assets.assets')}
    >
      <Paper
        className="radius-16 flex overflow-hidden flex-direction-column relative"
        style={{ height: 'calc(100vh - var(--page-space))' }}
      >
        <div className={clsx({ overlay: isFilterOpen }, 'radius-16')} />
        <FilterDrawer
          open={isFilterOpen}
          saveFilterOpen={saveFilterOpen}
          setDrawerOpen={setDrawerOpen}
          toggleSaveFilter={toggleSaveFilter}
        />
        <Box flex flexDirection="row" height="48px" justifyContent="space-between" px={1.5} py={1}>
          <Box flex />
          <Box flex>
            <AssetStatusButtons />
          </Box>
          <Box flex flexDirection="row">
            <AssetActionButton checkedIdList={checkedIdList} onAssetEdit={handleAssetEdit} />
            <Divider orientation="vertical" style={{ height: '16px', margin: '8px' }} />
            <AssetAddOptions />
            <Divider orientation="vertical" style={{ height: '16px', margin: '8px' }} />
            <Box center flex>
              <CatIconButton disabled={isFilterOpen} onClick={() => setDrawerOpen(true)}>
                <FilterIcon color="blue" contained />
              </CatIconButton>
            </Box>
          </Box>
        </Box>
        <div className="divider-horizontal mx8" />
        <AssetList
          assetDispatch={assetDispatch}
          onAssetEdit={handleAssetEdit}
          state={state}
          toggleSaveFilter={toggleSaveFilter}
        />
        <AssetListBottomBar
          checkedIdList={checkedIdList}
          isAllSelected={isAllSelected}
          total={state.total}
        />
      </Paper>
    </ContentLayout>
  );
}

export default Assets;
