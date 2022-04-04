import { AnyAction } from '@reduxjs/toolkit';
import { AssetListItem } from 'store/slices/asset/detail/types';
import { Box, CatCheckbox, CatTooltip, CatTypography } from 'catamaran/core';
import { TableCell, TableRow, styled } from 'catamaran/core/mui';
import { checkAsset } from './assetsReducer';
import { useTranslation } from 'react-i18next';
import CalibrationOkIcon from 'catamaran/icons/CalibrationOk';
import LocationView from 'views/Assets/List/LocationView';
import MaintenanceOkIcon from 'catamaran/icons/MaintenanceOk';
import React from 'react';
import StatusIcon from 'views/Common/AssetStatus/StatusIcon';

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    cursor: 'pointer'
  },
  opacity: 0.8
}));

type Props = {
  asset: AssetListItem;
  assetDispatch: React.Dispatch<AnyAction>;
  checked: boolean;
  className?: string;
  onAssetEdit?: (id: string) => void;
  selectionMode?: boolean;
};

function AssetListRow(props: Props, ref: React.Ref<any>) {
  const { t } = useTranslation();
  const { asset, assetDispatch, checked, className, onAssetEdit, selectionMode } = props;

  const handleCheckboxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    assetDispatch(checkAsset(asset.assetId));
  };

  const handleRowClick = () => {
    if (selectionMode) {
      assetDispatch(checkAsset(asset.assetId));
    } else {
      onAssetEdit(asset.assetId);
    }
  };

  return (
    <StyledTableRow
      className={className}
      hover
      onClick={handleRowClick}
      ref={ref}
      role="checkbox"
      selected={checked}
    >
      <TableCell className="border-0 p4">
        <CatCheckbox
          checked={checked}
          onClick={(event) => handleCheckboxClick(event)}
          paddingSize="medium"
        />
      </TableCell>
      <TableCell className="border-bottom-0" style={{ padding: '0 0 0 16px' }}>
        <Box flex flexDirection="row">
          <StatusIcon statusType={asset.assetStatus} />
          <CatTooltip title={t('assets.status_tooltip.maintenance_completed')}>
            <div>
              <MaintenanceOkIcon color="green" contained={false} hoverable={false} />
            </div>
          </CatTooltip>
          <CatTooltip title={t('assets.status_tooltip.calibration_completed')}>
            <div>
              <CalibrationOkIcon color="green" contained={false} hoverable={false} />
            </div>
          </CatTooltip>
        </Box>
      </TableCell>
      <TableCell className="border-bottom-0" component="th" scope="row">
        <CatTypography variant="body2">{asset.code}</CatTypography>
      </TableCell>
      <TableCell className="border-bottom-0">
        <CatTypography variant="body2">{asset.categoryName}</CatTypography>
      </TableCell>
      <TableCell className="border-bottom-0">
        <CatTypography variant="body2">{asset.brandName}</CatTypography>
      </TableCell>
      <TableCell className="border-bottom-0">
        <CatTypography variant="body2">{asset.modelName}</CatTypography>
      </TableCell>
      <TableCell className="border-bottom-0">
        <LocationView branchName={asset.branchName} locationFullName={asset.locationFullName} />
      </TableCell>
    </StyledTableRow>
  );
}

export default React.forwardRef(AssetListRow);
