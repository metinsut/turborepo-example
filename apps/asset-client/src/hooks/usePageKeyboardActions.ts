import { Handler, PageKeyboardContext } from 'layouts/Dashboard/helpers';
import { useContext, useEffect } from 'react';

type PageKeyboardActions = {
  onEnter?: Handler;
  onEscape?: Handler;
};

export const usePageKeyboardActions = (actions: PageKeyboardActions) => {
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
