import { AssetImport, ImportStatus } from 'store/slices/imports/types';
import { base64ToArrayBufferConverter } from 'utils/converters';
import { categoryImportTemplate } from './categoryImportTemplate';
import { v4 as uuid } from 'uuid';
import mock from 'utils/mock';

const assetImports: AssetImport[] = [];

const predefinedImportResults: AssetImport[] = [
  {
    failedEntries: [
      {
        errorMessage: 'Brand cannot be blank',
        rows: [12, 13]
      },
      {
        errorMessage: 'Model cannot be blank',
        rows: [28]
      },
      {
        errorMessage: 'Location ID invalid',
        rows: [3, 15, 23]
      }
    ],
    failedEntryCount: 6,
    id: '9dc5580a-12fe-4deb-912e-d2860f2e7075',
    percentage: 0,
    state: 'validationCheck',
    successEntries: [
      {
        brandId: '9',
        categoryId: '9',
        count: 11,
        modelId: '12',
        type: 'asset'
      },
      {
        brandId: '3',
        categoryId: '3',
        count: 19,
        modelId: '10',
        type: 'asset'
      }
    ],
    successEntryCount: 30,
    totalEntryCount: 36,
    type: 'asset'
  }
];

const getAssetImportTemplateRegex = /assetImportTemplate\?categoryId=(\S+)/;
const defaultUserId = 1;

mock.onGet(getAssetImportTemplateRegex).reply(() => {
  const arrayBuffer = base64ToArrayBufferConverter(categoryImportTemplate);

  return [200, arrayBuffer];
});

mock.onPost('assetImport').reply((config) => {
  const file: File = config.data;
  const importId = uuid();

  const predefinedImportResult =
    predefinedImportResults[assetImports.length % predefinedImportResults.length];
  const assetImport = {
    ...predefinedImportResult,
    fileName: file.name,
    id: importId,
    userId: defaultUserId
  };

  assetImports.push(assetImport);
  // set interval
  const interval = window.setInterval(() => {
    if (assetImport.percentage >= 100) {
      assetImport.state = 'validationCompleted';
      clearInterval(interval);
    } else {
      assetImport.percentage += 20;
    }
  }, 1000);

  return [200, assetImport];
});

const getAssetImportStatusByIdRegex = /assetImport\/(\S+)\/status/;
mock.onGet(getAssetImportStatusByIdRegex).reply((config) => {
  const importId = config.url.match(getAssetImportStatusByIdRegex)[1];

  const assetImport = assetImports.find((i) => i.id === importId);

  const assetImportStatus: ImportStatus = {
    id: assetImport.id,
    percentage: assetImport.percentage,
    state: assetImport.state
  };

  return [200, assetImportStatus];
});

const getInvalidEntries = /assetImport\/(\d+)\/invalid/;
mock.onGet(getInvalidEntries).reply(() => {
  const arrayBuffer = base64ToArrayBufferConverter(categoryImportTemplate);

  return [200, arrayBuffer];
});
