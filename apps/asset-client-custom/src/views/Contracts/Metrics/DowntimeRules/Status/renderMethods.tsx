import { CatCheckbox, CatMenuItem, CatTypography } from 'catamaran/core';
import { MetricStatus, MetricSubstatus } from 'store/slices/common/types';
import { createStatusId, getStatusState } from './helpers';
import { isArrayNullOrEmpty } from 'utils';
import React from 'react';
import StatusIcon from './Icon';

export const renderRow = (taskStatus: MetricStatus, subStatus?: MetricSubstatus) => (
  <div className="flex align-items-center gap-4" key={subStatus ? subStatus.id : taskStatus.id}>
    <StatusIcon fontSize="small" status={taskStatus.key} />
    <CatTypography variant="caption">
      <b>{taskStatus.name}</b>
      {subStatus && ` / ${subStatus.name}`}
    </CatTypography>
  </div>
);

export const renderAllSelectedRow = (text: string) => (
  <div className="flex align-items-center gap-4">
    <StatusIcon fontSize="small" />
    <CatTypography variant="caption">{text}</CatTypography>
  </div>
);

export const renderRows = (
  taskStatuses: MetricStatus[],
  taskSubStatuses: string[],
  allString: string
) => {
  const totalSubStatuses = taskStatuses.reduce<number>(
    (acc, val) => acc + val.taskSubStatuses.length,
    0
  );
  if (totalSubStatuses === taskSubStatuses.length) {
    return renderAllSelectedRow(allString.toUpperCase());
  }

  return taskStatuses.map((status) => {
    const isAllIncluded =
      !isArrayNullOrEmpty(status.taskSubStatuses) &&
      status.taskSubStatuses.every((subStatus) => taskSubStatuses.includes(subStatus.id));

    if (isAllIncluded) {
      return renderRow(status);
    }

    return status.taskSubStatuses.map((subStatus) => {
      if (taskSubStatuses.includes(subStatus.id)) {
        return renderRow(status, subStatus);
      }

      return <React.Fragment key={subStatus.id} />;
    });
  });
};

export const renderStatusMenuItem = (
  status: MetricStatus,
  selectedSubStatusIds: string[],
  isFirst?: boolean
) => {
  const { selected, indeterminate } = getStatusState(status, selectedSubStatusIds);
  return (
    <CatMenuItem
      key={status.id}
      sx={{ marginBottom: '4px', marginTop: isFirst ? 0 : '10px', padding: '0 16px' }}
      value={createStatusId(status.id)}
    >
      <CatCheckbox
        checked={selected}
        indeterminate={indeterminate}
        style={{ marginRight: '16px' }}
      />
      <CatTypography variant="body1">
        {`${status.name} (${status.taskSubStatuses.length})`}
      </CatTypography>
    </CatMenuItem>
  );
};

export const renderSubStatusMenuItem = (
  subStatus: MetricSubstatus,
  selectedSubStatusIds: string[]
) => (
  <CatMenuItem
    key={subStatus.id}
    sx={{
      '&.Mui-selected': {
        background: 'white'
      },
      marginBottom: '4px',
      padding: '0 16px'
    }}
    value={subStatus.id}
  >
    <CatCheckbox
      checked={selectedSubStatusIds?.includes(subStatus.id)}
      style={{ margin: '0px 16px' }}
    />
    <CatTypography style={{ lineHeight: '15.47px' }} variant="body2">
      {subStatus.name}
    </CatTypography>
  </CatMenuItem>
);
