import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ExportIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        d="M6 12v1a2 2 0 002 2h8a2 2 0 002-2v-1M10 9l2-2 2 2M12 8v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default ExportIcon;
