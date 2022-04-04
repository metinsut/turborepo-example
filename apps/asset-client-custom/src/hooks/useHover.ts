import React, { useCallback, useState } from 'react';

type Props = {
  defaultValue?: boolean;
  disabled?: boolean;
};

export type HoverProps = {
  onMouseOver: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
};

export default function useHover(props?: Props): [boolean, HoverProps] {
  const { defaultValue = false, disabled = false } = props ?? {};

  const [hovered, setHovered] = useState(defaultValue);

  const handleMouseOver = useCallback(() => {
    if (!hovered && !disabled) {
      setHovered(true);
    }
  }, [disabled, hovered]);

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return [
    hovered,
    {
      onMouseLeave: handleMouseLeave,
      onMouseOver: handleMouseOver
    }
  ];
}
