import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

export type AutocompleteContextType = {
  open: boolean;
  toggle: (open: boolean) => void;
};

export const AutocompleteContext = createContext<AutocompleteContextType>(undefined);

export const useAutocompleteContext = () => {
  const context = useContext(AutocompleteContext);
  return context;
};

export const useAutocompleteContextState = (): AutocompleteContextType => {
  const [open, setOpen] = useState(false);
  const contextValue = useMemo(() => {
    const toggle = (isOpen: boolean) => setOpen(isOpen);

    return {
      open,
      toggle
    };
  }, [open]);

  return contextValue;
};

export function AutocompleteContextProvider({
  children,
  value
}: PropsWithChildren<{ value: AutocompleteContextType }>) {
  return <AutocompleteContext.Provider value={value}>{children}</AutocompleteContext.Provider>;
}
