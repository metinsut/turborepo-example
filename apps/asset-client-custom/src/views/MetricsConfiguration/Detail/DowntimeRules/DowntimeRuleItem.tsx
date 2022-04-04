import { CatIconButton, CatTypography } from 'catamaran/core';
import { DowntimeRule } from 'store/slices/contracts/types';
import {
  downTimeRuleStatusIdsUpdated,
  downtimeRuleRemoved
} from 'store/slices/metricsConfiguration/detail/slice';
import { getStatuses } from 'store/slices/metricsConfiguration/detail/action';
import {
  selectAvailableStatuses,
  selectMetricMainCategoryId
} from 'store/slices/metricsConfiguration/detail/selectors';
import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DowntimeRuleResult from './DowntimeRuleResult';
import StatusMultiSelector from 'components/MultiSelector/StatusMultiSelector';
import TrashIcon from 'catamaran/icons/Trash';
import UsabilitySelector from './Usability/Selector';
import WorkTypeSelector from './WorkType/Selector';

type Props = {
  downtimeRule?: DowntimeRule;
  index?: number;
  deleteDisabled?: boolean;
};

const DowntimeRuleItem = (props: Props) => {
  const { downtimeRule, index, deleteDisabled = false } = props;
  const dispatch = useTypedDispatch();

  const availableStatuses = useTypedSelector((state) =>
    selectAvailableStatuses(state, downtimeRule.workType)
  );
  const mainCategoryId = useTypedSelector(selectMetricMainCategoryId);

  useEffect(() => {
    if (!availableStatuses) {
      dispatch(getStatuses(downtimeRule.workType, mainCategoryId));
    }
  }, [dispatch, mainCategoryId, availableStatuses, downtimeRule.workType]);

  const handleRemoveDownTimeItem = () => {
    dispatch(downtimeRuleRemoved(index));
  };

  const handleMultiSelectorChange = (statusIds: string[]) => {
    dispatch(downTimeRuleStatusIdsUpdated({ index, statusesIds: statusIds }));
  };

  return (
    <div className="grid radius-24 bg-lightGrey">
      <div
        className="grid grid-auto-flow-column justify-item-start gap-4 p16"
        style={{ gridTemplateColumns: '120px 120px 1fr 1fr auto' }}
      >
        <WorkTypeSelector downtimeRule={downtimeRule} index={index} />
        {downtimeRule.workType === 'breakdown' ? (
          <UsabilitySelector downtimeRule={downtimeRule} index={index} />
        ) : (
          <div />
        )}
        <StatusMultiSelector
          availableStatuses={availableStatuses}
          onChange={handleMultiSelectorChange}
          statusIds={downtimeRule.statusIds}
        />
        <div />
        <CatIconButton
          className="align-self-start"
          disabled={deleteDisabled}
          onClick={handleRemoveDownTimeItem}
        >
          <TrashIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      </div>
      <div className="divider-horizontal" />
      <CatTypography className="opacity-6 p16" variant="body2">
        <DowntimeRuleResult downtimeRule={downtimeRule} />
      </CatTypography>
    </div>
  );
};

export default DowntimeRuleItem;
