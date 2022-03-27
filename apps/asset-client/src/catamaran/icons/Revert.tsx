import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function RevertIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M12.36 7.41a4.798 4.798 0 012.707.791 4.726 4.726 0 011.775 2.174c.36.889.444 1.871.244 2.822a5.036 5.036 0 01-1.368 2.52 5.036 5.036 0 01-2.52 1.37 4.86 4.86 0 01-2.823-.245A4.726 4.726 0 018.2 15.067a4.798 4.798 0 01-.792-2.708"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M6.226 11.05a1.325 1.325 0 102.65.001 1.325 1.325 0 00-2.65 0z"
        fill="currentColor"
        stroke="currentColor"
      />
      <path
        d="M12.626 5.711l-1.714 2.043 2.042 1.714"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default RevertIcon;
