import { Model } from '../store/slices/models';
import { apiWrapper, wrapErrorMessage } from './utils';
import { categories, categoryBrandModels, models } from './data';
import { temporaryModelId } from 'store/common';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import mock from '../utils/mock';

interface ModelImage {
  image: string;
  model: Model;
}

const modelImages: ModelImage[] = [];

apiWrapper(() => {
  mock.onGet('category/models').reply(() => [200, models]);
});

const categoryBrandModel = /category\/brands\/models/;
apiWrapper(() => {
  mock.onPost(categoryBrandModel).reply(() => {
    const response = [{ id: '0', models: [...models], name: 'brand' }];
    return [200, response];
  });
});

const modelForBrandAndMainCategoryRegex =
  /category\/categories\/main\/(\S+)\/brands\/(\S+)\/models$/;
const modelForBrandRegex = /category\/brands\/(\S+)\/models$/;

apiWrapper(() => {
  const getOp = (brandId: string, mainCategoryId?: string) => {
    let filteredRelations = categoryBrandModels.filter((i) => i.brandId === brandId);
    if (mainCategoryId) {
      filteredRelations = filteredRelations.filter(
        (rel) => getMainCategoryIdRecursively(rel.categoryId) === mainCategoryId
      );
    }

    const filteredModels = models.filter((model) =>
      filteredRelations.some((categoryBrandModel) => categoryBrandModel.modelId === model.id)
    );

    return [200, filteredModels];
  };

  mock.onGet(modelForBrandRegex).reply((config) => {
    const brandId = config.url.match(modelForBrandRegex)[1];

    return getOp(brandId);
  });

  mock.onGet(modelForBrandAndMainCategoryRegex).reply((config) => {
    const brandId = config.url.match(modelForBrandAndMainCategoryRegex)[2];
    const mainCategoryId = config.url.match(modelForBrandAndMainCategoryRegex)[1];

    return getOp(brandId, mainCategoryId);
  });
});

const modelForBrandAndCategoryRegex = /category\/categories\/(\S+)\/brands\/(\S+)\/models$/;

apiWrapper(() => {
  mock.onGet(modelForBrandAndCategoryRegex).reply((config) => {
    const categoryId = config.url.match(modelForBrandAndCategoryRegex)[1];
    const brandId = config.url.match(modelForBrandAndCategoryRegex)[2];

    const filteredModels = models.filter((model) =>
      categoryBrandModels.some(
        (categoryBrandModel) =>
          categoryBrandModel.categoryId === categoryId &&
          categoryBrandModel.brandId === brandId &&
          categoryBrandModel.modelId === model.id
      )
    );

    return [200, filteredModels];
  });
});

const getMainCategoryIdRecursively = (categoryId: string): string => {
  const category = categories.find((i) => i.id === categoryId);
  if (category.parentCategoryId) {
    return getMainCategoryIdRecursively(category.parentCategoryId);
  }

  return categoryId;
};

apiWrapper(() => {
  mock.onPost(modelForBrandAndCategoryRegex).reply((config) => {
    const categoryId = config.url.match(modelForBrandAndCategoryRegex)[1];
    const brandId = config.url.match(modelForBrandAndCategoryRegex)[2];
    const model: Model = JSON.parse(config.data);

    const isNew = model.id === temporaryModelId;

    const existingModel = models.find(
      (m) => (isNew && m.name === model.name) || (!isNew && m.id === model.id)
    );

    if (existingModel) {
      const mainCategoryId = getMainCategoryIdRecursively(categoryId);
      const relations = categoryBrandModels.filter(
        (i) => i.modelId === existingModel?.id && i.brandId === brandId
      );

      const existingRelation = relations.find(
        (i) => getMainCategoryIdRecursively(i.categoryId) === mainCategoryId
      );

      if (existingRelation) {
        const mainCategory = categories.find((i) => i.id === mainCategoryId);
        return [
          400,
          wrapErrorMessage(
            `This brand-model is used by another category under ${mainCategory.name}`
          )
        ];
      }

      categoryBrandModels.push({
        brandId,
        categoryId,
        modelId: existingModel.id
      });

      return [200, existingModel];
    }

    model.id = uuid();
    models.push(model);

    categoryBrandModels.push({
      brandId,
      categoryId,
      modelId: model.id
    });

    return [200, model];
  });
});

