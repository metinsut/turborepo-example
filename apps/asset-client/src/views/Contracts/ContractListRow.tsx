import { CatIconButton, useLocalizationHelpers } from 'catamaran/core';
import { Contract } from 'store/slices/contracts/types';
import { TableCell, TableRow, Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import EditIcon from 'catamaran/icons/Edit';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginLeft: '3px'
  },
  root: {
    cursor: 'pointer'
  }
}));

type Props = {
  className?: string;
  contract: Contract;
  onContractEdit: (contractId: string) => void;
};

function ContractListRow(props: Props) {
  const classes = useStyles();
  const { className, contract, onContractEdit } = props;
  const { t } = useTranslation();

  const contractTypeResource = contract ? t(`contracts.types.${contract.type}`) : '';
  const { formatDate } = useLocalizationHelpers();

  return (
    <TableRow
      className={clsx(className, classes.root)}
      hover
      onClick={() => onContractEdit(contract.id)}
    >
      <TableCell className="break-word" component="th" scope="row">
        {contract.title}
      </TableCell>
      <TableCell align="right">{contractTypeResource}</TableCell>
      <TableCell align="right" className="break-word">
        {contract.notes}
      </TableCell>
      <TableCell align="right">{formatDate(contract.startDate)}</TableCell>
      <TableCell align="right">{formatDate(contract.endDate)}</TableCell>
      <TableCell align="right">
        <CatIconButton className={classes.iconButton}>
          <EditIcon color="blue" contained fontSize="medium" />
        </CatIconButton>
      </TableCell>
    </TableRow>
  );
}

export default ContractListRow;
