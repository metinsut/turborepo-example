import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StatusDenied(props: Props) {
  return (
    <IconBase {...props} fill="none" viewBox="0 0 20 20">
      <g filter="url(#filter0_d_8215_87571)">
        <circle cx="10" cy="9" fill="#494949" r="8" />
      </g>
      <path
        d="M8.03634 9.77816C7.74344 10.071 7.74344 10.5459 8.03633 10.8388C8.32923 11.1317 8.8041 11.1317 9.09699 10.8388L8.03634 9.77816ZM11.7387 8.19708C12.0316 7.90419 12.0316 7.42931 11.7387 7.13642C11.4459 6.84353 10.971 6.84352 10.6781 7.13642L11.7387 8.19708ZM10.6532 10.8637C10.9461 11.1566 11.4209 11.1566 11.7138 10.8637C12.0067 10.5708 12.0067 10.096 11.7138 9.80308L10.6532 10.8637ZM9.07208 7.16135C8.77918 6.86845 8.30431 6.86845 8.01142 7.16135C7.71852 7.45424 7.71853 7.92911 8.01142 8.22201L9.07208 7.16135ZM9.09699 10.8388L11.7387 8.19708L10.6781 7.13642L8.03634 9.77816L9.09699 10.8388ZM11.7138 9.80308L9.07208 7.16135L8.01142 8.22201L10.6532 10.8637L11.7138 9.80308Z"
        fill="#F3F5F6"
      />
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="20"
          id="filter0_d_8215_87571"
          width="20"
          x="0"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0.1 0"
          />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_8215_87571" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_8215_87571"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </IconBase>
  );
}

export default StatusDenied;
