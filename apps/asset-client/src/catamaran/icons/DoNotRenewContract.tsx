import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function DoNotRenewContractIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        d="M17.224 8.177a6.474 6.474 0 01-7.96 9.69"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <path
        d="M19.236 8.17L17.06 7.16l-.803 2.286"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M6.776 15.823a6.473 6.473 0 017.96-9.69"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <path
        d="M4.764 15.83l2.176 1.01.804-2.286"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <rect
        fill="currentColor"
        height={1.556}
        rx={0.778}
        transform="rotate(-45 9.25 13.65)"
        width={6.222}
        x={9.25}
        y={13.65}
      />
      <rect
        fill="currentColor"
        height={1.556}
        rx={0.778}
        transform="rotate(-135 13.65 14.75)"
        width={6.222}
        x={13.65}
        y={14.75}
      />
    </IconBase>
  );
}

export default DoNotRenewContractIcon;
