import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function Category2Icon(props: Props) {
  return (
    <IconBase {...props}>
      <rect fill="currentColor" height={2} rx={1} width={12} x={6} y={6} />
      <rect fill="currentColor" height={2} rx={1} width={7} x={11} y={11} />
      <rect fill="currentColor" height={2} rx={1} width={12} x={6} y={16} />
      <path
        d="M9.467 11.6L6.8 9.6a.5.5 0 00-.8.4v4a.5.5 0 00.8.4l2.667-2a.5.5 0 000-.8z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default Category2Icon;
