import { CategoryImport, ImportStatus } from 'store/slices/imports/types';
import { base64ToArrayBufferConverter } from '../utils/converters';
import { categoryImportTemplate } from './categoryImportTemplate';
import { v4 as uuid } from 'uuid';
import mock from '../utils/mock';

const categoryImports: CategoryImport[] = [];

const predefinedImportResults: CategoryImport[] = [
  {
    failedEntries: [
      {
        errorMessage: 'Category Code cannot be blank',
        rows: [12]
      },
      {
        errorMessage: 'Brand and models already exist (Category Code: 636)',
        rows: [28]
      },
      {
        errorMessage: 'Could not locate category code',
        rows: [32]
      }
    ],
    failedEntryCount: 3,
    percentage: 0,
    state: 'validationCheck',
    successEntries: [
      {
        count: 15,
        type: 'category'
      },
      {
        count: 7,
        type: 'Brand'
      },
      {
        count: 9,
        type: 'Model'
      }
    ],
    successEntryCount: 30,
    totalEntryCount: 33,
    type: 'category'
  },
  {
    failedEntries: [
      {
        errorMessage: 'Category Code cannot be blank',
        rows: [1, 3]
      }
    ],
    failedEntryCount: 2,
    percentage: 0,
    state: 'validationCheck',
    successEntries: [
      {
        count: 4,
        type: 'category'
      },
      {
        count: 2,
        type: 'Brand'
      },
      {
        count: 3,
        type: 'Model'
      }
    ],
    successEntryCount: 8,
    totalEntryCount: 10,
    type: 'category'
  },
  {
    failedEntries: [],
    failedEntryCount: 0,
    percentage: 0,
    state: 'validationCheck',
    successEntries: [
      {
        count: 10,
        type: 'category'
      },
      {
        count: 9,
        type: 'Brand'
      },
      {
        count: 14,
        type: 'Model'
      }
    ],
    successEntryCount: 26,
    totalEntryCount: 26,
    type: 'category'
  }
];

const defaultUserId = 1;
const getCategoryImportTemplateRegex = /categoryImportTemplate/;

mock.onGet(getCategoryImportTemplateRegex).reply(() => {
  const arrayBuffer = base64ToArrayBufferConverter(categoryImportTemplate);

  return [200, arrayBuffer];
});

const getCategoryImportByUserIdRegex = /categoryImport\?userId=(\S+)/;
mock.onGet(getCategoryImportByUserIdRegex).reply((config) => {
  const userId = +config.url.match(getCategoryImportByUserIdRegex)[1];

  const categoryImport = categoryImports.find(
    (i) => i.userId === userId && i.state !== 'finished' && i.state !== 'cancelled'
  );
  return [200, categoryImport];
});

const getCategoryImportStatusByIdRegex = /categoryImport\/(\S+)\/status/;
mock.onGet(getCategoryImportStatusByIdRegex).reply((config) => {
  const importId = config.url.match(getCategoryImportStatusByIdRegex)[1];

  const categoryImport = categoryImports.find((i) => i.id === importId);

  const categoryImportStatus: ImportStatus = {
    id: categoryImport.id,
    percentage: categoryImport.percentage,
    state: categoryImport.state
  };

  return [200, categoryImportStatus];
});

const getInvalidEntries = /categoryImport\/(\d+)\/invalid/;
mock.onGet(getInvalidEntries).reply(() => {
  const arrayBuffer = base64ToArrayBufferConverter(categoryImportTemplate);

  return [200, arrayBuffer];
});

mock.onPost('categoryImport').reply((config) => {
  const file: File = config.data;
  const importId = uuid();

  const predefinedImportResult =
    predefinedImportResults[categoryImports.length % predefinedImportResults.length];
  const categoryImport = {
    ...predefinedImportResult,
    fileName: file.name,
    id: importId,
    userId: defaultUserId
  };

  categoryImports.push(categoryImport);
  // set interval
  const interval = window.setInterval(() => {
    if (categoryImport.percentage >= 100) {
      categoryImport.state = 'validationCompleted';
      clearInterval(interval);
    } else {
      categoryImport.percentage += 20;
    }
  }, 3000);

  return [200, categoryImport];
});

const updateCategoryImportStatusById = /categoryImport\/(\S+)/;
mock.onPut(updateCategoryImportStatusById).reply((config) => {
  const importId = config.url.match(updateCategoryImportStatusById)[1];
  const importStatus: ImportStatus = JSON.parse(config.data);

  const existingImport = categoryImports.find((cis) => cis.id === importId);
  if (existingImport) {
    existingImport.state = importStatus.state;

    if (importStatus.state === 'confirmed' || importStatus.state === 'validationCheck') {
      existingImport.percentage = 0;
    } else {
      existingImport.percentage = importStatus.percentage;
    }

    const interval = window.setInterval(() => {
      if (existingImport.percentage >= 100) {
        existingImport.state = 'finished';
        clearInterval(interval);
      } else {
        existingImport.percentage += 20;
      }
    }, 3000);
  } else {
    return [404, null];
  }

  return [200, existingImport];
});

const cancelCategoryImportStatusById = /categoryImpor\/(\S+)\/cancel/;
mock.onPut(cancelCategoryImportStatusById).reply((config) => {
  const importId = config.url.match(cancelCategoryImportStatusById)[1];

  const existingImport = categoryImports.find((cis) => cis.id === importId);
  if (existingImport) {
    existingImport.state = 'cancelled';
  } else {
    return [404, null];
  }

  return [200, existingImport];
});
