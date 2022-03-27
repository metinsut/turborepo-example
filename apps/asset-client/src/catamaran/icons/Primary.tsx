import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function PrimaryIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 16 16">
      <path
        d="M5.32402 12H11V10.1419H9.30168V4H7.27933L5 6.10292L6.34078 7.53825L6.69832 7.23783C6.87709 7.08206 6.98883 6.83727 6.98883 6.83727H7.01117C7.01117 6.83727 7 7.1822 7 7.50487V10.1419H5.32402V12Z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default PrimaryIcon;
