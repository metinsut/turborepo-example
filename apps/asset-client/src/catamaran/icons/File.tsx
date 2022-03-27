import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function FileIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        d="M17 8v8a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-4.586L13.414 5H14a3 3 0 0 1 3 3Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M10 4h2l-6 6V8a4 4 0 0 1 4-4Z" fill="currentColor" />
    </IconBase>
  );
}

export default FileIcon;
