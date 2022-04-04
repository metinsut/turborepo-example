import {
  Box,
  CatCardIconButton,
  CatCenterIcon,
  CatCornerContent,
  CatDataCard,
  CatIconButton,
  CatMainContent,
  CatSidebar,
  CatTypography,
  useLocalizationHelpers
} from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { disassociateContract } from 'store/slices/contracts/actions';
import { getContractIconComponent } from 'views/Contracts/ContractIcon';
import { selectContractById } from 'store/slices/contracts/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ContractDisassociateDialog from 'views/Contracts/ContractDisassociateDialog';
import ContractsPageModal from 'views/Contracts/ContractsPageModal';
import DownloadIcon from 'catamaran/icons/Download';
import EditIcon from 'catamaran/icons/Edit';
import React, { useState } from 'react';
import UnlinkIcon from 'catamaran/icons/Unlink';
import theme from 'catamaran/theme';

type Props = {
  className?: string;
  contractId?: string;
};

function ContractCard(props: Props) {
  const { className, contractId } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const { formatDate } = useLocalizationHelpers();

  const contract = useTypedSelector((state) => selectContractById(state, contractId));
  const [disassociateDialogOpen, setDisassociateDialogOpen] = useState(false);

  const handleDisassociate = React.useCallback(async () => {
    await dispatch(disassociateContract(contract?.id));
  }, [dispatch, contract?.id]);

  const handleDisassociateDialogClose = () => {
    setDisassociateDialogOpen(false);
  };

  const handleDisassociateDialogOpen = () => {
    setDisassociateDialogOpen(true);
  };

  const handleDownloadClick = () => {};

  const [detailOpen, setDetailOpen] = React.useState(false);
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const handleDetailOpen = () => {
    setDetailOpen(true);
  };

  if (!contract) {
    return null;
  }

  return (
    <>
      <CatDataCard className={className} color="blue" minHeight="117px">
        {(hover) => (
          <>
            <CatSidebar>
              <CatCardIconButton onClick={handleDetailOpen}>
                <EditIcon color="lightBlue" />
              </CatCardIconButton>
              <CatCenterIcon component={getContractIconComponent(contract.type)} />
              <CatCardIconButton onClick={handleDisassociateDialogOpen}>
                <UnlinkIcon color="red" />
              </CatCardIconButton>
            </CatSidebar>
            <CatMainContent
              col
              color={theme.palette.blue.main}
              flex
              justifyContent="space-between"
              minWidth={0}
            >
              <Box col flex>
                <CatTypography
                  className="three-dot"
                  color={!hover ? 'inherit' : 'initial'}
                  variant="h2"
                >
                  {contract.title}
                </CatTypography>
                <CatTypography style={{ opacity: 0.8 }} variant="body1">
                  {t('contracts.item.type_field_2', {
                    type: t(`contracts.types.${contract?.type}`)
                  })}
                </CatTypography>
              </Box>
              <Box col flex>
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="contracts.item.start_date_field"
                    t={t}
                    values={{ date: formatDate(contract.startDate) }}
                  />
                </CatTypography>
                <Box height={3} />
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="contracts.item.end_date_field"
                    t={t}
                    values={{ date: formatDate(contract.endDate) }}
                  />
                </CatTypography>
              </Box>
              <CatCornerContent>
                <Box center color={theme.palette.blue.main} flex>
                  <CatTypography color="inherit" variant="caption">
                    {t('contracts.item.contract_document')}
                  </CatTypography>
                  <Box width={4} />
                  <CatIconButton onClick={handleDownloadClick}>
                    <DownloadIcon color="blue" />
                  </CatIconButton>
                </Box>
              </CatCornerContent>
            </CatMainContent>
          </>
        )}
      </CatDataCard>
      <ContractsPageModal id={contract.id} onClose={handleDetailClose} open={detailOpen} />
      <ContractDisassociateDialog
        contractId={contract.id}
        onCancel={handleDisassociateDialogClose}
        onDisassociate={handleDisassociate}
        open={disassociateDialogOpen}
      />
    </>
  );
}

export default ContractCard;
