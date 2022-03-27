import { Form, FormField } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialFormState } from './data';

const formsSlice = createSlice({
  initialState: initialFormState,
  name: 'forms',
  reducers: {
    setAllForms: (draft, action: PayloadAction<Form[]>) => {
      draft.forms = action.payload;
    },
    setCurrentFormFields: (draft, action: PayloadAction<FormField[]>) => {
      draft.currentForm.fields = action.payload;
    },
    setMainCategory: (draft, action: PayloadAction<{ id: string; name: string }>) => {
      draft.currentForm.mainCategory.id = action.payload.id;
      draft.currentForm.mainCategory.name = action.payload.name;
    }
  }
});

export default formsSlice.reducer;

export const { setAllForms, setCurrentFormFields, setMainCategory } = formsSlice.actions;
