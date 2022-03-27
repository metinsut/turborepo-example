import { Brand } from 'store/slices/brands/types';
import { apiWrapper, wrapErrorMessage } from './utils';
import { brands, categoryBrandModels } from './data';
import { removeModelsIfNecessary } from './models';
import { temporaryBrandId } from 'store/common';
import _ from 'lodash';
import mock from '../utils/mock';

const fillChildModelCount = (categoryId: string, brandsToFill: Brand[]) => {
  brandsToFill.forEach((brand) => {
    // eslint-disable-next-line no-param-reassign
    brand.modelCount = categoryBrandModels.filter(
      (rel) => rel.categoryId === categoryId && rel.brandId === brand.id && rel.modelId
    ).length;
  });

  return brandsToFill;
};

apiWrapper(() => {
  mock.onGet('category/brands').reply(() => [200, brands]);
});

const brandForCategoryRegex = /category\/categories\/(\S+)\/brands$/;
apiWrapper(() => {
  mock.onGet(brandForCategoryRegex).reply((config) => {
    const categoryId = config.url.match(brandForCategoryRegex)[1];

    const filteredBrands = brands.filter((brand) =>
      categoryBrandModels.some(
        (categoryBrandModel) =>
          categoryBrandModel.categoryId === categoryId &&
          categoryBrandModel.brandId === brand.id &&
          !categoryBrandModel.modelId
      )
    );

    return [200, fillChildModelCount(categoryId, filteredBrands)];
  });
});

const getBrandByIdRegex = /category\/brands\/(\S+)$/;
apiWrapper(() => {
  mock.onGet(getBrandByIdRegex).reply((config) => {
    const brandId = config.url.match(getBrandByIdRegex)[1];
    const brand = brands.find((i) => i.id === brandId);
    if (!brand) {
      return [404, 'Brand is not found'];
    }

    return [200, brand];
  });
});

apiWrapper(() => {
  mock.onPost(brandForCategoryRegex).reply((config) => {
    const brand: Brand = JSON.parse(config.data);
    const categoryId = config.url.match(brandForCategoryRegex)[1];

    const isNew = brand.id.toString() === temporaryBrandId;

    const existingBrand = brands.find(
      (br) => (isNew && br.name === brand.name) || (!isNew && br.id === brand.id)
    );

    const existingRelation = categoryBrandModels.find(
      (i) => i.brandId === existingBrand?.id && i.categoryId === categoryId
    );

    if (existingRelation) {
      return [
        400,
        wrapErrorMessage('This brand is already added to this category. Enter a different brand')
      ];
    }

    if (!existingBrand) {
      brand.id = (brands.length + 1).toString();
      brand.modelCount = 0;
      brands.push(brand);
    }

    categoryBrandModels.push({
      brandId: brand.id,
      categoryId
    });

    return [200, brand];
  });
});

apiWrapper(() => {
  mock.onPost('category/brands').reply((config) => {
    const brand: Brand = JSON.parse(config.data);

    brand.id = (brands.length + 1).toString();
    brand.modelCount = 0;
    brands.push(brand);

    return [200, brand];
  });
});

const removeBrandFromCategoryRegex = /category\/categories\/(\S+)\/brands\/(\S+)$/;
apiWrapper(() => {
  mock.onDelete(removeBrandFromCategoryRegex).reply((config) => {
    const categoryId = config.url.match(removeBrandFromCategoryRegex)[1];
    const brandId = config.url.match(removeBrandFromCategoryRegex)[2];

    const relations = categoryBrandModels.filter(
      (i) => i.categoryId === categoryId && i.brandId === brandId
    );

    if (relations.some((i) => i.hasAsset)) {
      return [400, wrapErrorMessage('There is an asset associated with this brand.')];
    }

    // remove all relations
    _.pullAll(categoryBrandModels, relations);

    // remove brand
    removeBrandsIfNecessary([brandId]);

    const modelIds = Array.from(new Set(relations.filter((i) => i.modelId).map((i) => i.modelId)));

    // remove models
    removeModelsIfNecessary(modelIds);

    return [200];
  });
});

export const addBrand = (brand: Brand) => {
  const existingBrand = brands.find((br) => br.name === brand.name);

  if (!existingBrand) {
    const newBrand = {
      ...brand,
      inMemory: false
    };
    brands.push(newBrand);
    return newBrand;
  }
  return existingBrand;
};

export const approveBrand = (brandId: string) => {
  const brand = brands.find((i) => i.id === brandId);
  brand.isNew = false;

  return brand;
};

export const removeBrandsIfNecessary = (brandIds: string[]) => {
  brandIds.forEach((brandId) => {
    if (categoryBrandModels.every((i) => i.brandId !== brandId)) {
      _.remove(brands, (brand) => brand.id === brandId);
    }
  });
};
