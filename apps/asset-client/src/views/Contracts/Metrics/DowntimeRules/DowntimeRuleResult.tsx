import { DowntimeRule, MetricType } from 'store/slices/contracts/types';
import { Trans, useTranslation } from 'react-i18next';
import { getStatuses } from 'store/slices/contracts/actions';
import { renderReadyStatusesList } from 'components/MultiSelector/StatusMultiSelector';
import {
  selectAvailableStatuses,
  selectContractMainCategoryId
} from 'store/slices/contracts/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect, useMemo } from 'react';

type Props = {
  downtimeRule: DowntimeRule;
  metricType: MetricType;
};

function DowntimeRuleResult(props: Props) {
  const { downtimeRule, metricType } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const mainCategoryId = useTypedSelector(selectContractMainCategoryId);
  const statuses = useTypedSelector((state) =>
    selectAvailableStatuses(state, downtimeRule.workType)
  );

  useEffect(() => {
    if (!statuses) {
      dispatch(getStatuses(downtimeRule.workType, mainCategoryId));
    }
  }, [dispatch, downtimeRule.workType, mainCategoryId, statuses]);

  const statusesList = useMemo(
    () => renderReadyStatusesList(statuses, downtimeRule.statusIds),
    [statuses, downtimeRule.statusIds]
  );

  const statusString = statusesList
    ?.filter((status) => status.showOnView)
    .map((status) => (status.parentName ? `${status.parentName} / ${status.name}` : status.name))
    .join(', ')
    .toString();

  const delayHidden = !downtimeRule.delayTolerance || downtimeRule.delayTolerance === 'noTolerance';
  const delayString = delayHidden
    ? ''
    : `${downtimeRule.delayToleranceTimeValue} ${t(
        `contracts.edit.metrics.time_types.${downtimeRule.delayToleranceTimeType}`
      )}`;

  const usabilityHidden = !downtimeRule.usability;
  const usabilityString = usabilityHidden
    ? ''
    : t(`contracts.edit.metrics.downTimeRules.usabilities.${downtimeRule.usability}`);

  return (
    <Trans
      components={{
        bold: <b style={{ whiteSpace: 'pre-wrap' }} />,
        hide1: <span hidden={usabilityHidden} />,
        hide2: <span hidden={delayHidden} />,
        hide3: <span hidden={!statusString} />,
        hide4: <span hidden={!(!!statusString && !usabilityHidden)} />,
        hide5: <span hidden={!statusString && usabilityHidden} />
      }}
      i18nKey="contracts.edit.metrics.downTimeRules.result"
      t={t}
      values={{
        delay: delayString,
        metricType: metricType.isDefault
          ? t(`contracts.edit.metrics.types.${metricType.name}`)
          : metricType.name,
        statuses: statusString,
        usability: usabilityString,
        workType: t(`contracts.edit.metrics.downTimeRules.work_types.${downtimeRule.workType}`)
      }}
    />
  );
}

export default DowntimeRuleResult;
