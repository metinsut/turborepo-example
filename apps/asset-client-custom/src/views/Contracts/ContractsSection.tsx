import { clearContractForm, clearInitialContractForm } from 'store/slices/contracts/slice';
import { getAllContractBasics } from 'store/slices/contracts/actions';
import { selectAllContracts } from 'store/slices/contracts/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ContractList from './ContractList';
import ContractsPageModal from './ContractsPageModal';
import React, { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

function ContractsSection() {
  const dispatch = useTypedDispatch();

  const [contractsLoading, contractsLoadingDispatch] = useLoading();
  const contracts = useTypedSelector(selectAllContracts);

  useEffect(() => {
    contractsLoadingDispatch(getAllContractBasics());
  }, [contractsLoadingDispatch]);

  const [contractEditOpen, setContractEditOpen] = React.useState(false);
  const [contractEditId, setContractEditId] = React.useState('');

  const handleContractEditClick = React.useCallback((contractId: string) => {
    setContractEditId(contractId);
    setContractEditOpen(true);
  }, []);

  const handleEditClose = React.useCallback(() => {
    setContractEditOpen(false);
    dispatch(clearContractForm());
    dispatch(clearInitialContractForm());
  }, [dispatch]);

  return (
    <>
      <ContractList
        contracts={contracts}
        loading={contractsLoading}
        onContractEdit={handleContractEditClick}
      />
      <ContractsPageModal id={contractEditId} onClose={handleEditClose} open={contractEditOpen} />
    </>
  );
}

export default ContractsSection;
