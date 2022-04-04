import { DateFilterType } from './types';
import { Trans } from 'react-i18next';
import { useLocalizationHelpers } from 'catamaran/core';
import React from 'react';
import i18n from 'utils/i18n';

const t = i18n.t.bind(i18n);

export const useDateFilterChipText = (dateFilter: DateFilterType) => {
  const { formatDate } = useLocalizationHelpers();

  if (!dateFilter) {
    return '';
  }

  const formattedFromDate = dateFilter.from ? formatDate(dateFilter.from) : '';

  const formattedToDate = dateFilter.to ? formatDate(dateFilter.to) : '';

  let chipText;
  switch (dateFilter.type) {
    case 'blank':
      chipText = (
        <>
          {'<'}
          <Trans components={{ bold: <i /> }} i18nKey="common.filters.date_types.blank" t={t} />
          {'>'}
        </>
      );
      break;
    case 'between':
      chipText = `${formattedFromDate} - ${formattedToDate}`;
      break;
    case 'equal':
      chipText = `= ${formattedFromDate}`;
      break;
    case 'greaterThan':
      chipText = `> ${formattedFromDate}`;
      break;
    case 'lessThan':
      chipText = `< ${formattedFromDate}`;
      break;
    default:
      chipText = '';
      break;
  }

  return chipText;

  return chipText;
};
