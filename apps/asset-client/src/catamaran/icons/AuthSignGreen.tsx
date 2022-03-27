import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AuthSignGreenIcon(props: Props) {
  return (
    <IconBase {...props}>
      <circle cx={12} cy={8} fill="url(#prefix__paint0_linear)" opacity={0.4} r={6} />
      <circle cx={12} cy={8} fill="url(#prefix__paint1_linear)" r={4} />
      <path
        clipRule="evenodd"
        d="M16 13.745A6.968 6.968 0 0112 15a6.968 6.968 0 01-4-1.255v8.336a.5.5 0 00.771.42l2.957-1.912a.5.5 0 01.543 0l2.957 1.912a.5.5 0 00.772-.42v-8.336z"
        fill="url(#prefix__paint2_linear)"
        fillRule="evenodd"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="prefix__paint0_linear"
          x1={12}
          x2={12}
          y1={2}
          y2={14}
        >
          <stop stopColor="#40DBA3" />
          <stop offset={1} stopColor="#54DFAD" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="prefix__paint1_linear"
          x1={12}
          x2={12}
          y1={4}
          y2={12}
        >
          <stop stopColor="#40DBA3" />
          <stop offset={1} stopColor="#54DFAD" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="prefix__paint2_linear"
          x1={12}
          x2={12}
          y1={13.745}
          y2={22.582}
        >
          <stop stopColor="#40DBA3" />
          <stop offset={1} stopColor="#54DFAD" />
        </linearGradient>
      </defs>
    </IconBase>
  );
}

export default AuthSignGreenIcon;
