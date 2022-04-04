import { AssetRoleType } from 'store/slices/users/details/types';
import { DisplayType } from 'utils';

export type SectionType =
  | ''
  | 'role'
  | 'department'
  | 'branches'
  | 'permissions'
  | 'invite'
  | 'personalInformation';

export type UserModalType = 'standardUser' | 'generalAdmin';

export function decideNextSection(
  activeSection: SectionType,
  selectedSection: SectionType,
  isActivated: boolean,
  isCancel: boolean,
  roleSaved: boolean,
  mode: DisplayType,
  onClose: () => void,
  userRole: AssetRoleType
) {
  if (isActivated) {
    return selectedSection;
  }

  if (activeSection === 'department' && isCancel) {
    return 'role';
  }
  if (activeSection === 'role' && !isCancel) {
    if (userRole === 'RequestOnly') {
      return '';
    }
    return 'department';
  }

  if (mode === 'edit') {
    return '';
  }

  if (activeSection === 'role' && isCancel && !roleSaved) {
    onClose();
    return undefined;
  }

  return '';
}

export function decideDisabled(
  activeSection: SectionType,
  selectedSection: SectionType,
  userRole: AssetRoleType
) {
  if (selectedSection === 'branches' && userRole === 'Admin') {
    return true;
  }

  return activeSection !== selectedSection && activeSection !== '';
}

export type SectionProps = {
  disabled: boolean;
  editVisible: boolean;
  isActive: boolean;
  mode: DisplayType;
  onActivate: (active: boolean, cancel: boolean) => Promise<void>;
};
