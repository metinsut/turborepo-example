import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ResponseTimeIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M18.3485 15.3805C17.8013 15.7875 17.1232 16.0284 16.3889 16.0284C15.0407 16.0284 13.8821 15.2166 13.3752 14.0552L9.84861 14.0552C9.57247 14.0552 9.34861 13.8313 9.34861 13.5552L9.34861 10.5526C9.34861 10.2764 9.57247 10.0526 9.84861 10.0526L14.499 10.0526C15.0336 9.67622 15.6854 9.45523 16.3889 9.45523C17.7774 9.45523 18.9647 10.3163 19.4462 11.5335L17.0702 10.8969C16.9052 10.8527 16.7292 10.8957 16.6032 11.0109L15.5259 11.9967C15.2388 12.2594 15.1301 12.6648 15.2474 13.0359L15.6875 14.4283C15.739 14.5911 15.87 14.7164 16.0349 14.7606L18.3485 15.3805Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <rect fill="currentColor" height="1" rx="0.5" width="2" x="6" y="10" />
      <rect fill="currentColor" height="1" rx="0.5" width="3.00037" x="4.99951" y="11.5" />
      <rect fill="currentColor" height="1" rx="0.5" width="4" x="4" y="13" />
    </IconBase>
  );
}

export default ResponseTimeIcon;