const modelRegex = /category\/models$/;
apiWrapper(() => {
  mock.onPost(modelRegex).reply((config) => {
    const model: {
      id?: string;
      name?: string;
      isNew?: boolean;
      image?: string;
      inMemory?: boolean;
      photoPath?: string;
      brandId?: string;
    } = JSON.parse(config.data);

    model.id = uuid();
    models.push(model);

    categoryBrandModels.push({
      brandId: model.brandId,
      categoryId: undefined,
      modelId: model.id
    });

    return [200, model];
  });
});

const modelImageRegex = /category\/models\/(\S+)\/photo$/;
apiWrapper(() => {
  mock.onPut(modelImageRegex).reply((config) => {
    const params = config.data;
    const image: File = params.get('file');
    const modelId = config.url.match(modelImageRegex)[1];
    const existingModel = models.find((m) => m.id === modelId);
    if (existingModel) {
      existingModel.photoPath = `models/${modelId}/photo`;

      let imageString: string;

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const base64data = reader.result;
        imageString = base64data.toString();
      };

      const existingModelImage = modelImages.find((i) => i.model.id === modelId);
      if (existingModelImage) {
        existingModelImage.image = imageString;
        existingModelImage.model = existingModel;
      } else {
        modelImages.push({
          image: imageString,
          model: existingModel
        });
      }
    } else {
      return [404, wrapErrorMessage('Model is not found.')];
    }
    return [200, existingModel];
  });
});

apiWrapper(() => {
  mock.onGet(modelImageRegex).reply((config) => {
    const modelId = config.url.match(modelImageRegex)[1];
    const existingModel = models.find((m) => m.id === modelId);
    if (!existingModel) {
      return [404, wrapErrorMessage('Model is not found.')];
    }

    const existingModelImage = modelImages.find((i) => i.model.id === modelId);
    if (!existingModelImage) {
      return [400, wrapErrorMessage('Model image is not found.')];
    }

    return [200, existingModelImage.image];
  });
});

apiWrapper(() => {
  mock.onDelete(modelImageRegex).reply((config) => {
    const modelId = config.url.match(modelImageRegex)[1];
    const existingModel = models.find((m) => m.id === modelId);
    if (!existingModel) {
      return [404, wrapErrorMessage('Model is not found.')];
    }

    const index = modelImages.findIndex((i) => i.model.id === modelId);
    if (index === -1) {
      return [400, wrapErrorMessage('Model image is not found.')];
    }

    modelImages.splice(index, 1);

    delete existingModel.photoPath;

    return [200, existingModel];
  });
});

const removeRegex = /category\/categories\/(\S+)\/brands\/(\S+)\/models\/(\S+)$/;
apiWrapper(() => {
  mock.onDelete(removeRegex).reply((config) => {
    const categoryId = config.url.match(removeRegex)[1];
    const brandId = config.url.match(removeRegex)[2];
    const modelId = config.url.match(removeRegex)[3];

    const modelIndex = models.findIndex((m) => m.id === modelId);
    if (modelIndex === -1) {
      return [404];
    }

    models.splice(modelIndex, 1);

    const relationIndex = categoryBrandModels.findIndex(
      (i) => i.categoryId === categoryId && i.brandId === brandId && i.modelId === modelId
    );

    if (relationIndex !== -1 && categoryBrandModels[relationIndex].hasAsset) {
      return [400, wrapErrorMessage('There is an asset associated with this model.')];
    }
    categoryBrandModels.splice(relationIndex, 1);

    return [200, null];
  });
});

export const addModel = (model: Model) => {
  const existingModel = models.find((md) => md.name === model.name);

  if (!existingModel) {
    const newModel = {
      ...model,
      inMemory: false
    };
    models.push(newModel);
    return newModel;
  }
  return existingModel;
};

export const approveModel = (modelId: string) => {
  const model = models.find((i) => i.id === modelId);
  model.isNew = false;

  return model;
};

export const removeModelsIfNecessary = (modelIds: string[]) => {
  modelIds.forEach((modelId) => {
    if (categoryBrandModels.every((i) => i.modelId !== modelId)) {
      _.remove(models, (model) => model.id === modelId);
    }
  });
};
