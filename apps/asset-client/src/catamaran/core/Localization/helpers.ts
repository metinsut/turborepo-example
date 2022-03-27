import enGBLocale from 'date-fns/locale/en-GB';
import enUSLocale from 'date-fns/locale/en-US';
import trLocale from 'date-fns/locale/tr';

export const supportedLocales = ['tr-TR', 'en-US', 'en-GB'] as const;
export type InputType = 'day' | 'month' | 'year' | 'time' | 'dateAndTime';
export type SupportedLocales = typeof supportedLocales[number];

export type LocaleInfo = {
  locale: Locale;
};

export type InputFormatMapping = Record<InputType, FormatInfo> & LocaleInfo;

export type FormatInfo = {
  mask: string;
  inputFormat: string;
};

export const localeMappings: Record<SupportedLocales, InputFormatMapping> = {
  'en-GB': {
    dateAndTime: {
      inputFormat: 'dd/MM/yyyy HH:mm',
      mask: '__/__/____ __:__'
    },
    day: {
      inputFormat: 'dd/MM/yyyy',
      mask: '__/__/____'
    },
    locale: enGBLocale,
    month: {
      inputFormat: 'MM/yyyy',
      mask: '__/____'
    },
    time: {
      inputFormat: 'HH:mm',
      mask: '__:__'
    },
    year: {
      inputFormat: 'yyyy',
      mask: '____'
    }
  },
  'en-US': {
    dateAndTime: {
      inputFormat: 'MM/dd/yyyy h:mm a',
      mask: '__.__.____ _:__'
    },
    day: {
      inputFormat: 'MM/dd/yyyy',
      mask: '__/__/____'
    },
    locale: enUSLocale,
    month: {
      inputFormat: 'MM/yyyy',
      mask: '__/____'
    },
    time: {
      inputFormat: 'h:mm a',
      mask: '__:__'
    },
    year: {
      inputFormat: 'yyyy',
      mask: '____'
    }
  },
  'tr-TR': {
    dateAndTime: {
      inputFormat: 'dd.MM.yyyy HH:mm',
      mask: '__.__.____ __:__'
    },
    day: {
      inputFormat: 'dd.MM.yyyy',
      mask: '__.__.____'
    },
    locale: trLocale,
    month: {
      inputFormat: 'MM.yyyy',
      mask: '__.____'
    },
    time: {
      inputFormat: 'HH:mm',
      mask: '__:__'
    },
    year: {
      inputFormat: 'yyyy',
      mask: '____'
    }
  }
};
