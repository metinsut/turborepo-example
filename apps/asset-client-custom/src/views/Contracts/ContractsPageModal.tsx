import { CatDialog, CatDialogContent } from 'catamaran/core';
import {
  checkContractExistsFromStore,
  deleteContract,
  disassociateContract,
  initializeContractModal
} from 'store/slices/contracts/actions';
import { clearInitialContractForm } from 'store/slices/contracts/slice';
import { contractDefinitions } from 'store/slices/contracts/data';
import { selectContract } from 'store/slices/contracts/selectors';
import { selectIsContractAssociatedWithAsset } from 'store/slices/asset/detail/selectors';
import { updateSelectedContract } from 'store/slices/contractplans/wizard/slice';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import BasicContractInformation from './BasicInformation/BasicContractInformation';
import ContractMetrics from './Metrics/ContractMetrics';
import ContractPageHeader from './ContractPageHeader';
import CostInformation from './Cost/CostInformation';
import FirmInformation from './Firm/FirmInformation';
import PartsPolicy from './PartsPolicy/PartsPolicyInformation';
import React, { useEffect, useMemo, useState } from 'react';

type Props = {
  className?: string;
  id?: string;
  onClose?: () => void;
  onConfirm?: () => Promise<void>;
  open: boolean;
};

type Section = '' | 'basicInfo' | 'firm' | 'cost' | 'partsPolicy' | 'metric';
function ContractsPageModal({ className, id, open, onClose, onConfirm }: Props) {
  const dispatch = useTypedDispatch();
  const contract = useTypedSelector(selectContract);
  const [activeSection, setActiveSection] = useState<Section>(id ? '' : 'basicInfo');
  const contractDefinition = useMemo(
    () => contractDefinitions.find((i) => i.contractType === contract.type),
    [contract.type]
  );

  const isAssociated = useTypedSelector((state) =>
    selectIsContractAssociatedWithAsset(state, contract.id)
  );

  useEffect(() => {
    if (id) {
      dispatch(initializeContractModal(id));
    }
  }, [dispatch, id]);

  useEffect(
    () => () => {
      dispatch(clearInitialContractForm());
    },
    [dispatch]
  );

  const handleConfirm = async () => {
    dispatch(updateSelectedContract(contract.id));
    await onConfirm();
  };

  const handleDelete = async () => {
    await dispatch(deleteContract(contract.id));
    await onClose();
  };

  const handleDisassociate = React.useCallback(async () => {
    await dispatch(disassociateContract(contract.id));
  }, [dispatch, contract.id]);

  if (id && contract.id !== id) {
    return null;
  }

  const getSectionProps = (sectionType: Section) => ({
    disabled: activeSection !== sectionType && activeSection !== '',
    isActive: activeSection === sectionType,
    onActivate: async (active: boolean) => {
      if (activeSection === 'basicInfo' && !active) {
        // If there is no contract information, close the popup on cancel - goback
        const contractExists = await dispatch(checkContractExistsFromStore());
        if (!contractExists) {
          onClose();
          return;
        }
      }

      setActiveSection(active ? sectionType : '');
    }
  });

  const isEditing = activeSection !== '';
  const disassociateDisabled = isEditing || !isAssociated;

  return (
    <CatDialog className={className} onClose={onClose} open={open} size="large">
      <ContractPageHeader
        closeDisabled={isEditing}
        confirmDisabled={isEditing}
        contract={contract}
        deleteDisabled={isEditing}
        disassociateDisabled={disassociateDisabled}
        mode={id ? 'edit' : 'add'}
        onClose={onClose}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        onDisassociate={handleDisassociate}
      />
      <CatDialogContent className="grid gap-16">
        <BasicContractInformation
          contractId={contract.id}
          sectionProps={contractDefinition.properties?.basicInformation}
          {...getSectionProps('basicInfo')}
        />
        <CostInformation
          contractId={contract.id}
          sectionProps={contractDefinition.properties?.contractCost}
          {...getSectionProps('cost')}
        />
        <FirmInformation
          contractId={contract.id}
          sectionProps={contractDefinition.properties?.firm}
          {...getSectionProps('firm')}
        />
        <PartsPolicy
          contractId={contract.id}
          sectionProps={contractDefinition.properties?.partsPolicy}
          {...getSectionProps('partsPolicy')}
        />
        <ContractMetrics
          contractId={contract.id}
          sectionProps={contractDefinition.properties?.conditions}
          {...getSectionProps('metric')}
        />
      </CatDialogContent>
    </CatDialog>
  );
}

export default withDialogWrapper(ContractsPageModal);
