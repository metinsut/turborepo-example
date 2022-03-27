import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function BookmarkIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M9.75 8a.25.25 0 01.25-.25h4a.25.25 0 01.25.25v7.132a.25.25 0 01-.389.207l-1.306-.87a1 1 0 00-1.11 0l-1.306.87a.25.25 0 01-.389-.207V8z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </IconBase>
  );
}

export default BookmarkIcon;
