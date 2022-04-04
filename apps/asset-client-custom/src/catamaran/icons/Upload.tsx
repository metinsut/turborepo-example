import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function UploadIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M14 15l-2-2-2 2M12 14v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        clipRule="evenodd"
        d="M16.246 13.99l-2.832-2.477c-.78-.684-2.047-.684-2.828 0l-2.828 2.474a2.5 2.5 0 01-.64-4.958 4.002 4.002 0 016.647-1.92 2.5 2.5 0 012.77.939 3 3 0 01-.29 5.942z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default UploadIcon;
