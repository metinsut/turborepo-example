import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StatusConfirmed(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 16 16">
      <circle cx="8" cy="8" fill="url(#paint0_linear_144_71_statusConfirmed)" opacity="0.1" r="8" />
      <circle
        cx="8"
        cy="8"
        opacity="0.1"
        r="7.5"
        stroke="url(#paint1_linear_144_71_statusConfirmed)"
        strokeLinecap="round"
      />
      <g filter="url(#filter0_d_144_71_statusConfirmed)">
        <circle cx="8" cy="8" fill="url(#paint2_linear_144_71_statusConfirmed)" r="5" />
      </g>
      <path
        d="M6.5 8L7.5 9L9.5 7"
        stroke="#F3F5F6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="14"
          id="filter0_d_144_71_statusConfirmed"
          width="14"
          x="1"
          y="2"
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
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_144_71_statusConfirmed"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_144_71_statusConfirmed"
            mode="normal"
            result="shape"
          />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_144_71_statusConfirmed"
          x1="8"
          x2="8"
          y1="0"
          y2="16"
        >
          <stop stopColor="#B8C4CB" />
          <stop offset="1" stopColor="#ACB8BC" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_144_71_statusConfirmed"
          x1="8"
          x2="8"
          y1="0"
          y2="16"
        >
          <stop stopColor="#B8C4CB" />
          <stop offset="1" stopColor="#ACB8BC" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_144_71_statusConfirmed"
          x1="8"
          x2="8"
          y1="3"
          y2="13"
        >
          <stop stopColor="#B8C4CB" />
          <stop offset="1" stopColor="#ACB8BC" />
        </linearGradient>
      </defs>
    </IconBase>
  );
}

export default StatusConfirmed;
