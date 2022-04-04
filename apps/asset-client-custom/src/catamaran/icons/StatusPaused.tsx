import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StatusPaused(props: Props) {
  return (
    <IconBase {...props} fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="8" fill="url(#paint0_linear)" opacity="0.1" r="8" />
      <circle
        cx="8"
        cy="8"
        opacity="0.1"
        r="7.5"
        stroke="url(#paint1_linear)"
        strokeLinecap="round"
      />
      <g filter="url(#filter0_d)">
        <circle cx="8" cy="8" fill="url(#paint2_linear)" r="5" />
      </g>
      <g filter="url(#filter1_d)">
        <rect fill="#F3F5F6" height="4" rx="0.5" width="1" x="6.5" y="6" />
        <rect fill="#F3F5F6" height="4" rx="0.5" width="1" x="8.5" y="6" />
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
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="8"
          id="filter1_d"
          width="7"
          x="4.5"
          y="5"
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
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear"
          x1="8"
          x2="8"
          y1="0"
          y2="16"
        >
          <stop stopColor="#E5A071" />
          <stop offset="1" stopColor="#E8AA80" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear"
          x1="8"
          x2="8"
          y1="0"
          y2="16"
        >
          <stop stopColor="#E5A071" />
          <stop offset="1" stopColor="#E8AA80" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear"
          x1="8"
          x2="8"
          y1="3"
          y2="13"
        >
          <stop stopColor="#E5A071" />
          <stop offset="1" stopColor="#E8AA80" />
        </linearGradient>
      </defs>
    </IconBase>
  );
}

export default StatusPaused;
