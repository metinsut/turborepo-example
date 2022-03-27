import { SupportedLocales, localeMappings } from './helpers';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const formatDateWithLocale = (value: string, locale: SupportedLocales) => {
  if (!value) {
    return '';
  }

  const { inputFormat } = localeMappings[locale].day;

  return format(new Date(value), inputFormat);
};

export const formatMonthWithLocale = (value: string, locale: SupportedLocales) => {
  if (!value) {
    return '';
  }

  const { inputFormat } = localeMappings[locale].month;

  return format(new Date(value), inputFormat);
};

export const formatYearWithLocale = (value: string, locale: SupportedLocales) => {
  if (!value) {
    return '';
  }

  const { inputFormat } = localeMappings[locale].year;

  return format(new Date(value), inputFormat);
};

export const formatTimeWithLocale = (value: string, locale: SupportedLocales, timeZone: string) => {
  if (!value) {
    return '';
  }

  const { inputFormat } = localeMappings[locale].time;

  return formatInTimeZone(new Date(value), timeZone, inputFormat);
};

export const formatDateAndTimeWithLocale = (
  value: string,
  locale: SupportedLocales,
  timeZone: string
) => {
  if (!value) {
    return '';
  }

  const { inputFormat } = localeMappings[locale].dateAndTime;

  return formatInTimeZone(new Date(value), timeZone, inputFormat);
};
