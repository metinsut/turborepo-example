import { Box } from 'catamaran/core';
import { CircularProgress, Grid, Typography } from 'catamaran/core/mui';
import { MetricType } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from '../withSectionWrapper';
import { getContractMetricTypes } from 'store/slices/contracts/actions';
import {
  selectAvailableMetricTypes,
  selectSelectedMetricType
} from 'store/slices/contracts/selectors';
import { setSelectedMetricType } from 'store/slices/contracts/slice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AddButtonSkeleton from './AddButtonSkeleton';
import AddSection from './AddSection';
import CalculationIcon from 'catamaran/icons/Calculation';
import ContractMetricModal from './ContractMetricModal';
import ReadonlySection from './ReadonlySection';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = SectionWrapperProps & {
  className?: string;
  contractId?: string;
  disabled: boolean;
  onActivate: (active: boolean) => void;
};

function ContractMetrics(props: Props) {
  const { className, contractId, disabled, onActivate } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedMetricType = useTypedSelector(selectSelectedMetricType);
  const [metricTypesLoading, metricTypesLoadingDispatch] = useLoading();
  const availableMetricTypes = useTypedSelector(selectAvailableMetricTypes);
  const [editMode, setEditMode] = useState<boolean>();

  const fetchAvailableMetrics = useCallback(() => {
    if (contractId) {
      metricTypesLoadingDispatch(getContractMetricTypes(contractId));
    }
  }, [contractId, metricTypesLoadingDispatch]);

  useEffect(() => {
    fetchAvailableMetrics();
  }, [fetchAvailableMetrics]);

  const metricTypesToAdd = useMemo(
    () => availableMetricTypes.filter((i) => !i.isMetricExist),
    [availableMetricTypes]
  );

  const existingMetricTypes = useMemo(
    () => availableMetricTypes.filter((i) => i.isMetricExist),
    [availableMetricTypes]
  );

  const handleOpen = (metricType: MetricType, editMode: boolean) => {
    onActivate(true);
    setEditMode(editMode);
    dispatch(setSelectedMetricType(metricType));
  };

  const handleClose = () => {
    onActivate(false);
    dispatch(setSelectedMetricType(undefined));
  };

  const handleConfirm = async () => {
    await fetchAvailableMetrics();
    handleClose();
  };

  return (
    <>
      <div className="divider-horizontal ml40" />
      <Grid
        className={clsx(className, disabled ? 'opacity-3 pointer-events-none' : '')}
        container
        direction="row"
      >
        <Grid container direction="row">
          <CalculationIcon
            className="opacity-8"
            color="darkGrey"
            contained={false}
            hoverable={false}
          />
          <div className="grid gap-8 ml16 mt4">
            <Typography className="opacity-8" variant="subtitle1">
              {t('contracts.edit.metrics.title')}
            </Typography>
            <Typography className="opacity-8" variant="body1">
              {t('contracts.edit.metrics.desc')}
            </Typography>
          </div>
          <Grid item xs />
          {metricTypesLoading && availableMetricTypes.length > 0 && (
            <Box margin={2}>
              <CircularProgress size={20} />
            </Box>
          )}
        </Grid>
        {availableMetricTypes.length === 0 ? (
          <Box flex flexDirection="row" flexWrap="wrap">
            <AddButtonSkeleton />
            <AddButtonSkeleton />
            <AddButtonSkeleton />
            <AddButtonSkeleton />
          </Box>
        ) : (
          <>
            <Box ml={5} width="100%">
              <AddSection
                metricTypes={metricTypesToAdd}
                onAddClick={(metricType) => handleOpen(metricType, false)}
              />
            </Box>
            <Box ml={5} width="100%">
              <ReadonlySection
                contractId={contractId}
                metricTypes={existingMetricTypes}
                onEdit={(metricType) => handleOpen(metricType, true)}
              />
            </Box>
          </>
        )}
      </Grid>
      {selectedMetricType && (
        <ContractMetricModal
          contractId={contractId}
          editMode={editMode}
          metricType={selectedMetricType}
          onCancel={handleClose}
          onClose={handleClose}
          onConfirm={handleConfirm}
          open={!!selectedMetricType}
        />
      )}
    </>
  );
}

export default withSectionWrapper(ContractMetrics);
