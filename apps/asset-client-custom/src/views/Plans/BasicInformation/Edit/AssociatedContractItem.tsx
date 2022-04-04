import { Contract } from 'store/slices/contracts/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import ContractCard from 'views/Contracts/ContractCard';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  contract?: Contract;
};

function AssociatedContractItem(props: Props) {
  const classes = useStyles();
  const { className, contract } = props;

  const { t } = useTranslation();

  if (!contract) {
    return null;
  }

  return (
    <ContractCard
      className={clsx(classes.root, className)}
      color="blue"
      contractId={contract.id}
      height={112}
      title={t('plans.edit.associated_contract')}
    />
  );
}

export default AssociatedContractItem;
