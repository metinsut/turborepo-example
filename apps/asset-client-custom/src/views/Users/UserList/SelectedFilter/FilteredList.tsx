import { UserFilter } from 'store/slices/users/filter/types';
import { emptyFilter } from 'store/slices/users/filter/data';
import { useFindObjectsChangedFields } from 'hooks/useFindObjectChangesCount';
import AdditionalPermissionsChip from './FilterChips/AdditionalPermissionsChip';
import AssetManagementRoleChip from './FilterChips/AssetManagementRoleChip';
import BranchesChip from './FilterChips/BranchesChip';
import DepartmentChip from './FilterChips/DepartmentChip';
import FirstNameChip from './FilterChips/FirstNameChip';
import GeneralAdminChip from './FilterChips/GeneralAdminChip';
import JobTitleChip from './FilterChips/JobTitleChip';
import LastNameChip from './FilterChips/LastNameChip';
import LastUpdateChip from './FilterChips/LastUpdateChip';
import UserAddedChip from './FilterChips/UserAddedChip';
import UserStatusChip from './FilterChips/UserStatusChip';

interface Props {
  activeFilter: UserFilter;
  modal?: boolean;
}

const FilteredList = ({ activeFilter, modal }: Props) => {
  const changedFilterObjects = useFindObjectsChangedFields(emptyFilter, activeFilter);
  return (
    <>
      {changedFilterObjects.jobTitles && (
        <JobTitleChip modal={modal} values={activeFilter.jobTitles} />
      )}
      {changedFilterObjects.firstName && (
        <FirstNameChip modal={modal} value={activeFilter.firstName} />
      )}
      {changedFilterObjects.lastName && (
        <LastNameChip modal={modal} value={activeFilter.lastName} />
      )}
      {changedFilterObjects.branches && (
        <BranchesChip modal={modal} values={activeFilter.branches} />
      )}
      {changedFilterObjects.departments && (
        <DepartmentChip modal={modal} values={activeFilter.departments} />
      )}
      {changedFilterObjects.userStatuses && (
        <UserStatusChip modal={modal} values={activeFilter.userStatuses} />
      )}
      {changedFilterObjects.roles && (
        <AssetManagementRoleChip modal={modal} values={activeFilter.roles} />
      )}
      {changedFilterObjects.additionalPermissions && (
        <AdditionalPermissionsChip modal={modal} values={activeFilter.additionalPermissions} />
      )}
      {changedFilterObjects.generalAdmin && (
        <GeneralAdminChip modal={modal} value={activeFilter.generalAdmin} />
      )}
      {changedFilterObjects.userAddedFilter && (
        <UserAddedChip modal={modal} values={activeFilter.userAddedFilter} />
      )}
      {changedFilterObjects.lastUpdateFilter && (
        <LastUpdateChip modal={modal} values={activeFilter.lastUpdateFilter} />
      )}
    </>
  );
};

export default FilteredList;
