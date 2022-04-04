import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AssignPersonIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M11.387 12.487c-.575-.122-1.198-.243-1.687.083A3.8 3.8 0 008 15.74c0 .42.34.76.76.76h6.48c.42 0 .76-.34.76-.76a3.8 3.8 0 00-1.708-3.175c-.49-.324-1.112-.202-1.686-.08a2.926 2.926 0 01-1.22.002z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <circle cx={12} cy={9.5} fill="currentColor" r={2.5} />
      <path d="M7 11l1 1-1 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12H5" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M17 11l-1 1 1 1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 12h3" stroke="currentColor" strokeLinecap="round" />
    </IconBase>
  );
}

export default AssignPersonIcon;
