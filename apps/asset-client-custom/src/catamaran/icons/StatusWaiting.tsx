import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StatusWaiting(props: Props) {
  return (
    <IconBase {...props} fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="8" fill="#494949" opacity="0.6" r="8" />
      <g filter="url(#filter0_d_1659_178)" opacity="0.8">
        <path
          d="M3 8C3 8.98891 3.29324 9.9556 3.84265 10.7779C4.39206 11.6001 5.17295 12.241 6.08658 12.6194C7.00021 12.9978 8.00555 13.0969 8.97545 12.9039C9.94536 12.711 10.8363 12.2348 11.5355 11.5355C12.2348 10.8363 12.711 9.94536 12.9039 8.97545C13.0969 8.00555 12.9978 7.00021 12.6194 6.08658C12.241 5.17295 11.6001 4.39206 10.7779 3.84265C9.95561 3.29325 8.98891 3 8 3L8 4.00784C8.78958 4.00784 9.56142 4.24197 10.2179 4.68064C10.8744 5.1193 11.3861 5.74279 11.6883 6.47227C11.9904 7.20174 12.0695 8.00443 11.9155 8.77883C11.7614 9.55324 11.3812 10.2646 10.8229 10.8229C10.2646 11.3812 9.55324 11.7614 8.77883 11.9155C8.00443 12.0695 7.20174 11.9904 6.47226 11.6883C5.74279 11.3861 5.1193 10.8744 4.68064 10.2179C4.24197 9.56142 4.00784 8.78958 4.00784 8L3 8Z"
          fill="#F3F5F6"
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="14"
          id="filter0_d_1659_178"
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
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1659_178" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1659_178"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </IconBase>
  );
}

export default StatusWaiting;
