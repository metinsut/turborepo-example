import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import ContractCard from 'views/Contracts/ContractCard';
import React from 'react';
import UnlinkIcon from 'catamaran/icons/Unlink';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  contractId?: string;
};

function ExistingContractCard(props: Props) {
  const classes = useStyles();
  const { className, contractId } = props;

  const { t } = useTranslation();

  return (
    <ContractCard
      className={clsx(className, classes.root)}
      color="red"
      contractId={contractId}
      iconComponent={UnlinkIcon}
      title={
        <Trans
          components={{ bold: <b /> }}
          i18nKey="contracts.wizard.existing_contract_header"
          t={t}
        />
      }
      transparentBackground
    />
  );
}

export default ExistingContractCard;
