import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

const InputRequiredIcon = (props: IconBaseProps) => (
  <IconBase {...props} style={{ height: 14, width: 14 }} viewBox="0 0 14 14">
    <g filter="url(#filter0_d_28_745)">
      <circle cx="7" cy="6" fill="url(#paint0_linear_28_745)" r="4" />
      <circle cx="7" cy="6" r="4.5" stroke="white" strokeLinecap="round" />
    </g>
    <path
      clipRule="evenodd"
      d="M7 4C7.27614 4 7.5 4.22386 7.5 4.5L7.5 7.5C7.5 7.77614 7.27614 8 7 8C6.72386 8 6.5 7.77614 6.5 7.5L6.5 4.5C6.5 4.22386 6.72386 4 7 4Z"
      fill="white"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M5.26758 6.99991C5.12951 6.76076 5.21144 6.45497 5.45059 6.31689L8.04867 4.81689C8.28781 4.67882 8.59361 4.76076 8.73168 4.99991C8.86975 5.23905 8.78781 5.54485 8.54867 5.68292L5.95059 7.18292C5.71144 7.32099 5.40565 7.23905 5.26758 6.99991Z"
      fill="white"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M5.3291 5.0004C5.46717 4.76125 5.77297 4.67931 6.01211 4.81738L8.61019 6.31738C8.84934 6.45545 8.93127 6.76125 8.7932 7.0004C8.65513 7.23954 8.34934 7.32148 8.11019 7.18341L5.51211 5.68341C5.27297 5.54534 5.19103 5.23954 5.3291 5.0004Z"
      fill="white"
      fillRule="evenodd"
    />
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="14"
        id="filter0_d_28_745"
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
        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_28_745" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_28_745" mode="normal" result="shape" />
      </filter>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear_28_745"
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

export default InputRequiredIcon;
