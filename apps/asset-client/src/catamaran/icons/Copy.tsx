import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function CopyIcon(props: Props) {
  return (
    <IconBase {...props}>
      <rect height={9} rx={1.5} stroke="currentColor" width={6} x={7.5} y={9} />
      <path
        clipRule="evenodd"
        d="M12 6.5h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-.25v1H15a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v.25h1V7.5a1 1 0 0 1 1-1Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <rect fill="currentColor" height={1} rx={0.5} width={3} x={9} y={10.5} />
      <rect fill="currentColor" height={1} rx={0.5} width={3} x={9} y={12.5} />
      <rect fill="currentColor" height={1} rx={0.5} width={2} x={9} y={14.5} />
    </IconBase>
  );
}

export default CopyIcon;
