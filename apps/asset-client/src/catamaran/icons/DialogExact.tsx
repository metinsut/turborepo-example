import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function DialogExactIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M16.5 16.5h-9" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
      <path
        d="M16.053 9.606a1 1 0 11.894 1.788l-.894-1.788zm-9 1.788a1 1 0 11.894-1.788l-.894 1.788zM12 12.75l.447.894a1 1 0 01-.894 0L12 12.75zm4.947-1.356l-4.5 2.25-.894-1.788 4.5-2.25.894 1.788zm-5.394 2.25l-4.5-2.25.894-1.788 4.5 2.25-.894 1.788z"
        fill="currentColor"
      />
      <path d="M12 12V6" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
    </IconBase>
  );
}

export default DialogExactIcon;
