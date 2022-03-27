import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function FilterList(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <line
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        x1="7"
        x2="17"
        y1="9"
        y2="9"
      />
      <line
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        x1="9"
        x2="15"
        y1="12"
        y2="12"
      />
      <line
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        x1="11"
        x2="13"
        y1="15"
        y2="15"
      />
    </IconBase>
  );
}

export default FilterList;
