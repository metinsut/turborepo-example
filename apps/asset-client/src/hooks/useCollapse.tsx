import { CatIconButton } from 'catamaran/core';
import ExpandLessIcon from 'catamaran/icons/ExpandLess';
import ExpandMoreIcon from 'catamaran/icons/ExpandMore';
import React from 'react';

export const useCollapse = (defaultOpen: boolean) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const handleToggle = React.useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const collapseButtonElement = React.useMemo(
    () => (
      <CatIconButton onClick={handleToggle}>
        {open ? (
          <ExpandLessIcon contained fontSize="large" />
        ) : (
          <ExpandMoreIcon contained fontSize="large" />
        )}
      </CatIconButton>
    ),
    [handleToggle, open]
  );

  return {
    collapseButtonElement,
    open,
    setOpen
  };
};
