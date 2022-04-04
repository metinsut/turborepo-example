import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function HomeIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M10.237 6.28L6.825 8.76A2 2 0 006 10.377V16a2 2 0 002 2h1.89a.91.91 0 00.91-.91v-2.44a1.2 1.2 0 012.4 0v2.44c0 .503.407.91.91.91H16a2 2 0 002-2v-5.623a2 2 0 00-.825-1.618l-3.412-2.478a3 3 0 00-3.526 0z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default HomeIcon;
