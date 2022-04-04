import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function ExpandIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M10.4 8H10a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path d="M12.8 11.2L16 8" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
      <path
        d="M13.6 8H16v2.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default ExpandIcon;
