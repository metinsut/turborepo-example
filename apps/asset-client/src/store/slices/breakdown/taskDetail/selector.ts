import { RootState } from 'RootTypes';

export const selectDraftTaskDetail = (state: RootState) => state.breakdowns.taskDetail.draft;
export const selectBreakdownId = (state: RootState) =>
  state.breakdowns.taskDetail.draft.breakdownInformation.id;
export const selectBreakdownTypeId = (state: RootState) =>
  state.breakdowns.taskDetail.draft.breakdownInformation.breakdownTypeId;
export const selectBreakdownAssetId = (state: RootState) =>
  state.breakdowns.taskDetail.draft.assetInformation.id;
export const selectResponsiblePersonId = (state: RootState) =>
  state.breakdowns.taskDetail.draft.taskStatusInformation.responsiblePerson?.id ?? undefined;
export const selectAssistantPersonIds = (state: RootState) =>
  state.breakdowns.taskDetail.draft.taskStatusInformation.assistantPersonnels?.map((i) => i.id) ??
  [];
export const selectBreakdownTypeName = (state: RootState) =>
  state.breakdowns.taskDetail.draft.breakdownInformation.breakdownType;
export const selectTaskHistoryItems = (state: RootState) =>
  state.breakdowns.taskDetail.draft.history.items;
export const selectTaskHistoryCurrentPage = (state: RootState) =>
  state.breakdowns.taskDetail.draft.history.currentPage;
export const selectTaskHistorySize = (state: RootState) =>
  state.breakdowns.taskDetail.draft.history.size;
export const selectTaskHistoryTotal = (state: RootState) =>
  state.breakdowns.taskDetail.draft.history.total;
export const selectTaskHistoryPageCount = (state: RootState) => {
  const { size } = state.breakdowns.taskDetail.draft.history;
  const { total } = state.breakdowns.taskDetail.draft.history;
  const pageCount = total === 0 ? 0 : Math.ceil(total / size);
  return pageCount;
};
