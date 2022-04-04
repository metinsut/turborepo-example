import { useUniqueIds } from 'hooks/useUniqueIds';
import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

const NotFoundIcon = (props: Props) => {
  const [id] = useUniqueIds(1);
  return (
    <IconBase {...props} viewBox="0 0 48 48">
      <g clipPath={`url(#${id})`}>
        <path
          d="M0 0h48v12H0V0zM-1.618 18h50.877L52 30H-4l2.382-12zM-4.417 36h56.834L55 48H-7l2.583-12z"
          fill="#F0552C"
          opacity={0.6}
        />
        <circle cx={24} cy={24} r={22.5} stroke="currentColor" strokeWidth={3} />
        <rect fill="currentColor" height={9} rx={2} width={4} x={15} y={12} />
        <rect fill="currentColor" height={9} rx={2} width={4} x={29} y={12} />
        <rect
          height={9}
          rx={4.5}
          stroke="currentColor"
          strokeWidth={3}
          width={15}
          x={16.5}
          y={28.5}
        />
      </g>
      <defs>
        <clipPath id={`${id}`}>
          <path
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
            fill="#fff"
          />
        </clipPath>
      </defs>
    </IconBase>
  );
};

export default NotFoundIcon;
