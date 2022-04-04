import { AppThunk, RootState } from 'RootTypes';
import { PagedRequestOptions, PagedResult, apiCaller } from 'store/common';
import { PlanType } from './plans/types';
import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { isArrayNullOrEmpty } from 'utils';
import axios from 'utils/axiosUtils';

export interface Person {
  id?: string;
  firstName?: string;
  lastName?: string;
  assetRole?: string;
  role?: RoleType;
  email?: string;
  jobTitle?: string;
  phoneNumber?: string;
  username?: string;
  isActive?: true;
}

export type RoleType =
  | 'GeneralAdmin'
  | 'Admin'
  | 'Executive'
  | 'Manager'
  | 'Technician'
  | 'RequestOnly'
  | string;

export type SearchByAssetIdRequest = PagedRequestOptions & {
  assetId?: string;
  fullName?: string;
};

export type SearchByBranchIdsRequest = PagedRequestOptions & {
  branchIds?: string[];
  fullName?: string;
  userIds?: string[];
};

export type SearchByAuthorizationRequest = PagedRequestOptions & {
  branches?: string[];
  fullName?: string;
  mainCategories: string[];
  roles: string[];
  workType?: PlanType;
  userIds?: string[];
};

const personsAdapter = createEntityAdapter<Person>();

type PersonState = {};

const initialState: PersonState = {};

const personsSlice = createSlice({
  initialState: personsAdapter.getInitialState(initialState),
  name: 'persons',
  reducers: {
    upsertPerson: personsAdapter.upsertOne,
    upsertPersons: personsAdapter.upsertMany
  }
});

export const getPersonsByIds =
  (ids: string[]): AppThunk<Promise<Person[]>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.post<Person[]>('/user/users/search/by-ids', ids);
    const data = await dispatch(apiCaller(requestBuilder));
    dispatch(personsSlice.actions.upsertPersons(data));
    return data;
  };

export const getPersonById =
  (id: string): AppThunk<Promise<Person>> =>
  async (dispatch) => {
    // TODO: This might require 404 exception, watch it
    const requestBuilder = () => axios.get<Person>(`user/users/${id}`);
    const data = await dispatch(apiCaller(requestBuilder));
    dispatch(personsSlice.actions.upsertPerson(data));
    return data;
  };

export const getPersonsByIdsIfNecessary =
  (ids: string[]): AppThunk<Promise<Person[]>> =>
  async (dispatch, getState) => {
    const state = getState();
    let persons = selectPersonsByIds(state, ids);
    if (isArrayNullOrEmpty(persons) || persons.filter((i) => !i).length > 0) {
      const requestBuilder = () => axios.post<Person[]>('/user/users/search/by-ids', ids);
      persons = await dispatch(apiCaller(requestBuilder));
      dispatch(personsSlice.actions.upsertPersons(persons));
    }

    return persons;
  };

export const searchUsersByBranches =
  (
    branchIds: string[],
    searchText: string,
    options: PagedRequestOptions
  ): AppThunk<Promise<PagedResult<Person>>> =>
  async (dispatch) => {
    const requestObject: SearchByBranchIdsRequest = {
      branchIds,
      fullName: searchText,
      ...options
    };

    const requestBuilder = () =>
      axios.post<PagedResult<Person>>('/user/users/search/by-branches', requestObject);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(personsSlice.actions.upsertPersons(data.items.slice()));
    return data;
  };

export const searchUsersByAuthorizations =
  (
    branchIds: string[],
    mainCategoryId: string,
    planType: PlanType,
    searchText: string,
    options: PagedRequestOptions
  ): AppThunk<Promise<PagedResult<Person>>> =>
  async (dispatch) => {
    const requestObject: SearchByAuthorizationRequest = {
      branches: branchIds,
      fullName: searchText,
      mainCategories: [mainCategoryId],
      roles: [],
      userIds: [],
      workType: planType,
      ...options
    };
    const requestBuilder = () =>
      axios.post<PagedResult<Person>>('/user/users/search/by-authorizations', requestObject);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(personsSlice.actions.upsertPersons(data.items.slice()));
    return data;
  };

export const getPersonAvatar =
  (personId: string): AppThunk<Promise<string>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<string>(`/user/users/${personId}/photo`);
    const data = await dispatch(apiCaller(requestBuilder));

    return data;
  };

export const {
  selectAll: selectAllPersons,
  selectById: selectPersonById,
  selectIds: selectAllPersonIds,
  selectEntities
} = personsAdapter.getSelectors<RootState>((state) => state.persons);

export default personsSlice.reducer;

export const selectPersonsByIds = createSelector(
  selectEntities,
  (state: RootState, ids: string[]) => ids,
  (entities, ids) => ids?.map((id) => entities[id]).filter((i) => !!i) ?? []
);

export const searchAuthorizedUsersByAssetId =
  (
    assetId: string,
    searchText: string,
    options: PagedRequestOptions
  ): AppThunk<Promise<PagedResult<Person>>> =>
  async (dispatch) => {
    const requestObject: SearchByAssetIdRequest = {
      assetId,
      fullName: searchText,
      ...options
    };

    const requestBuilder = () =>
      axios.post<PagedResult<Person>>(
        '/breakdown/breakdowns/assignable-persons/search',
        requestObject
      );
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(personsSlice.actions.upsertPersons(data.items.slice()));
    return data;
  };

export const { upsertPersons, upsertPerson } = personsSlice.actions;
