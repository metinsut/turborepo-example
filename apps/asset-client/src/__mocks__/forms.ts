import { Form, FormField } from 'store/slices/assetConfiguration/forms/types';
import { apiWrapper } from './utils';
import { categories } from './data';
import mock from '../utils/mock';

export const forms: Form[] = [
  {
    id: '43w3-cx9g-fa32-9fsw',
    mainCategoryId: '1',
    mainCategoryName: 'Biomedical',
    updatedByUser: {
      firstName: 'Fred',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
      lastName: 'Isaksson'
    },
    updatedDate: '2022-01-14T12:58:47+03:00'
  },
  {
    id: '4gh7-t54e-p6nd-333q',
    mainCategoryId: '2',
    mainCategoryName: 'Information Technologies',
    updatedByUser: {
      firstName: 'Mahoko',
      id: '2acc7731-f372-4f28-8dc3-b815069809c2',
      lastName: 'Shinohara'
    },
    updatedDate: '2021-12-11T12:58:47+03:00'
  },
  {
    id: '1wf3-65tr-545r-6rer',
    mainCategoryId: '3',
    mainCategoryName: 'Technical Services',
    updatedByUser: {
      firstName: 'Fred',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
      lastName: 'Isaksson'
    },
    updatedDate: '2021-12-11T12:58:47+03:00'
  },
  {
    id: '234e-4wf4-896r-56rt',
    mainCategoryId: '4',
    mainCategoryName: 'Furniture',
    updatedByUser: {
      firstName: 'Mahoko',
      id: '2acc7731-f372-4f28-8dc3-b815069809c2',
      lastName: 'Shinohara'
    },
    updatedDate: '2021-11-25T12:58:47+03:00'
  },
  {
    id: '5rfd-8ew3-3423-0dsa',
    mainCategoryId: '2',
    mainCategoryName: 'Information Technologies',
    updatedByUser: {
      firstName: 'Fred',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
      lastName: 'Isaksson'
    },
    updatedDate: '2021-10-21T12:58:47+03:00'
  }
];

export const formFields: FormField[] = [
  {
    dataType: 'freeText',
    id: 'r433-f342-rwed',
    isRequired: true,
    isUnique: true,
    section: 'identification',
    title: 'Serial No'
  },
  {
    dataType: 'freeText',
    id: '4233-df34-rw34',
    isRequired: false,
    isUnique: false,
    section: 'deviceInfo',
    title: 'Clinical Branch'
  },
  {
    dataType: 'numerical',
    id: 'hfg5-md0-43d',
    isRequired: false,
    isUnique: false,
    section: 'purchaseInfo',
    title: 'Additinal Purchase Cost'
  }
];

const getFormsRegex = /gw\/registration\/forms$/;

apiWrapper(() => {
  mock.onGet(getFormsRegex).reply(() => [200, forms]);
});

const getFormFieldsRegex = /gw\/registration\/forms\/(\S+)/;
apiWrapper(() => {
  mock.onGet(getFormFieldsRegex).reply((config) => {
    const formId = config.url.match(getFormFieldsRegex)[1];
    const form = forms.find((f) => f.id === formId);
    if (!form) {
      return [404, 'Form is not found'];
    }
    const formWithFields = {
      fields: formFields,
      id: formId,
      mainCategory: {
        id: form.mainCategoryId,
        name: form.mainCategoryName
      }
    };
    return [200, formWithFields];
  });
});

const getFormFieldsByMainCategoryId = /registration\/forms\/main-category\/(\S+)\/fields$/;
apiWrapper(() => {
  mock.onGet(getFormFieldsByMainCategoryId).reply((config) => {
    const mainCategoryId = config.url.match(getFormFieldsByMainCategoryId)[1];
    const category = categories.find((c) => c.id === mainCategoryId);
    if (!category) {
      return [404, 'Category is not found'];
    }

    const form = forms.find((f) => f.mainCategoryId === mainCategoryId);
    if (!form) {
      return [404, 'Form is not found'];
    }

    return [200, formFields];
  });
});

const addFormFieldsRegex = /registration\/forms\/(\S+)\/fields$/;
apiWrapper(() => {
  mock.onPost(addFormFieldsRegex).reply((config) => {
    const formField: FormField = JSON.parse(config.data);
    const formId = config.url.match(getFormFieldsRegex)[1];
    const form = forms.find((f) => f.id === formId);
    if (!form) {
      return [404, 'Form is not found'];
    }
    formFields.push(formField);
    return [200, formFields];
  });
});

const updateFormFieldsRegex = /registration\/forms\/(\S+)\/fields\/(\S+)/;
apiWrapper(() => {
  mock.onPut(updateFormFieldsRegex).reply((config) => {
    const formField: FormField = JSON.parse(config.data);
    const formId = config.url.match(getFormFieldsRegex)[1];
    const newFormsFields = forms.map((form) => {
      if (form.id === formId) {
        return { ...form, formField };
      }
      return { ...form };
    });
    if (!newFormsFields) {
      return [404, 'Form is not found'];
    }
    return [200, newFormsFields];
  });
});

const deleteFormFieldsRegex = /registration\/forms\/(\S+)\/fields\/(\S+)/;
apiWrapper(() => {
  mock.onDelete(deleteFormFieldsRegex).reply((config) => {
    const fieldsId = config.url.match(getFormFieldsRegex)[1];
    const newFormsFields = formFields.filter((fields) => fields.id === fieldsId);
    if (!newFormsFields) {
      return [404, 'Form is not found'];
    }
    return [200, newFormsFields];
  });
});
