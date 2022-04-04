import { User } from 'store/slices/users/details/types';
import { ValidatorRules } from '../types';
import { createValidator } from '../base';
import { isArrayNullOrEmpty } from 'utils';
import i18n from 'utils/i18n';

const rules: ValidatorRules<User> = {
  assetManagementAuthorization: (entity: User) => {
    const { branchAuthorization, isGeneralAdmin } = entity;
    if (isGeneralAdmin) {
      return undefined;
    }

    if (
      !branchAuthorization ||
      (!branchAuthorization.allBranches && isArrayNullOrEmpty(branchAuthorization.branchIds))
    ) {
      return i18n.t('users.modal.branches.no_branch_yet');
    }

    return undefined;
  },
  branchAuthorization: (entity: User) => {
    const { assetManagementAuthorization, assetRole, isGeneralAdmin } = entity;
    if (isGeneralAdmin) {
      return undefined;
    }

    if (!assetManagementAuthorization || !assetManagementAuthorization.roleId || !assetRole) {
      return i18n.t('users.modal.asset_roles.no_role_selected');
    }

    if (
      assetRole.name !== 'RequestOnly' &&
      isArrayNullOrEmpty(assetManagementAuthorization.departmentIds)
    ) {
      return i18n.t('users.modal.departments.no_department_selected');
    }

    return undefined;
  }
};

const userPermissionValidator = createValidator(rules);

export default userPermissionValidator;
