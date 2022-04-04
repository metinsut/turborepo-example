import { CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { DowntimeRule } from 'store/slices/contracts/types';
import { WorkType } from 'store/slices/common/types';
import { downtimeRuleWorkTypeUpdated } from 'store/slices/metricsConfiguration/detail/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { workTypes } from 'store/slices/contracts/data';
import WorkTypeIcon from './Icon';

type Props = {
  downtimeRule: DowntimeRule;
  index: number;
};

function WorkTypeSelector(props: Props) {
  const { downtimeRule, index } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const handleChange = (event: any) => {
    const workType = event.target.value;
    const selectedWorkType = workTypes.find((i) => i === workType);
    dispatch(
      downtimeRuleWorkTypeUpdated({
        index,
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
              {t(`metrics_configuration.detail.down_time_rules.work_types.${workType}`)}
            </CatTypography>
          </div>
        );
      }}
      value={downtimeRule.workType ?? ''}
    >
      <CatMenuItem disabled key="" value="">
        <CatTypography className="three-dot">{t('common.dropdown_generic_hint')}</CatTypography>
      </CatMenuItem>
      {workTypes.map((workType) => (
        <CatMenuItem disabled={workType !== 'breakdown'} key={workType} value={workType}>
          <WorkTypeIcon fontSize="small" workType={workType} />
          <CatTypography className="three-dot" variant="body2">
            {t(`metrics_configuration.detail.down_time_rules.work_types.${workType}`)}
          </CatTypography>
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export default WorkTypeSelector;
