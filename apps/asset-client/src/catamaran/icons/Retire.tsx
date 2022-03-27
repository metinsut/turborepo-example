import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function RetireIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M17.224 8.177a6.474 6.474 0 01-7.96 9.69"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <path
        d="M19.236 8.169L17.06 7.16l-.803 2.286"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M6.777 15.823a6.473 6.473 0 017.959-9.69"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <path
        d="M4.764 15.831L6.94 16.84l.804-2.286"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M10 10a.5.5 0 01.5-.5h3a.5.5 0 01.5.5h-4zM11 9.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5h-2z"
        fill="currentColor"
      />
      <path
        clipRule="evenodd"
        d="M14 10.5h-4V14a1 1 0 001 1h2a1 1 0 001-1v-3.5zm-1.75 1a.25.25 0 10-.5 0V14a.25.25 0 10.5 0v-2.5zM11 11.25a.25.25 0 01.25.25V14a.25.25 0 11-.5 0v-2.5a.25.25 0 01.25-.25zm2.25.25a.25.25 0 10-.5 0V14a.25.25 0 10.5 0v-2.5z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default RetireIcon;
