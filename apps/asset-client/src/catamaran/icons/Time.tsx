import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function TimeIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 16 17">
      <svg
        fill="none"
        height="17"
        viewBox="0 0 16 17"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <path
            d="M12.5 9.25249C12.5 11.8283 10.4723 13.8927 8 13.8927C5.52766 13.8927 3.5 11.8283 3.5 9.25249C3.5 6.67666 5.52766 4.6123 8 4.6123C10.4723 4.6123 12.5 6.67666 12.5 9.25249Z"
            stroke="currentColor"
          />
          <path
            d="M8.64763 3.08398L7.35352 3.08398"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path d="M5.99985 11.4328L8.12109 9.25204" stroke="currentColor" strokeLinecap="round" />
          <ellipse cx="8" cy="9.25265" fill="currentColor" rx="1" ry="1.02804" />
        </g>
      </svg>
    </IconBase>
  );
}

export default TimeIcon;
