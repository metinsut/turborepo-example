/* eslint-disable no-param-reassign */
import { Category } from 'store/slices/categories/types';
import { apiWrapper, wrapErrorMessage } from './utils';
import { categories, categoryBrandModels } from './data';
import { removeBrandsIfNecessary } from './brands';
import { removeModelsIfNecessary } from './models';
import _ from 'lodash';
import mock from '../utils/mock';

const fillHasChildCategory = (categoriesToFill: Category[]) => {
  categoriesToFill.forEach((category) => {
    category.hasChildCategory = categories.some((i) => i.parentCategoryId === category.id);
  });

  return categoriesToFill;
};

const fillHasModel = (categoriesToFill: Category[]) => {
  categoriesToFill.forEach((category) => {
    const relations = categoryBrandModels.filter((i) => i.categoryId === category.id);
    if (relations.length === 0) {
      category.hasBrandModel = false;
    } else {
      const relationsWithModel = relations.filter((i) => i.modelId);
      category.hasBrandModel = true;

      if (relationsWithModel.every((i) => i.approved === false)) {
        category.taskStatus = 'Unapproved';
      } else {
        category.taskStatus = 'Approved';
      }
    }
  });

  return categoriesToFill;
};

let lastId = categories[categories.length - 1].id;

const incrementAndGetLastId = () => {
  const incremented = +lastId + 1;
  lastId = incremented.toString();
  return lastId;
};

const currentUserMainCategoriesRegex = /user\/currentuser\/main-categories$/;
apiWrapper(() => {
  mock.onGet(currentUserMainCategoriesRegex).reply(() => {
    const mainCategories = categories.filter((i) => !i.parentCategoryId);

    return [200, mainCategories];
  });
});

const getByIdRegex = /category\/categories\/(\d+)$/;

apiWrapper(() => {
  mock.onGet(getByIdRegex).reply((config) => {
    const id = config.url.match(getByIdRegex)[1];

    let finalCategories = fillHasChildCategory(categories.filter((i) => i.id === id));

    finalCategories = fillHasModel(finalCategories);

    return [200, finalCategories[0]];
  });
});

const getRegex = /category\/categories\?parentCategoryId=(\S+|)$/;

apiWrapper(() => {
  mock.onGet(getRegex).reply((config) => {
    const parentCategory = config.url.match(getRegex)[1];
    const parentCategoryId: string = parentCategory === '' ? null : parentCategory;

    let finalCategories = fillHasChildCategory(
      categories.filter((i) => i.parentCategoryId === parentCategoryId)
    );

    finalCategories = fillHasModel(finalCategories);

    return [200, finalCategories];
  });
});

// Cost Item
apiWrapper(() => {
  mock.onPost('category/categories/basics').reply((config) => {
    const ids: string[] = JSON.parse(config.data);

    let finalCategories = ids.map((i) => categories.find((cat) => cat.id === i));

    finalCategories = fillHasChildCategory(finalCategories);

    finalCategories = fillHasModel(finalCategories);
    return [200, finalCategories];
  });
});

// Cost Item
apiWrapper(() => {
  mock.onPost('/category/categories/parents').reply((config) => {
    const ids: string[] = JSON.parse(config.data);

    let finalCategories = ids.map((i) => getCategoryWithAncestorsMock(i));

    finalCategories = fillHasChildCategory(finalCategories);

    finalCategories = fillHasModel(finalCategories);
    return [200, finalCategories];
  });
});

apiWrapper(() => {
  mock.onPost('category/categories').reply((config) => {
    const category: Category = JSON.parse(config.data);

    if (category.code && categories.some((i) => i.code === category.code)) {
      return [400, wrapErrorMessage('This field should be unique. Enter different code')];
    }

    if (
      categories.some(
        (i) => i.parentCategoryId === category.parentCategoryId && i.name === category.name
      )
    ) {
      return [
        400,
        wrapErrorMessage('This category already exists. Enter a different category name')
      ];
    }

    category.id = incrementAndGetLastId();
    category.hasChildCategory = false;
    category.draft = false;
    category.inMemory = false;
    category.hasBrandModel = false;
    category.taskStatus = 'none';
    categories.push(category);

    return [200, category];
  });
});

// Move logic
const updateMultipleRegex = /category\/categories\/move$/;
apiWrapper(() => {
  mock.onPut(updateMultipleRegex).reply((config) => {
    const data = JSON.parse(config.data);
    const { movingCategoryIds, destinationCategoryId } = data;

    const destinationHasBrand = categoryBrandModels.some(
      (relation) => relation.categoryId === destinationCategoryId
    );

    if (destinationHasBrand) {
      return [
        400,
        wrapErrorMessage(
          'Since there is a model related to this category, you can not move other categories under it'
        )
      ];
    }

    const hasChildCategory = movingCategoryIds.some((id: string) => {
      const category = categories.find((c: Category) => c.id === id);
      return category.hasChildCategory;
    });
    if (hasChildCategory) {
      return [400, wrapErrorMessage('You cant move categories with child categories under them')];
    }

    const destinationCategory = categories.find((c: Category) => c.id === destinationCategoryId);
    const invalidDestination = movingCategoryIds.some((id: string) => {
      const category = categories.find((c: Category) => c.id === id);
      const parentCategory = categories.find((c: Category) => c.id === category.parentCategoryId);
      return (
        parentCategory.parentCategoryId !== destinationCategory.parentCategoryId &&
        category.parentCategoryId !== destinationCategory.parentCategoryId
      );
    });
    if (invalidDestination) {
      return [
        400,
        wrapErrorMessage('You can only move categories at the same level or one level up')
      ];
    }

    const updatedCategories = movingCategoryIds.map((id: string) => {
      const category = categories.find((c) => c.id.toString() === id.toString());
      category.parentCategoryId = destinationCategoryId ?? null;
      return category;
    });

    return [200, updatedCategories];
  });
});

