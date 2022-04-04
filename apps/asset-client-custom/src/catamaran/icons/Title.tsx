import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function TitleIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M7 6a1 1 0 00-1 1v1a1 1 0 002 0h3v8h-1a1 1 0 100 2h4a1 1 0 100-2h-1V8h3a1 1 0 102 0V7a1 1 0 00-1-1H7z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default TitleIcon;
