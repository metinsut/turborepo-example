import { Box, CatIconButton } from 'catamaran/core';
import { MetricType } from 'store/slices/contracts/types';
import { Typography } from 'catamaran/core/mui';
import { deleteContractMetric } from 'store/slices/contracts/actions';
import { useDialogState, useTypedDispatch } from 'hooks';
import { useTranslation } from 'react-i18next';
import EditIcon from 'catamaran/icons/Edit';
import MetricDeleteModal from './MetricDeleteModal';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  onEdit: () => void;
  metricType: MetricType;
  contractId: string;
};

function Header(props: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const { isOpen, togglePopup } = useDialogState();

  const { onEdit, metricType, contractId } = props;

  const metricTypeResource = metricType.isDefault
    ? t(`contracts.edit.metrics.types.${metricType.name}`)
    : metricType.name;

  const handleDeleteMetric = () => {
    dispatch(deleteContractMetric(contractId, metricType.id));
    togglePopup();
  };

  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        paddingBottom={1}
      >
        <Typography variant="body1">{metricTypeResource}</Typography>
        <Box display="flex" flexDirection="row">
          <CatIconButton onClick={() => togglePopup()}>
            <TrashIcon color="red" />
          </CatIconButton>
          <Box px="4px" />
          <CatIconButton onClick={onEdit}>
            <EditIcon color="blue" />
          </CatIconButton>
        </Box>
      </Box>
      <MetricDeleteModal
        onCancel={() => togglePopup()}
        onDelete={handleDeleteMetric}
        open={isOpen}
      />
    </>
  );
}

export default Header;
