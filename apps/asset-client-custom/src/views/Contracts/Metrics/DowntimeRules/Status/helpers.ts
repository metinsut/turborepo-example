import { MetricStatus } from 'store/slices/common/types';

export const createStatusId = (id: string) => `status:${id}`;
export const isStatusId = (id: string) => id.startsWith('status:');
export const getIdFromStatusId = (statusId: string) => statusId.substr(7);

export const getStatusState = (status: MetricStatus, selectedSubStatusIds: string[]) => {
  const selectedSubStatuses = status.taskSubStatuses.filter((s) =>
    selectedSubStatusIds?.includes(s.id)
  );
  const selected =
    selectedSubStatuses.length > 0 && selectedSubStatuses.length === status.taskSubStatuses.length;
  const indeterminate = !selected && selectedSubStatuses.length > 0;
  return { indeterminate, selected };
};
