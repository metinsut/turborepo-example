import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function SearchIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <circle cx="10.6211" cy="10.6211" r="3.62109" stroke="currentColor" strokeWidth="2" />
      <path
        d="M13.2589 13.9219L16.9998 17.5131"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </IconBase>
  );
}

export default SearchIcon;
