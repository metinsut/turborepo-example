import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function CancelIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M9.33 13.255a1 1 0 101.415 1.415L9.33 13.255zm5.377-2.548a1 1 0 00-1.414-1.414l1.414 1.414zm-1.452 4a1 1 0 001.415-1.414l-1.415 1.414zM10.707 9.33a1 1 0 00-1.414 1.415l1.414-1.415zm.037 5.34l3.963-3.963-1.414-1.414-3.963 3.963 1.415 1.414zm3.926-1.377L10.707 9.33l-1.414 1.415 3.963 3.962 1.414-1.414z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default CancelIcon;
