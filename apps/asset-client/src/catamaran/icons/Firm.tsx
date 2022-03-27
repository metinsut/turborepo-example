import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function FirmIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <circle cx="12" cy="12" fill="#494949" opacity="0.8" r="12" />
      <path
        d="M10.8 12.95C10.5239 12.95 10.3 13.1739 10.3 13.45V17.5H7C6.72386 17.5 6.5 17.2761 6.5 17V9.86757C6.5 9.70749 6.57665 9.55709 6.70616 9.46302L11.7062 5.83139C11.8814 5.70412 12.1186 5.70412 12.2938 5.83139L17.2938 9.46302C17.4234 9.55709 17.5 9.70749 17.5 9.86757V17C17.5 17.2761 17.2761 17.5 17 17.5H13.7V13.45C13.7 13.1739 13.4761 12.95 13.2 12.95H10.8Z"
        opacity="0.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export default FirmIcon;
