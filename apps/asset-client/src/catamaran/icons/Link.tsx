import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function Link(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M15 9h1.5a3 3 0 013 3v0a3 3 0 01-3 3h-3a3 3 0 01-3-3v0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M9 15H7.5a3 3 0 01-3-3v0a3 3 0 013-3h3a3 3 0 013 3v0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default Link;
