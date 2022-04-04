import { DatePickerView } from '@mui/lab/DatePicker/shared';
import {
  FormatInfo,
  InputType,
  LocaleInfo,
  localeMappings,
  useLocalizationHelpers
} from '../Localization';

export const useInputFormat = (views: readonly DatePickerView[]): FormatInfo & LocaleInfo => {
  let inputType: InputType = 'year';

  if (!views || views.length === 0 || views.includes('day')) {
    // date - month -year
    inputType = 'day';
  } else if (views.includes('month')) {
    // Month and year
    // Just month selector should be considered in futures
    inputType = 'month';
  } else {
    // year
    inputType = 'year';
  }

  const { locale } = useLocalizationHelpers();

  const localeMapping = localeMappings[locale];

  return {
    ...localeMapping[inputType],
    locale: localeMapping.locale
  };
};
