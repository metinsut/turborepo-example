import { LocalizationProvider, SupportedLocales } from 'catamaran/core';
import { fetchAccountSettings, selectAccountSettings } from 'store/slices/session';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect } from 'react';
import Redirecting from 'views/Auth/Redirecting';

export type GuardProps = {
  children: React.ReactNode;
};

function PublicGuard(props: GuardProps) {
  const { children } = props;
  const accountSettings = useTypedSelector(selectAccountSettings);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchAccountSettings());
  }, [dispatch]);

  if (!accountSettings) {
    return <Redirecting />;
  }

  return (
    <LocalizationProvider
      value={{
        language: accountSettings?.languageCode,
        locale: accountSettings?.locale as SupportedLocales,
        timeZone: accountSettings?.timeZone
      }}
    >
      {children}
    </LocalizationProvider>
  );
}

export default PublicGuard;
