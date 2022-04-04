import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StaticOnIcon(props: Props) {
  return (
    <IconBase {...props} fill="none" viewBox="0 0 16 16">
      <circle cx={8} cy={8} fill="#494949" opacity={0.8} r={8} />
      <path
        clipRule="evenodd"
        d="M8.5 3.289a1 1 0 00-1 0L4.332 5.118 8 7.41l3.668-2.292L8.5 3.288zm3.813 2.601a.503.503 0 01-.048.034l-4 2.5a.5.5 0 01-.53 0l-4-2.5a.506.506 0 01-.047-.034 1 1 0 00-.018.187v3.846a1 1 0 00.5.866L7.5 12.71a1 1 0 001 0l3.33-1.922a1 1 0 00.5-.866V6.077a1 1 0 00-.017-.187z"
        fill="#F3F5F6"
        fillRule="evenodd"
        opacity={0.8}
      />
    </IconBase>
  );
}

export default StaticOnIcon;
