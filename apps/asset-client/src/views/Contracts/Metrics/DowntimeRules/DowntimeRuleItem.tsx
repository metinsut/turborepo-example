import { CatIconButton, CatTypography } from 'catamaran/core';
import { DowntimeRule, MetricType } from 'store/slices/contracts/types';
import { checkDefaultStatuses } from 'store/slices/contracts/actions';
import { selectAvailableStatuses } from 'store/slices/contracts/selectors';
import { updateDowntimeRuleSelectedStatusIds } from 'store/slices/contracts/slice';
import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DelayToleranceItem from './DelayTolerance/Item';
import DowntimeRuleResult from './DowntimeRuleResult';
import StatusMultiSelector from 'components/MultiSelector/StatusMultiSelector';
import TrashIcon from 'catamaran/icons/Trash';
import UsabilitySelector from './Usability/Selector';
import WorkTypeSelector from './WorkType/Selector';

type Props = {
  metricType?: MetricType;
  downtimeRule?: DowntimeRule;
  index?: number;
  onDelete?: () => void;
  deleteDisabled?: boolean;
};

function DowntimeRuleItem(props: Props) {
  const { metricType, downtimeRule, index, onDelete, deleteDisabled = false } = props;

  const dispatch = useTypedDispatch();

  const availableStatuses = useTypedSelector((state) =>
    selectAvailableStatuses(state, downtimeRule.workType)
  );

  const handleMultiSelectorChange = (statusIds: string[]) => {
    dispatch(
      updateDowntimeRuleSelectedStatusIds({ downtimeRuleIndex: index, metricType, statusIds })
    );
  };

  useEffect(() => {
    if (!downtimeRule.isDefaultStatusSet) {
      dispatch(
        checkDefaultStatuses(downtimeRule.defaultStatusKeys, availableStatuses, index, metricType)
      );
    }
  }, [
    availableStatuses,
    dispatch,
    downtimeRule.defaultStatusKeys,
    downtimeRule.isDefaultStatusSet,
    index,
    metricType
  ]);

  return (
    <div className="grid radius-24 bg-lightGrey">
      <div
        className="grid grid-auto-flow-column justify-item-start gap-4 p16"
        style={{ gridTemplateColumns: '120px 120px 1fr 1fr auto' }}
      >
        <WorkTypeSelector downtimeRule={downtimeRule} index={index} metricType={metricType} />
        {downtimeRule.workType === 'breakdown' ? (
          <UsabilitySelector downtimeRule={downtimeRule} index={index} metricType={metricType} />
        ) : (
          <div />
        )}
        <StatusMultiSelector
          availableStatuses={availableStatuses}
          onChange={handleMultiSelectorChange}
          statusIds={downtimeRule.statusIds}
        />
        <DelayToleranceItem downtimeRule={downtimeRule} index={index} metricType={metricType} />
        <CatIconButton disabled={deleteDisabled} onClick={onDelete}>
          <TrashIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      </div>
      <div className="divider-horizontal" />
      <CatTypography className="opacity-6 p16" variant="body2">
        <DowntimeRuleResult downtimeRule={downtimeRule} metricType={metricType} />
      </CatTypography>
    </div>
  );
}

export default DowntimeRuleItem;
