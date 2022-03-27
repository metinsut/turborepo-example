import { ImageState } from 'store/slices/categoryTasks';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState: ImageState = {
  file: null,
  imageStatus: 'idle'
};

const imageSelectorSlice = createSlice({
  initialState,
  name: 'imageSelector',
  reducers: {
    changePhoto: (draft, action: PayloadAction<File>) => {
      draft.imageStatus = 'changed';
      draft.file = action.payload;
    },
    deletePhoto: (draft, action: PayloadAction<string>) => {
      const { payload: previousPhotoPath } = action;
      draft.file = null;

      if (previousPhotoPath) {
        draft.imageStatus = 'deleted';
      } else {
        draft.imageStatus = 'idle';
      }
    }
  }
});

export const { reducer: imageSelectorReducer } = imageSelectorSlice;
export const { changePhoto, deletePhoto } = imageSelectorSlice.actions;
