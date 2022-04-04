import React, { PropsWithChildren } from 'react';

const CardContext = React.createContext(undefined);

function CardProvider({ children, value }: PropsWithChildren<any>) {
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

function useCardContext() {
  const context = React.useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
}

export { CardProvider, useCardContext };
