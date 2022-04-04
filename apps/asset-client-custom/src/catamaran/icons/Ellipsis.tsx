import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function EllipsisIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <circle cx={7} cy={12} fill="currentColor" r={2} />
      <circle cx={12} cy={12} fill="currentColor" r={2} />
      <circle cx={17} cy={12} fill="currentColor" r={2} />
    </IconBase>
  );
}

export default EllipsisIcon;
