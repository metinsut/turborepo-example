import { Box, useLocalizationHelpers } from 'catamaran/core';
import { PlanBasicInformation, SamplePlanRequest } from 'store/slices/plans/types';
import { Skeleton, Typography } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { getSamplePlanDates } from 'store/slices/plans/actions';
import { samplePlanCount } from 'store/slices/plans/data';
import { selectSampleTaskDates } from 'store/slices/plans/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AndMoreIcon from 'catamaran/icons/AndMore';
import LighthouseIcon from 'catamaran/icons/Lighthouse';
import React, { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

type Props = {
  planBasicInformation: PlanBasicInformation;
};

function SamplePlans(props: Props) {
  const { planBasicInformation } = props;

  const { t } = useTranslation();
  const { formatDate, formatMonth } = useLocalizationHelpers();

  const planTypeResource = t(`plans.types.${planBasicInformation.type}`);

  const sampleTaskDates = useTypedSelector((state) => selectSampleTaskDates(state));

  const [samplesLoading, samplesLoadingDispatch] = useLoading();

  const daySelectEnabled =
    planBasicInformation.period === 'daily' || planBasicInformation.period === 'weekly';

  useEffect(() => {
    if (planBasicInformation.startDate && planBasicInformation.period) {
      const startDate = new Date(planBasicInformation.startDate);
      const endDate = new Date(planBasicInformation.endDate);

      // TODO: Comparison logic, use date-fns
      if (!endDate || startDate < endDate) {
        const samplePlanRequest: SamplePlanRequest = {
          days: planBasicInformation.days,
          endDate: planBasicInformation.endDate,
          frequency: planBasicInformation.frequency,
          period: planBasicInformation.period,
          startDate: planBasicInformation.startDate
        };
        samplesLoadingDispatch(getSamplePlanDates(samplePlanRequest));
      }
    }
  }, [
    planBasicInformation.days,
    planBasicInformation.endDate,
    planBasicInformation.frequency,
    planBasicInformation.period,
    planBasicInformation.startDate,
    samplesLoadingDispatch
  ]);

  return (
    <Box flex flexDirection="column">
      <Box mb={1}>
        <Typography variant="body2">
          <Trans
            components={{ bold: <b /> }}
            i18nKey="plans.edit.sample_plan_desc"
            t={t}
            values={{ type: planTypeResource }}
          />
        </Typography>
      </Box>
      <Box flex mb={1}>
        {samplesLoading ? (
          <>
            <Box className="opacity-8 p4 border-solid radius-16 border-darkgrey">
              <Skeleton width={75} />
            </Box>
            <Box className="opacity-8 p4 border-solid radius-16 border-darkgrey ml8">
              <Skeleton width={75} />
            </Box>
            <Box className="opacity-8 p4 border-solid radius-16 border-darkgrey ml8">
              <Skeleton width={75} />
            </Box>
            <Box className="opacity-8 p4 border-solid radius-16 border-darkgrey ml8">
              <Skeleton width={75} />
            </Box>
            <Box className="opacity-8 p4 border-solid radius-16 border-darkgrey ml8">
              <Skeleton width={75} />
            </Box>
          </>
        ) : (
          <Box alignItems="center" flex>
            {sampleTaskDates.map((task, index) => {
              const taskDateString = daySelectEnabled ? formatDate(task) : formatMonth(task);
              return (
                <Box
                  className="opacity-8 p4 border-solid radius-16 border-darkgrey ml8"
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  ml={index === 0 ? 0 : 1}
                >
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="plans.edit.sample_plan_item"
                    t={t}
                    values={{
                      date: taskDateString,
                      number: index + 1
                    }}
                  />
                </Box>
              );
            })}
            {sampleTaskDates.length === samplePlanCount && (
              <Box ml={1}>
                <AndMoreIcon
                  color="darkGrey"
                  contained={false}
                  fontSize="small"
                  hoverable={false}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box alignItems="center" flex>
        <LighthouseIcon fontSize="small" />
        <Box ml={1}>
          <Typography variant="body2">
            <Trans
              components={{ bold: <b /> }}
              i18nKey="plans.edit.sample_plan_detail"
              t={t}
              values={{ type: planTypeResource }}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SamplePlans;