const updateRegex = /category\/categories\/(\S+)$/;
apiWrapper(() => {
  mock.onPut(updateRegex).reply((config) => {
    const category: Category = JSON.parse(config.data);
    const id = config.url.match(updateRegex)[1];
    const categoryItem = categories.find((i) => i.id === id);

    if (categoryItem) {
      if (
        category.code &&
        categories.some((i) => i.code === category.code && i.id !== category.id)
      ) {
        return [400, wrapErrorMessage('This field should be unique. Enter different code')];
      }

      if (
        categories.some(
          (i) =>
            i.parentCategoryId === category.parentCategoryId &&
            i.name === category.name &&
            i.id !== category.id
        )
      ) {
        return [
          400,
          wrapErrorMessage('This category already exists. Enter a different category name')
        ];
      }

      categoryItem.code = category.code;
      categoryItem.name = category.name;
    } else {
      return [404, null];
    }

    return [200, categoryItem];
  });
});

export const flattenAllCategoriesRecursively = (category: Category): Category[] => {
  if (!category) {
    return [];
  }

  let arr = [category];

  const children = categories.filter((i) => i.parentCategoryId === category.id);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const fromChildren = flattenAllCategoriesRecursively(child);
    arr = arr.concat(fromChildren);
  }

  return arr;
};

const removeRegex = /category\/categories/;
apiWrapper(() => {
  mock.onDelete(removeRegex).reply((config) => {
    const data = JSON.parse(config.data);
    const ids = data.categoryIds as string[];
    const categoriesToDelete = ids.map((id) => categories.find((cat) => cat.id === id));
    const allCategoryTree = categoriesToDelete
      .map((i) => flattenAllCategoriesRecursively(i))
      .flat();

    if (
      allCategoryTree.some((category) =>
        categoryBrandModels.some((i) => i.categoryId === category.id && i.hasAsset)
      )
    ) {
      return [
        400,
        wrapErrorMessage('Since there is an asset related to this category, you can not remove it.')
      ];
    }

    // Remove all categories
    _.pullAll(categories, allCategoryTree);

    const allRelations = categoryBrandModels.filter((relation) =>
      allCategoryTree.some((cat) => relation.categoryId === cat.id)
    );

    // Remove all relations
    _.pullAll(categoryBrandModels, allRelations);

    const brandIds = Array.from(new Set(allRelations.map((i) => i.brandId)));

    // Remove brands if necessary
    removeBrandsIfNecessary(brandIds);

    const modelIds = Array.from(
      new Set(allRelations.filter((i) => i.modelId).map((i) => i.modelId))
    );

    // Remove models if necessary
    removeModelsIfNecessary(modelIds);

    return [200, null];
  });
});

export const getCategoryWithAncestorsMock = (id: string): Category => {
  const fillCategoryRecursively = (categoryId: string): Category => {
    if (!categoryId) {
      return null;
    }

    const cat: Category = categories.find((i) => i.id === categoryId);
    cat.parentCategory = fillCategoryRecursively(cat.parentCategoryId);
    return cat;
  };

  return fillCategoryRecursively(id);
};

export const flattenCategoryWithAncestors = (category: Category): Category[] => {
  if (!category) {
    return [];
  }

  if (!category.parentCategory) {
    return [category];
  }

  return [category, ...flattenCategoryWithAncestors(category.parentCategory)];
};

export const getMainCategoryOfChildCategory = (category: Category): Category => {
  if (!category) {
    return null;
  }

  if (!category.parentCategory) {
    return category;
  }

  return getMainCategoryOfChildCategory(category.parentCategory);
};

const getByBrandAndModelRegex =
  /category\/categories\/mainCategory\/(\S+)\/brand\/(\S+)\/model\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(getByBrandAndModelRegex).reply((config) => {
    const mainCategoryId = config.url.match(getByBrandAndModelRegex)[1];
    const brandId = config.url.match(getByBrandAndModelRegex)[2];
    const modelId = config.url.match(getByBrandAndModelRegex)[3];

    const filteredCategoryBrandModels = categoryBrandModels.filter(
      (i) => i.brandId === brandId && i.modelId === modelId
    );

    const categoryList = filteredCategoryBrandModels.map((id) =>
      getCategoryWithAncestorsMock(id.categoryId)
    );

    let finalCategory: Category = null;
    categoryList.forEach((c) => {
      const flattened = flattenCategoryWithAncestors(c);
      if (flattened[flattened.length - 1].id === mainCategoryId) {
        finalCategory = c;
      }
    });
    if (!finalCategory) {
      return [404, wrapErrorMessage('Category not found')];
    }

    return [200, finalCategory];
  });
});

export const addCategory = (category: Category) => {
  if (category.code && categories.some((i) => i.code === category.code)) {
    return [400, wrapErrorMessage('This field should be unique. Enter different code')];
  }

  if (
    categories.some(
      (i) => i.parentCategoryId === category.parentCategoryId && i.name === category.name
    )
  ) {
    return [400, wrapErrorMessage('This category already exists. Enter a different category name')];
  }
  category.inMemory = false;
  category.draft = false;
  categories.push(category);
  return [200, category];
};

export const approveCategory = (categoryId: string) => {
  const category = categories.find((i) => i.id === categoryId);
  category.inMemory = false;

  return category;
};
