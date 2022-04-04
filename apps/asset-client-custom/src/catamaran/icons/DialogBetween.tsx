import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function DialogBetweenIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M12 7.5v9" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
      <path
        d="M18.144 7.947a1 1 0 10-1.788-.894l1.788.894zm-1.788 9a1 1 0 101.788-.894l-1.788.894zM15 12l-.894-.447a1 1 0 000 .894L15 12zm1.356-4.947l-2.25 4.5 1.788.894 2.25-4.5-1.788-.894zm-2.25 5.394l2.25 4.5 1.788-.894-2.25-4.5-1.788.894z"
        fill="currentColor"
      />
      <path d="M16.5 12H21" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
      <path
        d="M5.856 7.947a1 1 0 011.788-.894l-1.788.894zm1.788 9a1 1 0 11-1.788-.894l1.788.894zM9 12l.894-.447a1 1 0 010 .894L9 12zM7.644 7.053l2.25 4.5-1.788.894-2.25-4.5 1.788-.894zm2.25 5.394l-2.25 4.5-1.788-.894 2.25-4.5 1.788.894z"
        fill="currentColor"
      />
      <path d="M7.5 12H3" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
    </IconBase>
  );
}

export default DialogBetweenIcon;
