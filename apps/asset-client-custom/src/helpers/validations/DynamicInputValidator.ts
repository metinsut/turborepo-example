import { DataTypes } from 'store/slices/assetConfiguration/forms/types';
import { defaultMaxDate, defaultMinDate } from './base/DateValidator';
import { isAfter, isBefore, isValid } from 'date-fns';
import i18n from 'i18next';

type Parameters = {
  allowEmpty?: boolean;
  fieldName?: string;
  maxLength?: number;
  minLength?: number;
};

export default function validateDynamicInput(
  value: string,
  dataType: DataTypes,
  isRequired: boolean,
  title: string
) {
  let error;
  switch (dataType) {
    case 'email':
      error = emailValidator(value, {
        allowEmpty: !isRequired,
        fieldName: title
      });
      break;
    case 'phone':
      error = phoneValidator(value, {
        allowEmpty: !isRequired,
        fieldName: title
      });
      break;
    case 'numerical':
      error = numberValidator(value, {
        allowEmpty: !isRequired,
        fieldName: title
      });
      break;
    case 'dateTime':
      error = dateValidator(value, {
        allowEmpty: !isRequired,
        fieldName: title
      });
      break;
    default:
      error = rangeValidator(value, {
        allowEmpty: !isRequired,
        fieldName: title,
        maxLength: 120,
        minLength: 3
      });
      break;
  }

  return error;
}

// TODO: These validators should be merged with existing ones
function emptyCheckValidator(value: string, parameters: Parameters) {
  const { fieldName } = parameters;

  const field = fieldName ?? i18n.t('common.generic_field_name');
  let errorMessage;

  if (!value || !value.trim()) {
    errorMessage = i18n.t('errors.field_required', { field });
  }
  return errorMessage;
}

function rangeValidator(value: string, parameters: Parameters) {
  const { allowEmpty = false, fieldName, minLength, maxLength } = parameters;

  let errorMessage;
  if (!allowEmpty) {
    errorMessage = emptyCheckValidator(value, { fieldName });
  }

  if (!errorMessage && value) {
    if (minLength && value.length < minLength) {
      errorMessage = i18n.t('errors.range_error_min', { field: fieldName, minLength });
    } else if (maxLength && value.length > maxLength) {
      errorMessage = i18n.t('errors.range_error_max', { field: fieldName, maxLength });
    }
  }

  return errorMessage;
}

const validateEmail = (email: string) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
function emailValidator(value: string, parameters: Parameters) {
  const { allowEmpty = false, fieldName } = parameters;
  let errorMessage;
  if (!allowEmpty) {
    errorMessage = emptyCheckValidator(value, { fieldName });
  }

  if (!errorMessage) {
    if (value && !validateEmail(value)) {
      errorMessage = i18n.t('errors.email_field_error');
    }
  }

  return errorMessage;
}

function phoneValidator(value: string, parameters: Parameters) {
  const { allowEmpty = false, fieldName } = parameters;

  let errorMessage;
  if (!allowEmpty) {
    errorMessage = emptyCheckValidator(value, { fieldName });
  }

  if (!errorMessage && value) {
    const match = value.match(/\d/g);
    if (!match || match.length < 10 || match.length > 12) {
      errorMessage = i18n.t('errors.phone_field_error');
    }
  }

  return errorMessage;
}

function numberValidator(value: string, parameters: Parameters) {
  const { allowEmpty = false, fieldName } = parameters;

  let errorMessage;
  if (!allowEmpty) {
    errorMessage = emptyCheckValidator(value, { fieldName });
  }

  if (!errorMessage) {
    if (value && !Number(value)) {
      errorMessage = i18n.t('errors.number_error', { field: fieldName });
    }
  }

  return errorMessage;
}

function dateValidator(value: string, parameters: Parameters) {
  const { allowEmpty = false, fieldName } = parameters;

  const field = fieldName ?? i18n.t('common.generic_field_name');

  if (value === null) {
    if (!allowEmpty) {
      return `${field} is required`;
    }

    return undefined;
  }

  const date = new Date(value);
  if (value === undefined || !isValid(date)) {
    return i18n.t('errors.date.not_valid');
  }

  const minDateParsed = new Date(defaultMinDate);
  if (isBefore(date, minDateParsed)) {
    return i18n.t('errors.date.min_date');
  }

  const maxDateParsed = new Date(defaultMaxDate);
  if (isAfter(date, maxDateParsed)) {
    return i18n.t('errors.date.max_date');
  }

  return undefined;
}
