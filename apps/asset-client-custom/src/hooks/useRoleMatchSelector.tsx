import { AssetRole } from '../store/slices/users/common/types';
import { userRoles } from '../store/slices/users/common/data';

interface Props {
  assetRole: Partial<AssetRole>;
  matchType: keyof AssetRole;
}

// This hook provides all of the userRole feature for use RoleLevelIndicator correctly
const useRoleMatchSelector = ({ assetRole, matchType }: Props) => {
  let roleType;
  if (assetRole) {
    roleType = userRoles.find((role) => role[matchType] === assetRole[matchType]);
  }
  return [roleType];
};

export default useRoleMatchSelector;
