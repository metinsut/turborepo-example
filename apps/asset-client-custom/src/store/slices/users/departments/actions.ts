import { AppThunk } from 'RootTypes';
import { Department } from './types';
import { apiCaller } from 'store/common';
import {
  removeDepartment,
  setInitialDepartmentForm,
  upsertDepartment,
  upsertDepartments
} from './slice';
import { selectDepartment, selectDepartmentById } from './selectors';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from 'store/slices/application';
import axios from 'utils/axiosUtils';
import departmentValidator from 'helpers/validations/User/DepartmentValidator';

export const getDepartments = (): AppThunk<Promise<Department[]>> => async (dispatch) => {
  const requestBuilder = () => axios.get<Department[]>('user/departments');
  const departments = await dispatch(apiCaller(requestBuilder));

  dispatch(upsertDepartments(departments));
  return departments;
};

export const initializeDepartmentModal =
  (departmentId: string): AppThunk =>
  async (dispatch, getState) => {
    const department = selectDepartmentById(getState(), departmentId);

    const finalDepartment = department ?? { id: departmentId };
    dispatch(setInitialDepartmentForm({ ...finalDepartment }));
  };

export const checkDepartmentExistsFromStore =
  (): AppThunk<Promise<boolean>> => async (dispatch, getState) => {
    const draftDepartment = selectDepartment(getState());

    return !!draftDepartment.id;
  };

export const createDepartment = (): AppThunk<Promise<Department>> => async (dispatch, getState) => {
  const department = getState().users.departments.draftDepartment;

  const requestBuilder = () => axios.post<Department>('user/departments/', department);
  const finalDepartment = await dispatch(apiCaller(requestBuilder));
  dispatch(upsertDepartment(finalDepartment));
  dispatch(showAddSuccessSnackbar());

  return finalDepartment;
};

export const updateDepartment = (): AppThunk<Promise<Department>> => async (dispatch, getState) => {
  const department = getState().users.departments.draftDepartment;

  const requestBuilder = () =>
    axios.put<Department>(`user/departments/${department.id}`, department);
  const finalDepartment = await dispatch(apiCaller(requestBuilder));
  dispatch(upsertDepartment(finalDepartment));
  dispatch(showUpdateSuccessSnackbar());

  return finalDepartment;
};

export const deleteDepartment =
  (departmentId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete<Department>(`user/departments/${departmentId}`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(removeDepartment(departmentId));
    dispatch(showDeleteSuccessSnackbar());
  };

export const validateDepartment = (department: Department): boolean => {
  const errors = departmentValidator(department);
  const anyInvalid = Object.values(errors).some((error) => error !== undefined);
  return !anyInvalid;
};
