import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function CantEditIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="m13.375 12.893 1.778-1.777a.5.5 0 0 0 0-.708l-1.562-1.56a.5.5 0 0 0-.707 0l-1.777 1.777 2.268 2.268Zm-1.414 1.415-2.269-2.269-2.546 2.546A.5.5 0 0 0 7 14.94v1.56a.5.5 0 0 0 .5.5h1.561a.5.5 0 0 0 .354-.146l2.546-2.545Zm2.625-7.162a.5.5 0 0 1 .707 0l1.56 1.562a.5.5 0 0 1 0 .707l-.426.427a.5.5 0 0 1-.707 0L14.158 8.28a.5.5 0 0 1 0-.707l.428-.428Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path d="m8 8 8 8" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} />
    </IconBase>
  );
}

export default CantEditIcon;
