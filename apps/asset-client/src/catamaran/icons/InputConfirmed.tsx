import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

const InputConfirmedIcon = (props: IconBaseProps) => (
  <IconBase {...props} style={{ height: 14, width: 14 }} viewBox="0 0 14 14">
    <g filter="url(#filter0_d_28_751)">
      <circle cx="7" cy="6" fill="url(#paint0_linear_28_751)" r="4" />
      <circle cx="7" cy="6" r="4.5" stroke="white" />
    </g>
    <path
      d="M5.5 6L6.5 7L7.5 6L8.5 5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="14"
        id="filter0_d_28_751"
        width="14"
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
        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_28_751" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_28_751" mode="normal" result="shape" />
      </filter>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear_28_751"
        x1="7"
        x2="7"
        y1="2"
        y2="10"
      >
        <stop stopColor="#40DBA3" />
        <stop offset="1" stopColor="#54DFAD" />
      </linearGradient>
    </defs>
  </IconBase>
);

export default InputConfirmedIcon;
