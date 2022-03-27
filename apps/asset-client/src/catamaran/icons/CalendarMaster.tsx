import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function CalendarMasterIcon(props: Props) {
  return (
    <IconBase {...props}>
      <g opacity={0.8}>
        <circle cx={12} cy={12} fill="currentColor" opacity={0.1} r={12} />
      </g>
      <g opacity={0.8}>
        <rect
          height={14.5}
          rx={3.25}
          stroke="currentColor"
          strokeWidth={1.5}
          width={12.5}
          x={5.75}
          y={4.75}
        />
        <rect
          height={13.5}
          rx={3.25}
          stroke="currentColor"
          strokeWidth={1.5}
          width={12.5}
          x={5.75}
          y={4.75}
        />
        <path
          clipRule="evenodd"
          d="M9 4a4 4 0 0 0-4 4v1h14V8a4 4 0 0 0-4-4H9Zm8.143 2.857a1.286 1.286 0 1 1-2.571 0 1.286 1.286 0 0 1 2.57 0Zm-7.714 0a1.286 1.286 0 1 1-2.572 0 1.286 1.286 0 0 1 2.572 0Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          d="M8.786 4.929C8.786 3.863 8.498 3 8.143 3c-.355 0-.643.863-.643 1.929 0 1.065.288 1.928.643 1.928M16.5 4.929C16.5 3.863 16.212 3 15.857 3c-.355 0-.643.863-.643 1.929 0 1.065.288 1.928.643 1.928"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <circle cx={15} cy={12} fill="currentColor" r={1} />
        <circle cx={15} cy={15} fill="currentColor" r={1} />
        <circle cx={9} cy={15} fill="currentColor" r={1} />
        <circle cx={12} cy={12} fill="currentColor" r={1} />
        <circle cx={12} cy={15} fill="currentColor" r={1} />
      </g>
    </IconBase>
  );
}

export default CalendarMasterIcon;
