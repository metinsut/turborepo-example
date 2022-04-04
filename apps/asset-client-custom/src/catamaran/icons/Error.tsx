import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function Error(props: Props) {
  return (
    <IconBase {...props} height={16} viewBox="0 0 16 16" width={16}>
      <circle cx={8} cy={8} fill="url(#prefix__paint0_linear_error)" r={8} />
      <g fill="#F3F5F6" opacity={0.8}>
        <rect
          height={2}
          rx={1}
          transform="rotate(-45 4.464 10.121)"
          width={8}
          x={4.464}
          y={10.121}
        />
        <rect
          height={2}
          rx={1}
          transform="rotate(-135 10.121 11.536)"
          width={8}
          x={10.121}
          y={11.536}
        />
      </g>
      <circle cx={8} cy={8} opacity={0.6} r={7.5} stroke="#F3F5F6" />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="prefix__paint0_linear_error"
          x1={8}
          x2={8}
          y1={0}
          y2={16}
        >
          <stop stopColor="#ED6E76" />
          <stop offset={1} stopColor="#EC816A" />
        </linearGradient>
      </defs>
    </IconBase>
  );
}

export default Error;
