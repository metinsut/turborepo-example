import { combineReducers } from '@reduxjs/toolkit';
import applicationReducer from './slices/application';
import assetImportsReducer from './slices/imports/asset/slice';
import assetsReducer from './slices/asset';
import branchesReducer from './slices/branches';
import brandsReducer from './slices/brands/slice';
import brandsv2Reducer from './slices/brandsv2/slice';
import breakdownReducer from './slices/breakdown';
import categoriesReducer from './slices/categories/slice';
import categoriesv2Reducer from './slices/categoriesv2/slice';
import categoryImportsReducer from './slices/imports/category/slice';
import categoryTasksReducer from './slices/categoryTasks';
import contractPlanReducer from './slices/contractplans';
import contractsReducer from './slices/contracts/slice';
import formsReducer from './slices/assetConfiguration/forms/slice';
import locationFilterReducer from './slices/location/locationFilter/slice';
import locationLevelsReducer from './slices/location/locationLevels/slice';
import locationsReducer from './slices/location/locations/slice';
import metricsConfigurationReducer from './slices/metricsConfiguration/metricsConfiguration';
import modelsReducer from './slices/models';
import modelsv2Reducer from './slices/modelsv2/slice';
import personsReducer from './slices/persons';
import plansReducer from './slices/plans/slice';
import sessionReducer from './slices/session';
import taskConfigurationReducer from './slices/taskConfiguration';
import tasksReducer from './slices/tasks/tasks';
import usersReducer from './slices/users';

const rootReducer = combineReducers({
  application: applicationReducer,
  assetImports: assetImportsReducer,
  assets: assetsReducer,
  branches: branchesReducer,
  brands: brandsReducer,
  brandsv2: brandsv2Reducer,
  breakdowns: breakdownReducer,
  categories: categoriesReducer,
  categoriesv2: categoriesv2Reducer,
  categoryImports: categoryImportsReducer,
  categoryTasks: categoryTasksReducer,
  contractPlan: contractPlanReducer,
  contracts: contractsReducer,
  forms: formsReducer,
  locationFilter: locationFilterReducer,
  locationLevels: locationLevelsReducer,
  locations: locationsReducer,
  metricsConfiguration: metricsConfigurationReducer,
  models: modelsReducer,
  modelsv2: modelsv2Reducer,
  persons: personsReducer,
  plans: plansReducer,
  session: sessionReducer,
  taskConfiguration: taskConfigurationReducer,
  tasks: tasksReducer,
  users: usersReducer
});

export default rootReducer;
