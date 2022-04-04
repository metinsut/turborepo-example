import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function MailIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M5.253 8.025A1.99 1.99 0 005 9v6a2 2 0 002 2h10a2 2 0 002-2V9a1.99 1.99 0 00-.253-.975l-4.941 5.19a2.468 2.468 0 01-3.611 0l-4.942-5.19zm.732-.749l4.932 5.18a1.48 1.48 0 002.166 0l4.932-5.18A1.99 1.99 0 0017 7H7c-.37 0-.717.1-1.015.276z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default MailIcon;
