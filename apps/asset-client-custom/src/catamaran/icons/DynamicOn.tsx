import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function DynamicOnIcon(props: Props) {
  return (
    <IconBase {...props} fill="none" viewBox="0 0 16 16">
      <circle cx={8} cy={8} fill="url(#prefix__paint0_linear)" opacity={0.8} r={8} />
      <path
        d="M5.113 9.042l4.492-6.29c.07-.097.22-.012.173.098L7.631 7.86a.1.1 0 00.092.14h3.083a.1.1 0 01.081.158l-3.756 5.259c-.068.094-.215.017-.176-.092l1.426-3.991a.1.1 0 00-.094-.134H5.194a.1.1 0 01-.081-.158z"
        fill="#fff"
        opacity={0.8}
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.2}
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="prefix__paint0_linear"
          x1={8}
          x2={8}
          y1={0}
          y2={16}
        >
          <stop stopColor="#40DBA3" />
          <stop offset={1} stopColor="#54DFAD" />
        </linearGradient>
      </defs>
    </IconBase>
  );
}

export default DynamicOnIcon;
