import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AssetListingIcon(props: Props) {
  return (
    <IconBase {...props}>
      <g filter="url(#prefix__filter0_d_dashboard)" stroke="currentColor">
        <rect height={5.857} rx={1.5} width={5.857} x={6.5} y={6.5} />
        <rect fill="currentColor" height={3.286} rx={1.5} width={3.286} x={14.214} y={6.5} />
        <rect fill="currentColor" height={3.286} rx={1.5} width={5.857} x={6.5} y={14.214} />
        <rect height={5.857} rx={1.5} width={3.286} x={14.214} y={11.643} />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={16}
          id="prefix__filter0_d_dashboard"
          width={16}
          x={4}
          y={5}
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feColorMatrix values="0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </IconBase>
  );
}

export default AssetListingIcon;
