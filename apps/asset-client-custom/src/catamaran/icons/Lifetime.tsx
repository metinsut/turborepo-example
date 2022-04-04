import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function LifetimeIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path d="M12 7V6M12 18v-1M17 12h1M6 12h1" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M17.224 8.177a6.474 6.474 0 0 1-7.96 9.69"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <path
        d="M19.236 8.169 17.06 7.16l-.803 2.286"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M6.776 15.823a6.473 6.473 0 0 1 7.96-9.69"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <path
        d="m4.764 15.83 2.176 1.01.804-2.286"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path d="M10.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" stroke="currentColor" />
      <path d="M13.5 3h-3" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} />
      <path d="M12 3v2" stroke="currentColor" />
    </IconBase>
  );
}

export default LifetimeIcon;
