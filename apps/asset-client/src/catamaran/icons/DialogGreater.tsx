import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function DialogGreaterIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M11.4 8.3a1 1 0 111.2-1.6l-1.2 1.6zm1.2 9a1 1 0 01-1.2-1.6l1.2 1.6zM18 12l.6-.8a1 1 0 010 1.6L18 12zm-5.4-5.3l6 4.5-1.2 1.6-6-4.5 1.2-1.6zm6 6.1l-6 4.5-1.2-1.6 6-4.5 1.2 1.6zM5.4 8.3a1 1 0 111.2-1.6L5.4 8.3zm1.2 9a1 1 0 11-1.2-1.6l1.2 1.6zM12 12l.6-.8a1 1 0 010 1.6L12 12zM6.6 6.7l6 4.5-1.2 1.6-6-4.5 1.2-1.6zm6 6.1l-6 4.5-1.2-1.6 6-4.5 1.2 1.6z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default DialogGreaterIcon;
