import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function FilterCancelIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        clipRule="evenodd"
        d="M11.5 6a1 1 0 100 2h3.971l-2.007 1.882A4 4 0 0012.2 12.75a4.995 4.995 0 012.912-1.671l1.727-1.62C18.162 8.22 17.284 6 15.471 6H11.5zm.169 12.5a4.968 4.968 0 01-.644-2h-.665v-3.833a4 4 0 00-1.05-2.703L6.736 7.158a1 1 0 10-1.474 1.35l2.572 2.808a2 2 0 01.525 1.35V16.5a2 2 0 002 2h1.309zM20 16a4 4 0 11-8 0 4 4 0 018 0zm-5.944 1.945a.75.75 0 010-1.061l.883-.884-.883-.884a.75.75 0 111.06-1.06l.884.883.884-.883a.75.75 0 111.06 1.06l-.883.884.884.884a.75.75 0 01-1.061 1.06L16 17.062l-.884.884a.75.75 0 01-1.06 0z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default FilterCancelIcon;
