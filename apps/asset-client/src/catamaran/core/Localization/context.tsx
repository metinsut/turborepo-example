import { PropsWithChildren, createContext, useContext } from 'react';
import { SupportedLocales } from './helpers';
import {
  formatDateAndTimeWithLocale,
  formatDateWithLocale,
  formatMonthWithLocale,
  formatTimeWithLocale,
  formatYearWithLocale
} from './formatters';

type LocalizationContextState = {
  locale: SupportedLocales;
  language: string;
  timeZone: string;
};

const LocalizationContext = createContext<LocalizationContextState>(undefined);

export function LocalizationProvider({
  children,
  value
}: PropsWithChildren<{ value: LocalizationContextState }>) {
  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useLocalizationHelpers(
  defaultValues: LocalizationContextState = {
    language: 'tr',
    locale: 'tr-TR',
    timeZone: '+03:00'
  }
) {
  const { language, locale, timeZone } = useContext(LocalizationContext) ?? defaultValues;

  const formatDate = (value: string) => formatDateWithLocale(value, locale);
  const formatMonth = (value: string) => formatMonthWithLocale(value, locale);
  const formatYear = (value: string) => formatYearWithLocale(value, locale);
  const formatTime = (value: string) => formatTimeWithLocale(value, locale, timeZone);
  const formatDateAndTime = (value: string) => formatDateAndTimeWithLocale(value, locale, timeZone);

  return {
    formatDate,
    formatDateAndTime,
    formatMonth,
    formatTime,
    formatYear,
    language,
    locale,
    timeZone
  };
}
