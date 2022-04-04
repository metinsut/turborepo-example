import { useCallback, useState } from 'react';

const useDialogState = () => {
  const [isOpen, setOpen] = useState(false);

  const togglePopup = useCallback((status?: boolean) => {
    if (status !== undefined) {
      setOpen(status);
    } else {
      setOpen((prevState) => !prevState);
    }
  }, []);

  return {
    isOpen,
    togglePopup
  };
};

export default useDialogState;
