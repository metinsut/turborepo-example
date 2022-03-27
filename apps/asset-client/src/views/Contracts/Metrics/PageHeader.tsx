import { CatDialogTitle, CatIconButton } from 'catamaran/core';
import { MetricType } from 'store/slices/contracts/types';
import { deleteContractMetric } from 'store/slices/contracts/actions';
import { setSelectedMetricType } from 'store/slices/contracts/slice';
import { useDialogState, useTypedDispatch } from 'hooks';
import { useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import MetricDeleteModal from './ReadonlyMetricCard/MetricDeleteModal';
import MetricIcon from './MetricIcon';
import RevertIcon from 'catamaran/icons/Revert';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  cancelVisible?: boolean;
  closeVisible?: boolean;
  deleteVisible?: boolean;
  metricType?: MetricType;
  onCancel?: () => Promise<void>;
  onClose?: () => Promise<void>;
  onRevert?: () => Promise<void>;
  onSave?: () => Promise<void>;
  revertVisible?: boolean;
  saveDisabled?: boolean;
  saveLoading?: boolean;
  saveVisible?: boolean;
  contractId?: string;
};

function PageHeader(props: Props) {
  const {
    cancelVisible,
    closeVisible,
    deleteVisible,
    metricType,
    onCancel,
    onClose,
    onRevert,
    onSave,
    revertVisible,
    saveDisabled,
    saveLoading,
    saveVisible,
    contractId
  } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const { isOpen, togglePopup } = useDialogState();

  const metricTypeResource = metricType.isDefault
    ? t(`contracts.edit.metrics.types.${metricType.name}`)
    : metricType.name;

  const handleDeleteMetric = () => {
    const { id } = metricType;
    dispatch(deleteContractMetric(contractId, id));
    dispatch(setSelectedMetricType(undefined));
    togglePopup();
  };

  const actionArea = () => (
    <>
      {cancelVisible && (
        <CatIconButton onClick={onCancel}>
          <CancelIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      )}
      {deleteVisible && (
        <CatIconButton onClick={() => togglePopup()}>
          <TrashIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      )}
      {revertVisible && (
        <CatIconButton onClick={onRevert}>
          <RevertIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      )}
      {saveVisible && (
        <CatIconButton disabled={saveDisabled} loading={saveLoading} onClick={onSave}>
          <CheckIcon color="green" contained fontSize="medium" />
        </CatIconButton>
      )}
      {closeVisible && (
        <CatIconButton onClick={onClose}>
          <CancelIcon color="darkGrey" contained fontSize="medium" />
        </CatIconButton>
      )}
    </>
  );

  const iconComponent = () => <MetricIcon metricType={metricType} />;

  return (
    <>
      <CatDialogTitle
        actionArea={actionArea()}
        iconComponent={iconComponent}
        title={t('contracts.edit.metrics.modal_header', { type: metricTypeResource })}
      />
      <MetricDeleteModal
        onCancel={() => togglePopup()}
        onDelete={handleDeleteMetric}
        open={isOpen}
      />
    </>
  );
}

export default PageHeader;
