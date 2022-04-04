import { Box } from 'catamaran/core';
import { Contract } from 'store/slices/contracts/types';
import { Grid, Skeleton } from 'catamaran/core/mui';
import { SectionWrapperProps, withSectionWrapper } from '../withSectionWrapper';
import {
  createContractBasicInformation,
  getContractBasicInformation,
  updateContractBasicInformation
} from 'store/slices/contracts/actions';
import { selectContract, selectInitialContract } from 'store/slices/contracts/selectors';
import { setContractForm } from 'store/slices/contracts/slice';
import { useCallback, useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DisplayMode from './DisplayMode';
import EditMode from './EditMode';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = SectionWrapperProps & {
  className?: string;
  contractId?: string;
  disabled: boolean;
  isActive: boolean;
  onActivate: (active: boolean) => void;
};

function BasicContractInformation(props: Props) {
  const { className, disabled, contractId, isActive, onActivate } = props;

  const editContract = useTypedSelector(selectContract);
  const displayContract = useTypedSelector(selectInitialContract);
  const dispatch = useTypedDispatch();

  const [contractLoading, contractLoadingDispatch] = useLoading<Contract>();
  useEffect(() => {
    if (contractId) {
      contractLoadingDispatch(getContractBasicInformation(contractId));
    }
  }, [contractId, contractLoadingDispatch]);

  const handleCancel = useCallback(() => {
    dispatch(setContractForm(displayContract));
  }, [dispatch, displayContract]);

  const handleSave = useCallback(async () => {
    if (contractId) {
      await dispatch(updateContractBasicInformation());
    } else {
      await dispatch(createContractBasicInformation());
    }
  }, [contractId, dispatch]);

  const handleGoBack = () => onActivate(false);
  const handleEdit = () => onActivate(true);

  let componentContent = null;
  if (contractLoading) {
    componentContent = (
      <Box>
        <Box borderRadius="3px" mb={1}>
          <Skeleton height="20px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="3px" mb={1}>
          <Skeleton height="20px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="3px" mb={2}>
          <Skeleton height="20px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="8px">
          <Skeleton height="20px" variant="rectangular" width="120px" />
        </Box>
      </Box>
    );
  } else if (isActive) {
    componentContent = (
      <EditMode
        editContract={editContract}
        onCancel={handleCancel}
        onGoBack={handleGoBack}
        onSave={handleSave}
      />
    );
  } else {
    componentContent = <DisplayMode contract={displayContract} onEditClick={handleEdit} />;
  }

  return (
    <Grid
      className={clsx(className, disabled ? 'opacity-3 pointer-events-none' : '')}
      container
      direction="row"
    >
      <Box ml={5} width="100%">
        {componentContent}
      </Box>
    </Grid>
  );
}
export default withSectionWrapper(BasicContractInformation);
