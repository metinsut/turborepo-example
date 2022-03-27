import { AppThunk, RootState } from 'RootTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import i18n from 'utils/i18n';

type SnackbarTypes = 'error' | 'warning' | 'info' | 'success';

export interface SnackbarState {
  message?: string;
  type: SnackbarTypes;
  autoHideDuration: number;
  autoHide: boolean;
}

interface StateShape {
  snackbars: SnackbarState[];
  sidebarOpen: boolean;
}

const initialSnackbar: SnackbarState = {
  autoHide: true,
  autoHideDuration: 2400,
  message: '',
  type: 'error'
};

const initialState: StateShape = {
  sidebarOpen: false,
  snackbars: []
};

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    removeSnackbarFromQueue: (draft) => {
      draft.snackbars.pop();
    },
    showSnackbarMessage: (draft, action: PayloadAction<Partial<SnackbarState>>) => {
      draft.snackbars = [
        ...draft.snackbars,
        {
          ...initialSnackbar,
          ...action.payload
        }
      ];
    },
    toggleSidebar: (draft, { payload }: PayloadAction<boolean>) => {
      draft.sidebarOpen = payload;
    }
  }
});

export const showSnackbarMessage =
  (
    message: string,
    type: SnackbarTypes,
    options?: {
      autoHide?: boolean;
      delay?: boolean;
    }
  ): AppThunk<void> =>
  (dispatch) => {
    const { autoHide = true, delay = false } = options ?? {};
    const delayTime = delay ? 500 : 0;
    setTimeout(() => {
      dispatch(
        appSlice.actions.showSnackbarMessage({
          autoHide,
          message,
          type
        })
      );
    }, delayTime);
  };

export const showAddSuccessSnackbar = (): AppThunk<void> => (dispatch) => {
  dispatch(showSnackbarMessage(i18n.t('snackbar.add_success_message'), 'success'));
};

export const showDeleteSuccessSnackbar = (): AppThunk<void> => (dispatch) => {
  dispatch(showSnackbarMessage(i18n.t('snackbar.delete_success_message'), 'warning'));
};

export const showUpdateSuccessSnackbar =
  (delay?: boolean): AppThunk<void> =>
  (dispatch) => {
    dispatch(showSnackbarMessage(i18n.t('snackbar.update_success_message'), 'success', { delay }));
  };

export const showSaveSuccessSnackbar = (): AppThunk<void> => (dispatch) => {
  dispatch(showSnackbarMessage(i18n.t('snackbar.save_success_message'), 'success'));
};
export const removeSnackbarFromQueue = (): AppThunk<void> => (dispatch) => {
  dispatch(appSlice.actions.removeSnackbarFromQueue());
};

export const selectSnackbarStates = (state: RootState) => state.application.snackbars;

export const selectSidebarOpen = (state: RootState) => state.application.sidebarOpen;

export const { toggleSidebar } = appSlice.actions;

export default appSlice.reducer;
