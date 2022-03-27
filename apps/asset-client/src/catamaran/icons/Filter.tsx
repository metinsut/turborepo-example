import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function FilterIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M11.958 7h3.797c.865 0 1.322 1.025.743 1.669l-2.228 2.475a3 3 0 00-.77 2.007v2.314a1 1 0 01-.445.832l-1 .666a1 1 0 01-1.555-.832v-3.004a3 3 0 00-.742-1.975L7 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default FilterIcon;
