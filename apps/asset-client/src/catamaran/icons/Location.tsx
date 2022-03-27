import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function LocationIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M12 19c1.467 0 4-7.5 4-10s-2-4-4-4-4 1.5-4 4 2.533 10 4 10zm0-8a2 2 0 100-4 2 2 0 000 4z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default LocationIcon;
