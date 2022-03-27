import { AppThunk } from 'RootTypes';
import { FORMS } from 'routes/constant-route';
import { Form, FormField, FormWithFields, SectionTypes } from './types';
import { apiCaller } from 'store/common';
import { history } from 'utils/history';
import { setAllForms, setCurrentFormFields, setMainCategory } from './slice';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from 'store/slices/application';
import axios from 'utils/axiosUtils';

export const getForms = (): AppThunk => async (dispatch) => {
  const requestBuilder = () => axios.get<Form[]>('/gw/registration/forms');
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(setAllForms(data));
};

export const initializeFormBuilderDetailPage =
  (formId: string): AppThunk =>
  async (dispatch) => {
    try {
      await dispatch(getFormFields(formId));
    } catch (error) {
      history.push(FORMS);
    }
  };

const getFormFields =
  (formId: string): AppThunk<Promise<FormWithFields>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<FormWithFields>(`/gw/registration/forms/${formId}`);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(setCurrentFormFields(data.fields));
    dispatch(setMainCategory({ id: data.mainCategory.id, name: data.mainCategory.name }));
    return data;
  };

export const getFormFieldsByMainCategoryId =
  (mainCategoryId: string): AppThunk<Promise<FormField[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<FormField[]>(`/registration/forms/main-category/${mainCategoryId}/fields`);
    const data = await dispatch(apiCaller(requestBuilder));

    return data;
  };

export const handleFieldAction =
  (
    postType: 'add' | 'edit',
    newField: FormField,
    formId: string,
    field: SectionTypes
  ): AppThunk<Promise<FormField>> =>
  async (dispatch) => {
    if (postType === 'add') {
      const postFieldBody = {
        ...newField,
        section: field
      };
      const requestBuilder = () =>
        axios.post<FormField>(`registration/forms/${formId}/fields`, postFieldBody);
      const data = await dispatch(apiCaller(requestBuilder));
      await dispatch(getFormFields(formId));
      dispatch(showAddSuccessSnackbar());
      return data;
    }
    const requestBuilder = () =>
      axios.put<FormField>(`registration/forms/${formId}/fields/${newField.id}`, newField);
    const data = await dispatch(apiCaller(requestBuilder));
    await dispatch(getFormFields(formId));
    dispatch(showUpdateSuccessSnackbar());
    return data;
  };

export const deleteFormField =
  (formId: string, fieldId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete<FormField>(`registration/forms/${formId}/fields/${fieldId}`);
    await dispatch(apiCaller(requestBuilder));
    await dispatch(getFormFields(formId));
    dispatch(showDeleteSuccessSnackbar());
  };

export const orderFormFields =
  (formId: string, section: SectionTypes, fields: FormField[]): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.post(`registration/forms/${formId}/order-fields`, {
        fields: fields.map((f) => f.id),
        section
      });

    try {
      await dispatch(apiCaller(requestBuilder));
    } catch (error) {
      await dispatch(getFormFields(formId));
    }
  };
