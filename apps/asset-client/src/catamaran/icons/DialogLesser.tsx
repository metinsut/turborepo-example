import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function DialogLesserIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M12.6 8.3a1 1 0 10-1.2-1.6l1.2 1.6zm-1.2 9a1 1 0 001.2-1.6l-1.2 1.6zM6 12l-.6-.8a1 1 0 000 1.6L6 12zm5.4-5.3l-6 4.5 1.2 1.6 6-4.5-1.2-1.6zm-6 6.1l6 4.5 1.2-1.6-6-4.5-1.2 1.6zM18.6 8.3a1 1 0 10-1.2-1.6l1.2 1.6zm-1.2 9a1 1 0 001.2-1.6l-1.2 1.6zM12 12l-.6-.8a1 1 0 000 1.6l.6-.8zm5.4-5.3l-6 4.5 1.2 1.6 6-4.5-1.2-1.6zm-6 6.1l6 4.5 1.2-1.6-6-4.5-1.2 1.6z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default DialogLesserIcon;
