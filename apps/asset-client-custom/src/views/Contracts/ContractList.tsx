import { CatButton } from 'catamaran/core';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  makeStyles
} from 'catamaran/core/mui';
import { Contract } from 'store/slices/contracts/types';
import { startContractFlow } from 'store/slices/contractplans/wizard/slice';
import { useTranslation } from 'react-i18next';
import ContractListRow from './ContractListRow';
import ContractPlanWizard from './ContractWizard/ContractPlanWizard';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  headerRow: {
    '& .MuiTableCell-head': {
      backgroundColor: '#fafafa'
    }
  },
  root: {
    borderRadius: theme.spacing(2),
    height: '38vh'
  }
}));

type Props = {
  className?: string;
  contracts?: Contract[];
  loading?: boolean;
  onContractEdit: (contractId: string) => void;
};

function ContractList(props: Props) {
  const classes = useStyles();
  const { className, contracts, loading, onContractEdit } = props;

  const { t } = useTranslation();
  const [addButtonLoading, addButtonLoadingDispatch] = useLoading();

  const [contractWizardOpen, setContractWizardOpen] = React.useState(false);
  const handleContractWizardOpen = async () => {
    await addButtonLoadingDispatch(startContractFlow());
    setContractWizardOpen(true);
  };

  const handleClose = () => {
    setContractWizardOpen(false);
  };

  return (
    <>
      <TableContainer className={clsx(classes.root, className)} component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead className={classes.headerRow}>
            <TableRow>
              <TableCell>{t('contracts.contract_list.contract_list_title')}</TableCell>
              <TableCell align="right">{t('contracts.type_field')}</TableCell>
              <TableCell align="right">{t('contracts.notes_field')}</TableCell>
              <TableCell align="right">{t('contracts.start_date_field')}</TableCell>
              <TableCell align="right">{t('contracts.end_date_field')}</TableCell>
              <TableCell align="right">
                <CatButton
                  color="green"
                  endIcon={<PlusIcon />}
                  loading={addButtonLoading}
                  onClick={handleContractWizardOpen}
                >
                  {t('contracts.contract_list.add_new_button')}
                </CatButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((contract) => (
              <ContractListRow
                contract={contract}
                key={contract.id}
                onContractEdit={onContractEdit}
              />
            ))}

            {loading && (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ContractPlanWizard onClose={handleClose} open={contractWizardOpen} />
    </>
  );
}

export default ContractList;
