import { DelayTolerance, DowntimeRule, MetricType, TimeType } from 'store/slices/contracts/types';
import {
  updateDowntimeRuleDelayTolerance,
  updateDowntimeRuleDelayToleranceTimeType,
  updateDowntimeRuleDelayToleranceValue
} from 'store/slices/contracts/slice';
import { useTypedDispatch } from 'hooks';
import DelayTolerancePicker from './Picker';
import TimeIntervalPicker from '../../Goals/Item/TimeIntervalPicker';

type Props = {
  metricType: MetricType;
  downtimeRule: DowntimeRule;
  index: number;
};

function DelayToleranceItem(props: Props) {
  const { metricType, downtimeRule, index } = props;
  const dispatch = useTypedDispatch();

  const handleTimeTypeChange = (timeType: TimeType) => {
    dispatch(
      updateDowntimeRuleDelayToleranceTimeType({
        downtimeRuleIndex: index,
        metricType,
        timeType
      })
    );
  };

  const handleTimeValueChange = (timeValue: number) => {
    dispatch(
      updateDowntimeRuleDelayToleranceValue({
        downtimeRuleIndex: index,
        metricType,
        timeValue
      })
    );
  };

  const handleDelayToleranceTypeChange = (delayTolerance: DelayTolerance) => {
    dispatch(
      updateDowntimeRuleDelayTolerance({
        delayTolerance,
        downtimeRuleIndex: index,
        metricType
      })
    );
  };

  return (
    <div className="grid grid-auto-flow-column gap-8 align-content-start">
      <DelayTolerancePicker
        downtimeRule={downtimeRule}
        onDelayToleranceChange={handleDelayToleranceTypeChange}
      />
      {(downtimeRule.delayTolerance === 'annualTask' ||
        downtimeRule.delayTolerance === 'everyTask') && (
        <TimeIntervalPicker
          onTimeTypeChange={handleTimeTypeChange}
          onTimeValueChange={handleTimeValueChange}
          timeType={downtimeRule.delayToleranceTimeType}
          timeValue={downtimeRule.delayToleranceTimeValue}
        />
      )}
    </div>
  );
}

export default DelayToleranceItem;
