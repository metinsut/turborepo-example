import { CatDatePicker } from 'catamaran/core';
import { ConfirmButton } from 'catamaran/core/Button';
import { Paper } from 'catamaran/core/mui';
import { format, formatISO } from 'date-fns';
import { useFormState, withFormHelper, withReadonlyMode } from 'hooks';
import { useState } from 'react';
import datePickersValidator, {
  DatePickersState
} from 'helpers/validations/Showcase/DatePickerValidator';

const CatDatePickerWithFormHelper = withFormHelper(CatDatePicker);

const Tester2 = withFormHelper(CatDatePicker);

const DatepickerWithReadonly = withReadonlyMode(CatDatePicker);

const Tester = withFormHelper(DatepickerWithReadonly);

function DatePickers() {
  const formHelper = useFormState<DatePickersState>(
    () => ({
      date1: formatISO(new Date(2019, 1, 1, 1, 23, 23)),
      date2: null,
      date3: formatISO(new Date())
    }),
    datePickersValidator
  );

  const [readonlyMode, setReadonlyMode] = useState(true);

  return (
    <Paper className="p16 mt16" elevation={0}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <CatDatePickerWithFormHelper
          autoFocus
          formHelper={formHelper}
          label="Initial Filled"
          name="date1"
          onChange={() => {}}
          required
        />
        <CatDatePickerWithFormHelper
          formHelper={formHelper}
          label="Initial Filled2"
          name="date1"
          required
        />
        <CatDatePickerWithFormHelper
          formHelper={formHelper}
          label="Initial Empty"
          name="date2"
          required
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <CatDatePickerWithFormHelper
          formHelper={formHelper}
          label="Filled month / year"
          name="date1"
          required
          views={['year', 'month']}
        />
        <Tester2
          formHelper={formHelper}
          label="Empty year"
          name="date2"
          required
          views={['year']}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <Tester
          formatValue={(value) => format(new Date(value), 'dd.MM.yyyy')}
          formHelper={formHelper}
          label="Filled month / year"
          name="date3"
          onEditClick={() => {
            setReadonlyMode(false);
          }}
          readonly={readonlyMode}
          required
        />
      </div>
      <ConfirmButton onClick={() => setReadonlyMode(true)} />
    </Paper>
  );
}

export default DatePickers;
