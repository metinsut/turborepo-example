import { CatCheckbox, CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { CircularProgress } from 'catamaran/core/mui';
import { MetricStatus } from 'store/slices/common/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import StatusIcon from 'views/Tasks/Breakdowns/Common/StatusIcon';

type Props = {
  availableStatuses: MetricStatus[];
  statusIds: string[];
  onChange: (statusIds?: string[]) => void;
};

type RenderStatusItem = {
  id: string;
  indeterminate?: boolean;
  checked: boolean;
  key?: string;
  isMainStatus?: boolean;
  name: string;
  substatusIds?: string[];
  parentName?: string;
  showOnView: boolean;
};

export const renderReadyStatusesList = (availableStatuses: MetricStatus[], statusIds: string[]) => {
  const list = availableStatuses?.reduce((acc: RenderStatusItem[], status: MetricStatus) => {
    const subItemLength = status.taskSubStatuses.length;
    const selectedSubItemLength = status.taskSubStatuses.filter((status: any) =>
      statusIds?.includes(status.id)
    ).length;

    const indeterminate = subItemLength !== selectedSubItemLength && selectedSubItemLength > 0;
    const allChildrenChecked = subItemLength === selectedSubItemLength && subItemLength > 0;
    const checked = statusIds?.includes(status.id) || allChildrenChecked;

    acc.push({
      checked: checked && !indeterminate,
      id: status.id,
      indeterminate,
      isMainStatus: true,
      key: status.key,
      name: status.name,
      showOnView: checked,
      substatusIds: [...status.taskSubStatuses.map((status) => status.id)]
    });
    if (status.taskSubStatuses.length > 0) {
      const subItems: RenderStatusItem[] = status.taskSubStatuses.map((subStatus) => ({
        checked: statusIds?.includes(subStatus.id),
        id: subStatus.id,
        key: status.key,
        name: subStatus.name,
        parentName: status.name,
        showOnView: statusIds?.includes(subStatus.id) && !allChildrenChecked
      }));

      acc.push(...subItems);
    }
    return acc;
  }, []);

  return list;
};

const StatusMultiSelector = (props: Props) => {
  const { availableStatuses, statusIds = [], onChange } = props;

  const { t } = useTranslation();

  const statusesList = useMemo(
    () => renderReadyStatusesList(availableStatuses, statusIds),
    [availableStatuses, statusIds]
  );

  const renderRows = () => {
    const filteredStatusesList = statusesList?.filter((status) => status.showOnView);

    return filteredStatusesList?.map((filteredStatus) => renderRow(filteredStatus));
  };

  const renderRow = ({ id, name, key, parentName }: any) => (
    <div className="flex align-items-center gap-4" key={id}>
      <StatusIcon fontSize="small" statusType={key} />
      <CatTypography variant="caption">
        <b className="mr4">{parentName || name}</b>
        {parentName && name}
      </CatTypography>
    </div>
  );

  const handleChange = (event: any) => {
    const statusIds = event.target.value as string[];
    let finalStatusIds = [...statusIds];

    // If we have a main status that contain substatus and it was clicked, it should be return array.
    const mainStatusHasSubstatus = statusesList.find(
      (status) => statusIds.includes(status.id) && status.substatusIds?.length > 0
    );

    if (mainStatusHasSubstatus) {
      const { id, substatusIds } = mainStatusHasSubstatus;
      // Eliminate main status
      finalStatusIds = finalStatusIds.filter((status: any) => status !== id);

      const isAlltaskSubStatusesChecked = substatusIds.every((status: any) =>
        finalStatusIds.includes(status)
      );

      if (isAlltaskSubStatusesChecked) {
        // Remove all taskSubStatuses
        finalStatusIds = finalStatusIds.filter((status: any) => !substatusIds.includes(status));
      } else {
        // Add all taskSubStatuses
        finalStatusIds = Array.from(new Set([...finalStatusIds, ...substatusIds]));
      }
    }

    onChange(finalStatusIds);
  };

  const loading = !availableStatuses;
  const valid = statusIds?.length > 0;

  return (
    <CatSelect
      className="ml12"
      densed
      disabled={loading}
      displayEmpty
      endAdornment={
        loading && (
          <div className="flex align-items-center bg-darkgrey mr16">
            <CircularProgress color="inherit" size="12px" />
          </div>
        )
      }
      error={!valid && !loading}
      fullWidth={false}
      MenuProps={{
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        sx: { maxHeight: '360px' },
        transformOrigin: {
          horizontal: 'left',
          vertical: 'top'
        }
      }}
      multiple
      onChange={handleChange}
      renderValue={(selected) => {
        const taskSubstatuses = selected as string[];
        if (loading) {
          return t('common.loading');
        }

        if (taskSubstatuses.length === 0) {
          return t('common.dropdown_generic_hint');
        }
        return renderRows();
      }}
      sx={{
        '& .MuiSelect-select': {
          display: 'grid',
          gridGap: '12px',
          minWidth: '216px'
        }
      }}
      value={statusIds ?? []}
    >
      {statusesList?.map((status) => (
        <CatMenuItem
          key={status.id}
          sx={{
            '&.Mui-selected': {
              background: 'white'
            },
            padding: status.isMainStatus ? '8px 16px' : '2px 44px'
          }}
          value={status.id}
        >
          <CatCheckbox
            checked={status.checked}
            indeterminate={status.indeterminate}
            style={{ marginRight: '12px', padding: '4px' }}
          />
          <CatTypography variant={status.isMainStatus ? 'body1' : 'body2'}>
            {status.name}
          </CatTypography>
        </CatMenuItem>
      ))}
    </CatSelect>
  );
};

export default StatusMultiSelector;
