import { CatAreaButton, CatTypography } from 'catamaran/core';
import { DowntimeRule, MetricType } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from 'views/Contracts/withSectionWrapper';
import { addDowntimeRuleToMetric } from 'store/slices/contracts/actions';
import { removeDownTimeRule } from 'store/slices/contracts/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useUniqueIds } from 'hooks/useUniqueIds';
import ConditionSimpleIcon from 'catamaran/icons/ConditionSimple';
import DowntimeRuleItem from './DowntimeRuleItem';

type Props = SectionWrapperProps & {
  metricType?: MetricType;
  downtimeRules: DowntimeRule[];
};

function DowntimeRules(props: Props) {
  const { metricType, downtimeRules } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleAddClick = () => {
    dispatch(addDowntimeRuleToMetric(metricType));
  };

  const handleDelete = (index: number) => {
    dispatch(removeDownTimeRule(index));
  };

  const ruleIds = useUniqueIds(downtimeRules.length);

  return (
    <div className="grid p24 gap-10">
      <div className="flex gap-8">
        <ConditionSimpleIcon fontSize="small" />
        <div className="grid gap-5">
          <CatTypography className="opacity-8" variant="subtitle1">
            {t('contracts.edit.metrics.downTimeRules.title')}
          </CatTypography>
          <CatTypography className="opacity-6" variant="body2">
            {t('contracts.edit.metrics.downTimeRules.desc')}
          </CatTypography>
        </div>
      </div>
      <div className="grid px16 gap-4" style={{ gridTemplateColumns: '120px 120px 1fr 1fr' }}>
        <CatTypography className="opacity-8 text-center" variant="caption">
          {t('contracts.edit.metrics.downTimeRules.work_type')}
        </CatTypography>
        <CatTypography className="opacity-8 text-center" variant="caption">
          {t('contracts.edit.metrics.downTimeRules.usability')}
        </CatTypography>
        <CatTypography className="opacity-8 pl24" variant="caption">
          {t('contracts.edit.metrics.downTimeRules.status')}
        </CatTypography>
        <CatTypography className="opacity-8" variant="caption">
          {t('contracts.edit.metrics.downTimeRules.delay_tolerance')}
        </CatTypography>
      </div>
      {downtimeRules.map((rule, index) => (
        <DowntimeRuleItem
          deleteDisabled={downtimeRules.length === 1}
          downtimeRule={rule}
          index={index}
          key={ruleIds[index]}
          metricType={metricType}
          onDelete={() => handleDelete(index)}
        />
      ))}
      <CatAreaButton onClick={handleAddClick} style={{ width: '360px' }}>
        {t('contracts.edit.metrics.downTimeRules.add_rule_button')}
      </CatAreaButton>
    </div>
  );
}

export default withSectionWrapper(DowntimeRules);
