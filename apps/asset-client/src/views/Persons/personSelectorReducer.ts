import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Person } from 'store/slices/persons';

const personSelectorAdapter = createEntityAdapter<Person>({});

export const getInitialState = (defaultSelectedPersons: Person[]) =>
  personSelectorAdapter.getInitialState({
    oldSearchText: '',
    page: 1,
    pageSize: 10,
    searchText: '',
    selectedPersons: [...defaultSelectedPersons],
    total: 0
  });

const initialState = getInitialState([]);

const personSelectorSlice = createSlice({
  initialState,
  name: 'personSelector',
  reducers: {
    clearPersonSelector: (draft) => {
      draft.page = initialState.page;
      draft.pageSize = initialState.pageSize;
      draft.searchText = initialState.searchText;

      personSelectorAdapter.removeAll(draft);
    },
    incrementPage: (draft) => {
      draft.page += 1;
    },
    removeAllSelectedPersons: (draft) => {
      draft.selectedPersons = initialState.selectedPersons;
    },
    removeSelectedPersonById: (draft, action: PayloadAction<string>) => {
      const personIndex = draft.selectedPersons.findIndex((p) => p.id === action.payload);
      draft.selectedPersons.splice(personIndex, 1);
    },
    removeSinglePerson: (draft) => {
      draft.selectedPersons = [];
    },
    selectPerson: (draft, action: PayloadAction<Person>) => {
      draft.selectedPersons.push(action.payload);
    },
    selectSinglePerson: (draft, action: PayloadAction<Person>) => {
      draft.selectedPersons = [action.payload];
    },
    setPersons: (
      draft,
      action: PayloadAction<{
        persons: Person[];
        searchText: string;
        total: number;
      }>
    ) => {
      if (draft.oldSearchText !== action.payload.searchText) {
        personSelectorAdapter.setAll(draft, action.payload.persons);
        draft.oldSearchText = action.payload.searchText;
      } else {
        personSelectorAdapter.upsertMany(draft, action.payload.persons);
      }

      draft.total = action.payload.total;
    },
    setSelectedPersons: (draft, action: PayloadAction<Person[]>) => {
      draft.selectedPersons = action.payload;
    },
    updateSearchText: (draft, action: PayloadAction<string>) => {
      draft.searchText = action.payload;
      draft.page = 1;
    }
  }
});

export type PersonSelectorStateShape = ReturnType<typeof personSelectorSlice.reducer>;

export const {
  selectAll: selectAllPersons,
  selectById: selectPersonsById,
  selectIds: selectAllPersonIds,
  selectEntities
} = personSelectorAdapter.getSelectors();

export const selectSelectedPersons = (state: PersonSelectorStateShape) => state.selectedPersons;
export const selectPage = (state: PersonSelectorStateShape) => state.page;
export const selectPageSize = (state: PersonSelectorStateShape) => state.pageSize;
export const selectSearchText = (state: PersonSelectorStateShape) => state.searchText;
export const selectTotalNumberOfPersons = (state: PersonSelectorStateShape) => state.total;

export const { reducer: personSelectorReducer } = personSelectorSlice;
export const {
  clearPersonSelector,
  setPersons,
  incrementPage,
  removeAllSelectedPersons,
  removeSelectedPersonById,
  removeSinglePerson,
  selectPerson,
  setSelectedPersons,
  selectSinglePerson,
  updateSearchText
} = personSelectorSlice.actions;
