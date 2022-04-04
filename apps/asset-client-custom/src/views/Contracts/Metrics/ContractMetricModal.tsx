import { CatDialog, CatDialogContent } from 'catamaran/core';
import { CircularProgress } from 'catamaran/core/mui';
import { MetricType } from 'store/slices/contracts/types';
import { clearInitialMetricForm, clearMetricForm } from 'store/slices/contracts/slice';
import { dequal } from 'dequal';
import { initializeContractMetric, updateContractMetric } from 'store/slices/contracts/actions';
import { isArrayNullOrEmpty } from 'utils';
import { metricDefinitions } from 'store/slices/contracts/data';
import { selectInitialMetric, selectMetric } from 'store/slices/contracts/selectors';
import { useEffect, useMemo } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { withDialogWrapper } from 'hooks/withDialogWrapper';
import DowntimeRules from './DowntimeRules/DowntimeRules';
import MetricGoals from './Goals/MetricGoals';
import PageHeader from './PageHeader';
import TimeTolerance from './TimeTolerance/TimeTolerances';
import ValidIntervals from './ValidIntervals/ValidIntervals';
import useLoading from 'hooks/useLoading';

type Props = {
  contractId?: string;
  editMode: boolean;
  metricType?: MetricType;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
};

function ContractMetricModal(props: Props) {
  const { contractId, editMode, metricType, onCancel, onClose, open, onConfirm } = props;

  const dispatch = useTypedDispatch();
  const metric = useTypedSelector((state) => selectMetric(state, metricType.id));
  const initialMetric = useTypedSelector((state) => selectInitialMetric(state, metricType.id));
  const metricChanged = !dequal(metric, initialMetric);
  const metricValid = useMemo(() => {
    const hasAnyEmptyStatus = metric?.downtimeRules.some((rule) =>
      isArrayNullOrEmpty(rule.statusIds)
    );
    return !hasAnyEmptyStatus;
  }, [metric]);

  const metricDefinition = useMemo(
    () => metricDefinitions.find((i) => i.metricType.name === metricType.name),
    [metricType.name]
  );

  const [saveLoading, saveLoadingDispatch] = useLoading();

  useEffect(() => {
    dispatch(initializeContractMetric(contractId, metricType, editMode));
  }, [contractId, dispatch, editMode, metricType]);

  useEffect(
    () => () => {
      if (!editMode) {
        dispatch(clearInitialMetricForm(metricType.id));
        dispatch(clearMetricForm(metricType.id));
      }
    },
    [dispatch, editMode, metricType.id]
  );

  const handleCancel = async () => {
    onCancel();
  };

  const handleClose = async () => {
    onClose();
  };

  const handleRevert = async () => {
    onClose();
  };

  const handleConfirm = async () => {
    await saveLoadingDispatch(updateContractMetric(contractId, metricType.id, metric));
    onConfirm();
  };

  return (
    <CatDialog onClose={handleClose} open={open} size="large">
      <PageHeader
        cancelVisible={!editMode}
        closeVisible={editMode && !metricChanged}
        contractId={contractId}
        deleteVisible={editMode && !metricChanged}
        metricType={metricType}
        onCancel={handleCancel}
        onClose={handleClose}
        onRevert={handleRevert}
        onSave={handleConfirm}
        revertVisible={editMode && metricChanged}
        saveDisabled={!metricValid}
        saveLoading={saveLoading}
        saveVisible={!editMode || (editMode && metricChanged)}
      />
      <CatDialogContent>
        <div className="grid">
          {metric ? (
            <>
              <ValidIntervals
                metric={metric}
                metricType={metricType}
                sectionProps={metricDefinition.properties?.validIntervals}
              />
              <div className="divider-horizontal mx24" />
              <DowntimeRules
                downtimeRules={metric.downtimeRules}
                metricType={metricType}
                sectionProps={metricDefinition.properties?.downtimeRules}
              />
              <div className="divider-horizontal mx24" />
              <TimeTolerance
                metricType={metricType}
                sectionProps={metricDefinition.properties?.timeTolerance}
                timeTolerance={metric.timeTolerance}
              />
              <div className="divider-horizontal mx24" />
              <MetricGoals
                goalForm={metric.goalForm}
                metricType={metricType}
                sectionProps={metricDefinition.properties?.metricGoals}
              />
            </>
          ) : (
            <div
              className="flex align-item-center justify-content-center"
              style={{ height: '200' }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      </CatDialogContent>
    </CatDialog>
  );
}
export default withDialogWrapper(ContractMetricModal);
