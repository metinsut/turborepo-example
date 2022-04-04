import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AddPersonIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        clipRule="evenodd"
        d="M14.813 6.813a2.813 2.813 0 11-5.625 0 2.813 2.813 0 015.625 0zM9.537 9.884a1.103 1.103 0 00-.684-.26 2 2 0 00-1.969 1.648l-.299 1.676a1 1 0 00.984 1.176h.1a4.998 4.998 0 014.331-2.5 4.998 4.998 0 014.331 2.5h.1a1 1 0 00.984-1.176l-.3-1.675a2 2 0 00-1.968-1.649c-.25 0-.488.103-.684.26A3.92 3.92 0 0112 10.75a3.921 3.921 0 01-2.463-.865z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M15.636 16.625a3.636 3.636 0 11-7.272 0 3.636 3.636 0 017.272 0zm-5.954 0a.5.5 0 01.5-.5H11.5v-1.318a.5.5 0 111 0v1.318h1.318a.5.5 0 110 1H12.5v1.318a.5.5 0 01-1 0v-1.318h-1.318a.5.5 0 01-.5-.5z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default AddPersonIcon;
