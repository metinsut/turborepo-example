import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function RequestOnlyIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        d="M16.562 7.688a4.062 4.062 0 11-8.125 0 4.062 4.062 0 018.125 0zm-8.981 6.595c.257-.191.718-.198 1.288.111a7.594 7.594 0 003.63.918c1.314 0 2.551-.332 3.631-.918.571-.31 1.032-.302 1.29-.111a5.24 5.24 0 012.05 3.354l.152.907A1.25 1.25 0 0118.389 20H6.611a1.25 1.25 0 01-1.233-1.456l.151-.907a5.241 5.241 0 012.052-3.354z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </IconBase>
  );
}

export default RequestOnlyIcon;
