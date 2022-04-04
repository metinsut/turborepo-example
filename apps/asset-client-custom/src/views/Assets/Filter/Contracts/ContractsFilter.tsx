import { Box, CatAccordionPanel } from 'catamaran/core';
import { Paper } from 'catamaran/core/mui';
import { selectDraftFilterNoContractAssigned } from 'store/slices/asset/filter/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CollapsableButton from 'components/CollapsableButton';
import ContractContactFilter from './ContractContactFilter';
import ContractFirmFilter from './ContractFirmFilter';
import ContractIcon from 'catamaran/icons/Contract';
import ContractTypeFilter from './ContractTypeFilter';
import DoesNotHaveContractFilter from './DoesNotHaveContractFilter';
import EndDateFilter from './EndDateFilter';
import PartsPolicyFilter from './PartsPolicyFilter';
import React, { useState } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  drawerOpen: boolean;
};

function ContractsFilter(props: Props) {
  const { className, drawerOpen } = props;
  const [open, setOpen] = useState(false);
  const noContract = useTypedSelector(selectDraftFilterNoContractAssigned);

  const { t } = useTranslation();

  return (
    <Paper className={clsx('w-full', className)} elevation={0}>
      <CatAccordionPanel
        defaultExpanded
        icon={<ContractIcon color="darkGrey" hoverable={false} />}
        title={t('assets.assetFilter.contracts')}
      >
        <Box center flex flexDirection="column" width="100%">
          <ContractTypeFilter className="mb12" disabled={noContract} />
          <ContractFirmFilter disabled={noContract} />
          <CollapsableButton
            className="mb12"
            disabled={noContract}
            open={noContract ? false : open}
            setOpen={setOpen}
          >
            {drawerOpen && <EndDateFilter className="mb12" />}
            <ContractContactFilter />
            <PartsPolicyFilter className="mb12" />
          </CollapsableButton>
          <DoesNotHaveContractFilter />
        </Box>
      </CatAccordionPanel>
    </Paper>
  );
}

export default ContractsFilter;
