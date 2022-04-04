import { CategoryTask, FilterDateType } from '../store/slices/categoryTasks';
import { addBrand, approveBrand } from './brands';
import {
  addCategory,
  approveCategory,
  flattenCategoryWithAncestors,
  getCategoryWithAncestorsMock,
  getMainCategoryOfChildCategory
} from './categories';
import { addModel, approveModel } from './models';
import { apiWrapper, wrapErrorMessage } from './utils';
import { brands, categories, categoryBrandModels, models, tasks } from './data';
import mock from '../utils/mock';

const tasksWithFilterRegex = /category\/tasks\?showCompleted=(\S+)&dateFilter=(\S+)/;

apiWrapper(() => {
  mock.onGet(tasksWithFilterRegex).reply((config) => {
    const queries = config.url.match(tasksWithFilterRegex);
    const showCompleted = queries[1] === 'true';

    const dateFilter = queries[2] as FilterDateType;
    const limitDate = dateFilterToDateLimit(dateFilter);

    const result = [
      ...tasks.filter(
        (task) =>
          (showCompleted ? task.status === 'Approved' : task.status === 'Unapproved') &&
          (dateFilter === 'all' || new Date(task.createdDate) > limitDate)
      )
    ];

    result.forEach((task) => {
      // eslint-disable-next-line no-param-reassign
      task.category = getCategoryWithAncestorsMock(task.categoryId);

      // eslint-disable-next-line no-param-reassign
      task.brand = brands.find((i) => i.id === task.brandId);

      // eslint-disable-next-line no-param-reassign
      task.model = models.find((i) => i.id === task.modelId);
    });

    return [200, result];
  });
});

const taskIdRegex = /category\/tasks\/(\S+)/;
apiWrapper(() => {
  mock.onGet(taskIdRegex).reply((config) => {
    const id = config.url.match(taskIdRegex)[1];
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return [404, wrapErrorMessage('Task is not found')];
    }

    task.category = getCategoryWithAncestorsMock(task.categoryId);
    task.brand = brands.find((i) => i.id === task.brandId);
    task.model = models.find((i) => i.id === task.modelId);

    return [200, task];
  });
});

const updateRegex = /category\/tasks\/(\S+)/;

apiWrapper(() => {
  mock.onPut(updateRegex).reply((config) => {
    const newTask: CategoryTask = JSON.parse(config.data);
    const id = config.url.match(updateRegex)[1];
    const existingTask = tasks.find((task) => task.id === id);

    const existingBrandRelation = categoryBrandModels.find(
      (i) =>
        i.categoryId === existingTask.category.id &&
        i.brandId === existingTask.brand.id &&
        !i.modelId
    );

    const existingModelRelation = categoryBrandModels.find(
      (i) =>
        i.modelId === existingTask.model.id &&
        i.categoryId === existingTask.category.id &&
        i.brandId === existingTask.brand.id
    );

    if (!existingTask) {
      return [400, wrapErrorMessage('Task not found')];
    }

    const categoriesByBrandAndModel = categoryBrandModels.filter(
      (i) => i.modelId === newTask.model.id && i.brandId === newTask.brand.id && i.approved
    );

    const taskMainCategory = getMainCategoryOfChildCategory(newTask.category);

    let existingMainCategoryError = null;
    categoriesByBrandAndModel.forEach((cbm) => {
      const category = categories.find((i) => i.id === cbm.categoryId);
      const existingMainCategory = getMainCategoryOfChildCategory(category);

      if (taskMainCategory.id === existingMainCategory.id) {
        existingMainCategoryError = [
          400,
          wrapErrorMessage(
            `This brand model already exist under main category ${existingMainCategory.name}`
          )
        ];
      }
    });

    if (existingMainCategoryError) {
      return existingMainCategoryError;
    }
    existingTask.status = newTask.status;
    if (newTask.status === 'Approved') {
      if (existingTask.category.id !== newTask.category.id) {
        const taskCategories = flattenCategoryWithAncestors(newTask.category);
        const inMemoryCategories = taskCategories.filter((c) => c.inMemory);

        const results = inMemoryCategories.map((category) => addCategory(category));

        const error = results.find((r) => r[0] !== 200);
        if (error) {
          return error;
        }

        const newCategories = taskCategories.filter((c) => c.inMemory);
        newCategories.forEach((c) => approveCategory(c.id));

        existingTask.categoryId = newTask.categoryId;
        existingTask.category = getCategoryWithAncestorsMock(existingTask.categoryId);
      }

      if (newTask.model.inMemory) {
        newTask.model = addModel(newTask.model);
      }

      existingTask.model = newTask.model;
      existingTask.modelId = newTask.model.id;

      if (existingTask.model.isNew) {
        existingTask.model = approveModel(existingTask.model.id);
      }

      if (newTask.brand.inMemory) {
        newTask.brand = addBrand(newTask.brand);
      }

      existingTask.brand = newTask.brand;
      existingTask.brandId = newTask.brand.id;

      if (existingTask.brand.isNew) {
        existingTask.brand = approveBrand(existingTask.brand.id);
      }

      if (existingBrandRelation) {
        const index = categoryBrandModels.indexOf(existingBrandRelation);
        categoryBrandModels.splice(index, 1);
      }

      if (existingModelRelation) {
        const index = categoryBrandModels.indexOf(existingModelRelation);
        categoryBrandModels.splice(index, 1);
      }

      categoryBrandModels.push({
        brandId: existingTask.brand.id,
        categoryId: existingTask.category.id,
        modelId: null
      });

      categoryBrandModels.push({
        approved: true,
        brandId: existingTask.brand.id,
        categoryId: existingTask.category.id,
        hasAsset: true,
        modelId: existingTask.model.id
      });

      return [200, existingTask];
    }
    // TODO: Handle reject operations

    return [200, existingTask];
  });
});

const dateFilterToDateLimit = (dateFilter: FilterDateType) => {
  const limit = new Date();
  const removeDayFromDate = (date: Date, day: number) => date.setDate(date.getDate() - day);

  switch (dateFilter) {
    case 'day':
      removeDayFromDate(limit, 1);
      break;
    case 'week':
      removeDayFromDate(limit, 7);
      break;
    case 'month':
      removeDayFromDate(limit, 30);
      break;
    case 'all':
      removeDayFromDate(limit, 30);
      break;
    default:
      return undefined;
  }

  return limit;
};
