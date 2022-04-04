import { Dispatch, SetStateAction, createContext, useContext, useEffect } from 'react';

export type Handler = () => void;

export type HandlersStateShape = {
  onEnter: Handler;
  onEscape: Handler;
};

export type PageKeyboardContext = HandlersStateShape & {
  onEnter: Handler;
  onEscape: Handler;
  setHandlers: Dispatch<SetStateAction<HandlersStateShape>>;
};

export const PageKeyboardContext = createContext<PageKeyboardContext>(undefined);

export const usePageKeyboardAction = (actions: HandlersStateShape) => {
  const { onEnter, onEscape } = actions;
  const handlers = useContext(PageKeyboardContext);

  const { setHandlers } = handlers;
  useEffect(() => {
    setHandlers((prev) => {
      const handleEscape = onEscape ?? prev.onEscape;
      const handleEnter = onEnter ?? prev.onEnter;

      return {
        onEnter: handleEnter,
        onEscape: handleEscape
      };
    });
  }, [onEnter, onEscape, setHandlers]);
};
