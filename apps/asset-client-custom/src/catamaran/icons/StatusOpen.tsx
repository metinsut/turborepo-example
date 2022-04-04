import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StatusOpen(props: Props) {
  return (
    <IconBase {...props} fill="none" viewBox="0 0 16 16">
      <circle cx={8} cy={8} fill="url(#a)" opacity={0.1} r={8} />
      <circle cx={8} cy={8} opacity={0.1} r={7.5} stroke="url(#b)" />
      <g filter="url(#c)">
        <circle cx={8} cy={8} fill="url(#d)" r={5} />
      </g>
      <g filter="url(#e)">
        <rect fill="#F3F5F6" height={4} rx={1} width={4} x={6} y={6} />
      </g>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="a" x1={8} x2={8} y1={0} y2={16}>
          <stop stopColor="#69C9FF" />
          <stop offset={1} stopColor="#78CFFF" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="b" x1={8} x2={8} y1={0} y2={16}>
          <stop stopColor="#69C9FF" />
          <stop offset={1} stopColor="#78CFFF" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="d" x1={8} x2={8} y1={3} y2={13}>
          <stop stopColor="#69C9FF" />
          <stop offset={1} stopColor="#78CFFF" />
        </linearGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={14}
          id="c"
          width={14}
          x={1}
          y={2}
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_144_72" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_144_72" result="shape" />
        </filter>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={8}
          id="e"
          width={8}
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_144_72" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_144_72" result="shape" />
        </filter>
      </defs>
    </IconBase>
  );
}

export default StatusOpen;
