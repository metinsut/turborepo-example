import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function EditIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M12.897 8.837a.471.471 0 0 1 .667 0l1.599 1.6a.471.471 0 0 1 0 .666l-5.76 5.759A.471.471 0 0 1 9.07 17H7.471A.471.471 0 0 1 7 16.529v-1.6c0-.124.05-.244.138-.333l5.76-5.759ZM14.596 7.138a.471.471 0 0 1 .667 0l1.599 1.599a.471.471 0 0 1 0 .667l-.466.466a.471.471 0 0 1-.667 0l-1.599-1.6a.471.471 0 0 1 0-.666l.466-.466Z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default EditIcon;
