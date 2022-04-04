import { AnyAction, EntityState } from '@reduxjs/toolkit';
import { AssetListItem } from 'store/slices/asset/detail/types';
import {
  AssetListState,
  checkAllAssets,
  incrementPage,
  initializePage,
  selectAllAssets,
  selectAllChecked,
  selectAnyChecked,
  selectAssetChecked,
  selectPage,
  selectPageSize,
  selectTotalNumberOfAssets,
  setAssets
} from './assetsReducer';
import { CatCheckbox } from 'catamaran/core';
import { PagedResult } from 'store/common';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { emptyFilter } from 'store/slices/asset/filter/data';
import { getPaginatedAssetsByFilter } from 'store/slices/asset/detail/actions';
import { selectActiveFilter } from 'store/slices/asset/filter/selectors';
import { useFindObjectChangesCount } from 'hooks/useFindObjectChangesCount';
import { usePrevious } from 'hooks/usePrevious';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AssetListRow from './AssetListRow';
import AssetListSkeleton from './AssetListSkeleton';
import React, { useCallback } from 'react';
import SelectedFilter from 'views/Assets/Filter/SelectedFilter/SelectedFilter';
import TableEmpty from 'components/Table/TableEmpty';
import clsx from 'clsx';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  headerCell: {
    color: theme.palette.darkGrey[600],
    fontWeight: 'bold',
    lineHeight: '12.66px'
  },
  tableContainer: {
    paddingBottom: '10px'
  }
}));

type Props = {
  assetDispatch: React.Dispatch<AnyAction>;
  className?: string;
  onAssetEdit?: (id: string) => void;
  state: EntityState<AssetListItem> & AssetListState;
  toggleSaveFilter: () => void;
};

function AssetList(props: Props) {
  const classes = useStyles();
  const { assetDispatch, className, onAssetEdit, state, toggleSaveFilter } = props;
  const { t } = useTranslation();

  const [assetsLoading, assetsLoadingDispatch] = useLoading<PagedResult<AssetListItem>>();
  const isAllSelected = selectAllChecked(state);
  const isAnySelected = selectAnyChecked(state);

  const handleSelectAll = () => assetDispatch(checkAllAssets());
  const assets = selectAllAssets(state);
  const pageNumber = selectPage(state);
  const pageSizeNumber = selectPageSize(state);
  const totalAssets = selectTotalNumberOfAssets(state);
  const activeFilter = useTypedSelector(selectActiveFilter);
  const filterChangesCount = useFindObjectChangesCount(emptyFilter, activeFilter);

  const prevPageNumber = usePrevious(pageNumber);

  useDeepCompareEffect(() => {
    const getPaginatedAssets = async (page: number, size: number) => {
      const data = await assetsLoadingDispatch(
        getPaginatedAssetsByFilter(page, size, activeFilter)
      );

      assetDispatch(
        setAssets({
          assets: data.items,
          total: data.total
        })
      );
    };
    if (prevPageNumber === pageNumber) {
      // filter changed, clear all -> page will be 1
      assetDispatch(initializePage());
      if (pageNumber === 1) {
        // filter changed when page = 1
        // Since page did not change, manuelly fetch (will not trigger this useeffect)
        getPaginatedAssets(pageNumber, pageSizeNumber);
      }
    } else {
      // page changed (increment or reset) or initial run -> fetch
      getPaginatedAssets(pageNumber, pageSizeNumber);
    }
  }, [assetDispatch, activeFilter, assetsLoadingDispatch, pageNumber, pageSizeNumber]);

  const handleSeeMore = useCallback(async () => {
    assetDispatch(incrementPage());
  }, [assetDispatch]);

  const infiniteScrollRef = useInfiniteScroll({
    fetchMore: handleSeeMore,
    hasMore: totalAssets > assets.length,
    loading: assetsLoading
  });

  const caption = (text: string) => (
    <Typography className={classes.headerCell} variant="caption">
      {text}
    </Typography>
  );

  return (
    <TableContainer className={clsx(className, classes.tableContainer, 'flex-1')}>
      {filterChangesCount > 0 && (
        <>
          <SelectedFilter toggleSaveFilter={toggleSaveFilter} />
        </>
      )}
      <div className="divider-horizontal mx8" />
      <Table className="tableSpace-4" size="small" stickyHeader>
        <TableHead className="elev-1">
          <TableRow>
            <TableCell className="bg-white border-0 p4">
              <CatCheckbox
                checked={isAllSelected}
                indeterminate={!isAllSelected && isAnySelected}
                onChange={handleSelectAll}
                paddingSize="medium"
              />
            </TableCell>
            <TableCell className="bg-white border-0">
              {caption(t('assets.asset_list.columns.status'))}
            </TableCell>
            <TableCell className="bg-white border-0">
              {caption(t('assets.asset_list.columns.code'))}
            </TableCell>
            <TableCell className="bg-white border-0">
              {caption(t('assets.asset_list.columns.category'))}
            </TableCell>
            <TableCell className="bg-white border-0">
              {caption(t('assets.asset_list.columns.brand'))}
            </TableCell>
            <TableCell className="bg-white border-0">
              {caption(t('assets.asset_list.columns.model'))}
            </TableCell>
            <TableCell className="bg-white border-0">
              {caption(t('assets.asset_list.columns.location'))}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset, index) => {
            const checked = selectAssetChecked(state, asset.assetId);
            return (
              <AssetListRow
                asset={asset}
                assetDispatch={assetDispatch}
                checked={checked}
                key={asset.assetId}
                onAssetEdit={onAssetEdit}
                ref={index === assets.length - 1 ? infiniteScrollRef : null}
                selectionMode={isAnySelected}
              />
            );
          })}

          {assetsLoading && <AssetListSkeleton />}
          {!assetsLoading && assets.length === 0 && (
            <TableEmpty
              descriptionKey="assets.asset_list.empty_list_desc"
              infoKey="assets.asset_list.empty_list_info"
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AssetList;
