import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StatusInProgress(props: Props) {
  return (
    <IconBase {...props} fill="none" viewBox="0 0 16 16">
      <circle
        cx="8"
        cy="8"
        fill="url(#paint0_linear_144_73_statusInprogress)"
        opacity="0.1"
        r="8"
      />
      <circle
        cx="8"
        cy="8"
        opacity="0.1"
        r="7.5"
        stroke="url(#paint1_linear_144_73_statusInprogress)"
        strokeLinecap="round"
      />
      <g filter="url(#filter0_d_144_73_statusInprogress)">
        <circle cx="8" cy="8" fill="url(#paint2_linear_144_73_statusInprogress)" r="5" />
      </g>
      <g filter="url(#filter1_d_144_73_statusInprogress)">
        <path
          d="M7 9.43944V6.56056C7 6.32095 7.26704 6.17803 7.46641 6.31094L9.62558 7.75038C9.8037 7.86913 9.8037 8.13087 9.62558 8.24961L7.46641 9.68906C7.26704 9.82197 7 9.67905 7 9.43944Z"
          fill="#F3F5F6"
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="14"
          id="filter0_d_144_73_statusInprogress"
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
            result="effect1_dropShadow_144_73_statusInprogress"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_144_73_statusInprogress"
            mode="normal"
            result="shape"
          />
        </filter>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="7.47998"
          id="filter1_d_144_73_statusInprogress"
          width="6.75928"
          x="5"
          y="5.26001"
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
            result="effect1_dropShadow_144_73_statusInprogress"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_144_73_statusInprogress"
            mode="normal"
            result="shape"
          />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_144_73_statusInprogress"
          x1="8"
          x2="8"
          y1="0"
          y2="16"
        >
          <stop stopColor="#40DBA3" />
          <stop offset="1" stopColor="#54DFAD" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_144_73_statusInprogress"
          x1="8"
          x2="8"
          y1="0"
          y2="16"
        >
          <stop stopColor="#40DBA3" />
          <stop offset="1" stopColor="#54DFAD" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_144_73_statusInprogress"
          x1="8"
          x2="8"
          y1="3"
          y2="13"
        >
          <stop stopColor="#40DBA3" />
          <stop offset="1" stopColor="#54DFAD" />
        </linearGradient>
      </defs>
    </IconBase>
  );
}

export default StatusInProgress;
