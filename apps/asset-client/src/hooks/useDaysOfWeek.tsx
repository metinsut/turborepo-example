import { useTranslation } from 'react-i18next';
import React from 'react';
import moment from 'moment';

export const useDaysOfWeek = (isShort: boolean) => {
  const { i18n } = useTranslation();

  const uniqueIds = React.useMemo(() => {
    moment.locale(i18n.language);
    const weekdays = isShort ? moment.weekdaysShort() : moment.weekdays();
    const sunday = weekdays.splice(0, 1)[0];
    return [...weekdays, sunday];
  }, [i18n.language, isShort]);

  return uniqueIds;
};
