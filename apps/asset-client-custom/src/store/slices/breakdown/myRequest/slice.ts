import { MyRequestInformation } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ResolveStatuses } from 'store/slices/tasks/common/type';
import { initialState } from './data';

const myRequestSlice = createSlice({
  initialState,
  name: 'myRequest',
  reducers: {
    clearDraft: (draft) => {
      draft.draft = { ...initialState.draft };
    },
    setDraft: (draft, action: PayloadAction<MyRequestInformation>) => {
      draft.draft = action.payload;
    },
    setResolveStatus: (draft, action: PayloadAction<ResolveStatuses>) => {
      draft.draft.taskStatusInformation.resolveStatus = action.payload;
    }
  }
});

export default myRequestSlice.reducer;

export const { clearDraft, setDraft, setResolveStatus } = myRequestSlice.actions;
