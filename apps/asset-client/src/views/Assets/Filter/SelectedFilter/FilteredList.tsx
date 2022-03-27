import { AssetFilter } from 'store/slices/asset/filter/types';
import {
  emptyContractFilter,
  emptyInformationFilter,
  emptyPlanDefinitionsFilter
} from 'store/slices/asset/filter/data';
import { useFindObjectsChangedFields } from 'hooks/useFindObjectChangesCount';
import BranchesChip from './FilterChips/BranchesChip';
import BrandModelChip from './FilterChips/BrandModelChip/BrandModelChip';
import CategoryChips from './FilterChips/CategoryChips';
import CodeChip from './FilterChips/CodeChip';
import ContractEndDateChip from './FilterChips/ContractEndDateChip';
import ContractFirmChips from './FilterChips/ContractFirmChips';
import ContractPersonChips from './FilterChips/ContractPersonChips';
import ContractTypeChips from './FilterChips/ContractTypeChips';
import CreatedByChips from './FilterChips/CreatedByChips';
import CustodianPersonChips from './FilterChips/CustodianPersonChip';
import DateOfCreationChip from './FilterChips/DateOfCreationChip';
import DateOfPurchaseChip from './FilterChips/DateOfPurchaseChip';
import DefinitionDoesNotNeedPlanChip from './FilterChips/DefinitionDoesNotNeedPlanChip';
import DefinitionEndDateChip from './FilterChips/DefinitionEndDateChip';
import DefinitionNoPlanChip from './FilterChips/DefinitionNoPlanChip';
import LocationChips from './FilterChips/LocationChips';
import NoContractAssignedChip from './FilterChips/NoContractAssignedChip';
import PartsPolicyChips from './FilterChips/PartsPolicyChips';
import PurchasedFirmChips from './FilterChips/PurchasedFirmChips';
import StatusChips from './FilterChips/StatusChips';

interface Props {
  activeFilter: AssetFilter;
  modal?: boolean;
}

const FilteredList = ({ activeFilter, modal = false }: Props) => {
  const informationChangedFilterObjects = useFindObjectsChangedFields(
    emptyInformationFilter,
    activeFilter.information
  );
  const contractChangedFilterObjects = useFindObjectsChangedFields(
    emptyContractFilter,
    activeFilter.contract
  );
  const definitionCalibrationChangedFilterObjects = useFindObjectsChangedFields(
    emptyPlanDefinitionsFilter,
    activeFilter.definition.calibration
  );
  const definitionMaintenanceChangedFilterObjects = useFindObjectsChangedFields(
    emptyPlanDefinitionsFilter,
    activeFilter.definition.maintenance
  );

  return (
    <>
      {informationChangedFilterObjects.brandModels && (
        <BrandModelChip modal={modal} values={activeFilter.information.brandModels} />
      )}
      {informationChangedFilterObjects.categories && (
        <CategoryChips modal={modal} values={activeFilter.information.categories} />
      )}
      {informationChangedFilterObjects.codes && (
        <CodeChip modal={modal} values={activeFilter.information.codes} />
      )}
      {informationChangedFilterObjects.branches && (
        <BranchesChip modal={modal} values={activeFilter.information.branches} />
      )}
      {informationChangedFilterObjects.location && (
        <LocationChips modal={modal} values={activeFilter.information.location} />
      )}
      {informationChangedFilterObjects.custody && (
        <CustodianPersonChips modal={modal} values={activeFilter.information.custody} />
      )}
      {informationChangedFilterObjects.statusTypes && (
        <StatusChips modal={modal} values={activeFilter.information.statusTypes} />
      )}
      {informationChangedFilterObjects.purchasedFirm && (
        <PurchasedFirmChips modal={modal} values={activeFilter.information.purchasedFirm} />
      )}
      {informationChangedFilterObjects.purchasedDate && (
        <DateOfPurchaseChip modal={modal} value={activeFilter.information.purchasedDate} />
      )}
      {informationChangedFilterObjects.createdByUsers && (
        <CreatedByChips modal={modal} values={activeFilter.information.createdByUsers} />
      )}
      {informationChangedFilterObjects.createdDate && (
        <DateOfCreationChip modal={modal} value={activeFilter.information.createdDate} />
      )}
      {contractChangedFilterObjects.types && (
        <ContractTypeChips modal={modal} values={activeFilter.contract.types} />
      )}
      {contractChangedFilterObjects.firm && (
        <ContractFirmChips modal={modal} values={activeFilter.contract.firm} />
      )}
      {contractChangedFilterObjects.endDate && (
        <ContractEndDateChip modal={modal} value={activeFilter.contract.endDate} />
      )}
      {contractChangedFilterObjects.contactPerson && (
        <ContractPersonChips modal={modal} values={activeFilter.contract.contactPerson} />
      )}
      {contractChangedFilterObjects.partPolicyTypes && (
        <PartsPolicyChips modal={modal} values={activeFilter.contract.partPolicyTypes} />
      )}
      {contractChangedFilterObjects.noContractAssigned && (
        <NoContractAssignedChip modal={modal} values={activeFilter.contract.noContractAssigned} />
      )}
      {definitionMaintenanceChangedFilterObjects.endDate && (
        <DefinitionEndDateChip
          modal={modal}
          planType="maintenance"
          value={activeFilter.definition.maintenance.endDate}
        />
      )}
      {definitionMaintenanceChangedFilterObjects.noPlan && (
        <DefinitionNoPlanChip modal={modal} planType="maintenance" />
      )}
      {definitionMaintenanceChangedFilterObjects.doesNotNeedPlan && (
        <DefinitionDoesNotNeedPlanChip modal={modal} planType="maintenance" />
      )}
      {definitionCalibrationChangedFilterObjects.endDate && (
        <DefinitionEndDateChip
          modal={modal}
          planType="calibration"
          value={activeFilter.definition.calibration.endDate}
        />
      )}
      {definitionCalibrationChangedFilterObjects.noPlan && (
        <DefinitionNoPlanChip modal={modal} planType="calibration" />
      )}
      {definitionCalibrationChangedFilterObjects.doesNotNeedPlan && (
        <DefinitionDoesNotNeedPlanChip modal={modal} planType="calibration" />
      )}
    </>
  );
};

export default FilteredList;
