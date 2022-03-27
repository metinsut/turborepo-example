import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

const InputErrorIcon = (props: IconBaseProps) => (
  <IconBase {...props} style={{ height: 14, width: 14 }} viewBox="0 0 14 14">
    <g filter="url(#filter0_d_4197_52965)">
      <circle cx="7" cy="6" fill="url(#paint0_linear_4197_52965)" r="4" />
      <circle cx="7" cy="6" r="4.5" stroke="white" strokeLinecap="round" />
    </g>
    <path
      clipRule="evenodd"
      d="M5.5859 4.58598C5.78116 4.39071 6.09774 4.39071 6.29301 4.58598L8.41433 6.7073C8.60959 6.90256 8.60959 7.21914 8.41433 7.4144C8.21906 7.60966 7.90248 7.60966 7.70722 7.4144L5.5859 5.29308C5.39064 5.09782 5.39064 4.78124 5.5859 4.58598Z"
      fill="white"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M5.58598 7.4141C5.39071 7.21884 5.39071 6.90226 5.58598 6.70699L7.7073 4.58567C7.90256 4.39041 8.21914 4.39041 8.4144 4.58567C8.60966 4.78094 8.60966 5.09752 8.4144 5.29278L6.29308 7.4141C6.09782 7.60936 5.78124 7.60936 5.58598 7.4141Z"
      fill="white"
      fillRule="evenodd"
    />
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="14"
        id="filter0_d_4197_52965"
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
        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4197_52965" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4197_52965"
          mode="normal"
          result="shape"
        />
      </filter>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear_4197_52965"
        x1="7"
        x2="7"
        y1="2"
        y2="10"
      >
        <stop stopColor="#ED6E76" />
        <stop offset="1" stopColor="#EC816A" />
      </linearGradient>
    </defs>
  </IconBase>
);

export default InputErrorIcon;
