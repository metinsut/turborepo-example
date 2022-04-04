import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StatusAllIcon(props: Props) {
  return (
    <IconBase {...props} fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="8" opacity="0.6" r="7.5" stroke="#494949" />
      <g filter="url(#filter0_d)" opacity="0.4">
        <circle cx="8" cy="8" fill="#494949" r="5" />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="14"
          id="filter0_d"
          width="14"
          x="1"
          y="2"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0.1 0"
          />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
        </filter>
      </defs>
    </IconBase>
  );
}

export default StatusAllIcon;
