import { Department } from 'store/slices/users/departments/types';
import { apiWrapper, wrapErrorMessage } from './utils';
import { departments } from './data';
import { v4 as uuid } from 'uuid';
import mock from '../utils/mock';

const departmentsRegex = /user\/departments/;

apiWrapper(() => {
  mock.onGet(departmentsRegex).reply(() => {
    const finalDepartments = [...departments];

    return [200, finalDepartments];
  });

  mock.onPost(departmentsRegex).reply((config) => {
    const addedDepartment: Department = JSON.parse(config.data);

    const department: Department = {
      ...addedDepartment,
      id: uuid()
    };

    departments.push(department);
    return [200, department];
  });
});

const departmentWithIdRegex = /user\/departments\/(\S+)/;
apiWrapper(() => {
  mock.onPut(departmentWithIdRegex).reply((config) => {
    const departmentId = config.url.match(departmentWithIdRegex)[1];
    const department: Department = JSON.parse(config.data);
    const existingDepartment = departments.find((i) => i.id === departmentId);

    if (!existingDepartment) {
      return [404, wrapErrorMessage('No deparment info!')];
    }

    existingDepartment.autoAdded = department.autoAdded;
    existingDepartment.name = department.name;
    existingDepartment.notes = department.notes;
    existingDepartment.mainCategories = [...department.mainCategories];
    return [200, department];
  });

  mock.onDelete(departmentWithIdRegex).reply((config) => {
    const departmentId = config.url.match(departmentWithIdRegex)[1];
    const existingDepartment = departments.find((i) => i.id === departmentId);
    if (!existingDepartment) {
      return [404, wrapErrorMessage('No deparment info!')];
    }

    // TODO: user department deletion

    const departmentIndex = departments.findIndex((d) => d.id === existingDepartment.id);
    departments.splice(departmentIndex, 1);

    return [200, null];
  });
});
