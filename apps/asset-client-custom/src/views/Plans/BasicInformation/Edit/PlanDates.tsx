import { Box, CatDatePicker } from 'catamaran/core';
import { Contract } from 'store/slices/contracts/types';
import { FormHelper } from 'hooks/useFormState';
import { PlanBasicInformation } from 'store/slices/plans/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { addYears, formatISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withFormHelper } from 'hooks';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  associatedContract: Contract;
  formHelper: FormHelper<PlanBasicInformation>;
  planBasicInformation: PlanBasicInformation;
};

const CatDatePickerWithFormHelper = withFormHelper(CatDatePicker);

function PlanDates(props: Props) {
  const classes = useStyles();
  const { associatedContract, formHelper, planBasicInformation } = props;

  const { t } = useTranslation();
  const planTypeResource = t(`plans.types.${planBasicInformation.type}`);

  const canSelectDays =
    planBasicInformation.period === 'daily' || planBasicInformation.period === 'weekly';

  // TODO: Task yapısı düzeltiğinde bu kontrol eklenecek
  const startDateDisabled = false;

  const { setFormState } = formHelper;
  const { startDate } = formHelper.formState.values;

  const [startDateInit, setStartDateInit] = useState(false);
  // Set plans dates to contracts' if exists
  useEffect(() => {
    if (!planBasicInformation.id && !startDate && !startDateInit) {
      // TODO: this should set date to 1 according to period...
      setFormState((prev) => ({
        ...prev,
        endDate: associatedContract?.endDate ?? formatISO(addYears(new Date(), 1)),
        startDate: associatedContract?.startDate ?? formatISO(new Date())
      }));
      setStartDateInit(true);
    }
  }, [
    associatedContract?.endDate,
    associatedContract?.startDate,
    planBasicInformation.id,
    setFormState,
    startDate,
    startDateInit
  ]);

  return (
    <>
      <Box className="mb8">
        <CatDatePickerWithFormHelper
          disabled={startDateDisabled}
          formHelper={formHelper}
          label={t('plans.edit.first_plan_start_date_desc', { type: planTypeResource })}
          maxDate={associatedContract?.endDate ?? undefined}
          minDate={associatedContract?.startDate ?? undefined}
          name="startDate"
          required
          views={canSelectDays ? ['year', 'month', 'day'] : ['year', 'month']}
        />
      </Box>
      {!associatedContract && (
        <Box className="mb8">
          <CatDatePickerWithFormHelper
            formHelper={formHelper}
            label={t('plans.edit.first_plan_end_date_desc', { type: planTypeResource })}
            minDate={planBasicInformation.startDate}
            name="endDate"
            required
            views={canSelectDays ? ['year', 'month', 'day'] : ['year', 'month']}
          />
        </Box>
      )}
    </>
  );
}

export default PlanDates;
