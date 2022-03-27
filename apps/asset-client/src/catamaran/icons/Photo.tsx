import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function PhotoIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M10.443 5a1 1 0 00-.936.649L9 7H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2l-.507-1.351A1 1 0 0013.557 5h-3.114zm7.307 4.5a.75.75 0 100-1.5.75.75 0 000 1.5zm-1.25 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <circle cx={12} cy={12.5} fill="currentColor" r={3} />
    </IconBase>
  );
}

export default PhotoIcon;
