import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function PriorityHighIcon(props: Props) {
  return (
    <IconBase {...props} fill="none" height={24} width={24}>
      <path
        d="M4.73 7.741a1.881 1.881 0 1 1 3.74 0l-.705 6.388a1.172 1.172 0 0 1-2.33 0L4.73 7.741Z"
        fill="currentColor"
      />
      <ellipse cx={6.6} cy={17.289} fill="currentColor" rx={1.05} ry={1.058} />
      <path
        d="M10.13 7.741a1.881 1.881 0 1 1 3.74 0l-.704 6.388a1.172 1.172 0 0 1-2.33 0l-.705-6.388Z"
        fill="currentColor"
      />
      <ellipse cx={12} cy={17.289} fill="currentColor" rx={1.05} ry={1.058} />
      <path
        d="M15.53 7.741a1.881 1.881 0 1 1 3.74 0l-.705 6.388a1.172 1.172 0 0 1-2.33 0l-.705-6.388Z"
        fill="currentColor"
      />
      <ellipse cx={17.4} cy={17.289} fill="currentColor" rx={1.05} ry={1.058} />
    </IconBase>
  );
}

export default PriorityHighIcon;
