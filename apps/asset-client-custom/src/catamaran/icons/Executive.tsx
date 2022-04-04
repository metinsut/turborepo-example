import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ExecutiveIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <g opacity={0.8}>
        <rect
          height={5.5}
          rx={2.75}
          stroke="currentColor"
          strokeWidth={1.5}
          width={14.5}
          x={4.75}
          y={7.75}
        />
        <path d="M8.75 7a3.25 3.25 0 016.5 0v.25h-6.5V7z" stroke="currentColor" strokeWidth={1.5} />
        <path
          clipRule="evenodd"
          d="M8 8.5h8a2.5 2.5 0 012.5 2.5v6a2.5 2.5 0 01-2.5 2.5H8A2.5 2.5 0 015.5 17v-6A2.5 2.5 0 018 8.5zM4 11a4 4 0 014-4h8a4 4 0 014 4v6a4 4 0 01-4 4H8a4 4 0 01-4-4v-6z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <rect
          fill="currentColor"
          height={2}
          rx={1}
          transform="rotate(90 16 13)"
          width={3}
          x={16}
          y={13}
        />
        <rect
          fill="currentColor"
          height={2}
          rx={1}
          transform="rotate(90 10 13)"
          width={3}
          x={10}
          y={13}
        />
      </g>
    </IconBase>
  );
}

export default ExecutiveIcon;
