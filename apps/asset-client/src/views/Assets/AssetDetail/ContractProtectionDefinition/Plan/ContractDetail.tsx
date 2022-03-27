import { Box } from 'catamaran/core';
import { Typography } from 'catamaran/core/mui';
import { getContractIconComponent } from 'views/Contracts/ContractIcon';
import { selectContractById } from 'store/slices/contracts/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CancelIcon from 'catamaran/icons/Cancel';
import LinkIcon from 'catamaran/icons/Link';
import React from 'react';

type Props = {
  className?: string;
  contractId?: string;
};

function ContractDetail(props: Props) {
  const { className, contractId } = props;

  const { t } = useTranslation();

  const associatedContract = useTypedSelector((state) => selectContractById(state, contractId));

  const associatedContractTypeResource = associatedContract?.type
    ? t(`contracts.types.${associatedContract.type}`)
    : '';

  const ContractTypeIcon = getContractIconComponent(associatedContract?.type);

  return (
    <Box alignItems="flex-end" className={className} col flex maxWidth="200px">
      <Typography variant="caption">
        <b>{t('plans.edit.associated_contract')}</b>
      </Typography>
      <Box height={4} />
      {!contractId ? (
        <Box alignItems="center" flex justifyContent="flex-end">
          <Typography variant="caption">{t('plans.edit.associated_contract_none')}</Typography>
          <CancelIcon color="darkGrey" contained={false} fontSize="small" hoverable={false} />
        </Box>
      ) : (
        <>
          <Box alignItems="center" className="w-full" flex justifyContent="flex-end">
            <Typography className="three-dot" variant="body2">
              {associatedContract?.title ?? ''}
            </Typography>
            <Box width={4} />
            <LinkIcon color="darkGrey" contained={false} fontSize="small" hoverable={false} />
          </Box>
          <Box alignItems="center" flex justifyContent="flex-end">
            <Typography variant="caption">{associatedContractTypeResource}</Typography>
            <Box width={4} />
            <ContractTypeIcon
              color="darkGrey"
              contained={false}
              fontSize="small"
              hoverable={false}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default ContractDetail;
