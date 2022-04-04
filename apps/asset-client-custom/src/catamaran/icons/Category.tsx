import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function CategoryIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 16 16">
      <rect fill="currentColor" height="1.14286" rx="0.571429" width="8" x="4" y="4" />
      <rect fill="currentColor" height="1.14286" rx="0.571429" width="5" x="7" y="7.42871" />
      <rect fill="currentColor" height="1.14286" rx="0.571429" width="8" x="4" y="10.8569" />
      <path
        d="M5.77855 7.81012L4.4127 6.63939C4.25053 6.50038 4 6.61561 4 6.8292V9.17066C4 9.38425 4.25053 9.49948 4.4127 9.36048L5.77855 8.18974C5.89495 8.08997 5.89495 7.90989 5.77855 7.81012Z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default CategoryIcon;
