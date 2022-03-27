import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function UpTime(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M10 19l2 2 2-2M10 5l2-2 2 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        clipRule="evenodd"
        d="M11.744 7A5 5 0 007 11.744h.994a.25.25 0 110 .5H7c.045.924.342 1.783.823 2.509l1.092-1.092a3.5 3.5 0 111.412 1.412l-1.092 1.091a4.973 4.973 0 002.509.824v-.994a.25.25 0 11.5 0v.994a5 5 0 004.744-4.744h-.994a.25.25 0 010-.5h.994A5 5 0 0012.244 7v.994a.25.25 0 11-.5 0V7z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M11.492 12.858a1 1 0 10-.363-.362l.004.006a1.004 1.004 0 00.359.356zm-2.985 2.26l2.26-2.26a1.511 1.511 0 00.363.362l-2.26 2.26a.256.256 0 01-.363-.362z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default UpTime;
