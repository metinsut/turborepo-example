import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AdditionalPermLocationIcon(props: Props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" fill="url(#paint0_linear_additionalpermlocation)" r="12" />
      <g filter="url(#filter0_d)" opacity="0.8">
        <path
          clipRule="evenodd"
          d="M12 18.75C13.5 18.75 16.5 11.9858 16.5 9.58929C16.5 7.19276 14.4853 5.25 12 5.25C9.51472 5.25 7.5 7.19276 7.5 9.58929C7.5 11.9858 10.5 18.75 12 18.75ZM12 12.0001C13.3807 12.0001 14.5 10.9207 14.5 9.58934C14.5 8.25794 13.3807 7.17863 12 7.17863C10.6193 7.17863 9.5 8.25794 9.5 9.58934C9.5 10.9207 10.6193 12.0001 12 12.0001Z"
          fill="white"
          fillRule="evenodd"
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="17.5"
          id="filter0_d"
          width="13"
          x="5.5"
          y="4.25"
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
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_additionalpermlocation"
          x1="12"
          x2="12"
          y1="0"
          y2="24"
        >
          <stop stopColor="#40DBA3" />
          <stop offset="1" stopColor="#54DFAD" />
        </linearGradient>
      </defs>
    </IconBase>
  );
}

export default AdditionalPermLocationIcon;
