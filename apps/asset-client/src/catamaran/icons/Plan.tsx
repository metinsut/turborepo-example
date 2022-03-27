import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function PlanIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M7.503 4.25A3.993 3.993 0 006 7.375v8.5a4 4 0 004 4h4a4 4 0 004-4v-8.5a3.993 3.993 0 00-1.503-3.125 2.249 2.249 0 01-1.029 1.767c.33.357.532.834.532 1.358v8.5a2 2 0 01-2 2h-4a2 2 0 01-2-2v-8.5c0-.524.202-1.001.532-1.358A2.249 2.249 0 017.503 4.25z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <rect fill="currentColor" height={2.25} rx={1.125} width={6} x={9} y={3} />
      <path
        clipRule="evenodd"
        d="M8.279 3.763a2.243 2.243 0 00.62 1.942A1.998 1.998 0 008 7.375v7a2 2 0 002 2h4a2 2 0 002-2v-7c0-.698-.357-1.312-.899-1.67a2.243 2.243 0 00.62-1.942A4 4 0 0118 7.375v7a4 4 0 01-4 4h-4a4 4 0 01-4-4v-7a4 4 0 012.279-3.612z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        d="M13.089 8.661a.25.25 0 01.353 0l.96.96a.25.25 0 010 .353l-3.36 3.359a.25.25 0 01-.177.073h-.959a.25.25 0 01-.25-.25v-.959a.25.25 0 01.073-.176l3.36-3.36z"
        fill="currentColor"
      />
      <rect
        fill="currentColor"
        height={0.928}
        rx={0.464}
        transform="rotate(45 14.25 7.5)"
        width={1.856}
        x={14.25}
        y={7.5}
      />
    </IconBase>
  );
}

export default PlanIcon;
