import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function PriorityLowIcon(props: Props) {
  return (
    <IconBase {...props} fill="none" height={24} width={24}>
      <g fill="currentColor" opacity={0.2}>
        <path d="M9.93 7.741a1.881 1.881 0 1 1 3.74 0l-.705 6.388a1.172 1.172 0 0 1-2.33 0L9.93 7.741Z" />
        <ellipse cx={11.8} cy={17.289} rx={1.05} ry={1.058} />
      </g>
      <g fill="currentColor" opacity={0.2}>
        <path d="M15.13 7.741a1.881 1.881 0 1 1 3.74 0l-.704 6.388a1.172 1.172 0 0 1-2.33 0l-.705-6.388Z" />
        <ellipse cx={17} cy={17.289} rx={1.05} ry={1.058} />
      </g>
      <path
        d="M4.73 7.741a1.881 1.881 0 1 1 3.74 0l-.705 6.388a1.172 1.172 0 0 1-2.33 0L4.73 7.741Z"
        fill="currentColor"
      />
      <ellipse cx={6.6} cy={17.23} fill="currentColor" rx={1.05} ry={1.058} />
    </IconBase>
  );
}

export default PriorityLowIcon;
