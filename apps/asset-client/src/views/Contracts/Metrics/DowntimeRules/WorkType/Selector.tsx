import { CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { DowntimeRule, MetricType } from 'store/slices/contracts/types';
import { WorkType } from 'store/slices/common/types';
import { updateDowntimeRuleWorkType } from 'store/slices/contracts/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { workTypes } from 'store/slices/contracts/data';
import WorkTypeIcon from './Icon';

type Props = {
  metricType: MetricType;
  downtimeRule: DowntimeRule;
  index: number;
};

function WorkTypeSelector(props: Props) {
  const { metricType, downtimeRule, index } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleChange = (event: any) => {
    const workType = event.target.value;
    const selectedWorkType = workTypes.find((i) => i === workType);
    dispatch(
      updateDowntimeRuleWorkType({
        downtimeRuleIndex: index,
        metricType,
        workType: selectedWorkType
      })
    );
  };

  return (
    <CatSelect
      densed
      displayEmpty
      fullWidth
      onChange={handleChange}
      renderValue={(selected) => {
        const workType = selected as WorkType;
        return (
          <div className="flex align-items-center">
            <WorkTypeIcon fontSize="small" workType={workType} />
            <CatTypography className="three-dot opacity-8 ml8" variant="caption">
              {t(`contracts.edit.metrics.downTimeRules.work_types.${workType}`)}
            </CatTypography>
          </div>
        );
      }}
      value={downtimeRule.workType ?? ''}
    >
      <CatMenuItem disabled key="" value="">
        {t('common.dropdown_generic_hint')}
      </CatMenuItem>
      {workTypes.map((workType) => (
        <CatMenuItem key={workType} value={workType}>
          <WorkTypeIcon fontSize="small" workType={workType} />
          <CatTypography className="three-dot" variant="body2">
            {t(`contracts.edit.metrics.downTimeRules.work_types.${workType}`)}
          </CatTypography>
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export default WorkTypeSelector;
