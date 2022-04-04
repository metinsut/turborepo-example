import { CatAreaButton, CatTypography } from 'catamaran/core';
import { Collapse } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { downtimeRuleAdded } from 'store/slices/metricsConfiguration/detail/slice';
import { selectDraftDowntimeRules } from 'store/slices/metricsConfiguration/detail/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ConditionSimpleIcon from 'catamaran/icons/ConditionSimple';
import DowntimeRuleItem from './DowntimeRuleItem';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';

const DowntimeRules = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const downtimeRules = useTypedSelector(selectDraftDowntimeRules);

  const handleAddClick = () => {
    dispatch(downtimeRuleAdded());
  };

  return (
    <div className="grid p24 gap-10">
      <div className="grid gap-8">
        <div className="flex gap-8 aligm-items-center">
          <ConditionSimpleIcon fontSize="small" />
          <CatTypography className="opacity-8" variant="subtitle1">
            <Trans i18nKey="metrics_configuration.detail.down_time_rules.title" t={t} />
          </CatTypography>
        </div>
        <CatTypography className="opacity-6 ml24" variant="body2">
          {t('metrics_configuration.detail.down_time_rules.desc')}
        </CatTypography>
        <div className="flex gap-8 align-items-center">
          <InfoCautionIcon color="orange" fontSize="small" hoverable={false} />
          <CatTypography className="opacity-8 c-main-orange" variant="body2">
            <Trans i18nKey="metrics_configuration.detail.down_time_rules.warning" t={t} />
          </CatTypography>
        </div>
      </div>
      <div className="grid px16 gap-4" style={{ gridTemplateColumns: '120px 120px 1fr 1fr' }}>
        <CatTypography className="opacity-8 text-center" variant="caption">
          {t('metrics_configuration.detail.down_time_rules.work_type')}
        </CatTypography>
        <CatTypography className="opacity-8 text-center" variant="caption">
          {t('metrics_configuration.detail.down_time_rules.usability')}
        </CatTypography>
        <CatTypography className="opacity-8 pl24" variant="caption">
          {t('metrics_configuration.detail.down_time_rules.status')}
        </CatTypography>
      </div>
      <TransitionGroup className="grid gap-8">
        {downtimeRules.map((rule, index) => (
          <Collapse key={index.toString()}>
            <DowntimeRuleItem
              deleteDisabled={downtimeRules.length === 1}
              downtimeRule={rule}
              index={index}
              key={index.toString()}
            />
          </Collapse>
        ))}
      </TransitionGroup>
      <CatAreaButton onClick={handleAddClick} style={{ width: '360px' }}>
        {t('metrics_configuration.detail.down_time_rules.add_rule_button')}
      </CatAreaButton>
    </div>
  );
};

export default DowntimeRules;
