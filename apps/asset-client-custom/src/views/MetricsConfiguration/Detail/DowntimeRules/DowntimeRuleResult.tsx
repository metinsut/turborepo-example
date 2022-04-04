import { DowntimeRule } from 'store/slices/metricsConfiguration/detail/type';
import { Trans, useTranslation } from 'react-i18next';
import { renderReadyStatusesList } from 'components/MultiSelector/StatusMultiSelector';
import { selectAvailableStatuses } from 'store/slices/metricsConfiguration/detail/selectors';
import { useMemo } from 'react';
import { useTypedSelector } from 'hooks/useTypedSelector';

type Props = {
  downtimeRule: DowntimeRule;
};

const DowntimeRuleResult = (props: Props) => {
  const {
    downtimeRule: { workType, statusIds, usability }
  } = props;
  const { t } = useTranslation();
  const availableStatuses = useTypedSelector((state) => selectAvailableStatuses(state, workType));
  const statusesList = useMemo(
    () => renderReadyStatusesList(availableStatuses, statusIds),
    [availableStatuses, statusIds]
  );

  const statusString = statusesList
    ?.filter((status) => status.showOnView)
    .map((status) => (status.parentName ? `${status.parentName} / ${status.name}` : status.name))
    .join(', ')
    .toString();

  const usabilityHidden = !usability;
  const usabilityString = usabilityHidden
    ? ''
    : t(`metrics_configuration.detail.down_time_rules.usabilities.${usability}`);

  return (
    <Trans
      components={{
        bold: <b style={{ whiteSpace: 'pre-wrap' }} />,
        hide1: <span hidden={usabilityHidden} />,
        hide3: <span hidden={!statusString} />,
        hide4: <span hidden={!(!!statusString && !usabilityHidden)} />,
        hide5: <span hidden={!statusString && usabilityHidden} />
      }}
      i18nKey="metrics_configuration.detail.down_time_rules.result"
      t={t}
      values={{
        statuses: statusString,
        usability: usabilityString,
        workType: t(`metrics_configuration.detail.down_time_rules.work_types.${workType}`)
      }}
    />
  );
};

export default DowntimeRuleResult;
