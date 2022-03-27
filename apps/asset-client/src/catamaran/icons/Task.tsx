import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function TaskIcon(props: Props) {
  return (
    <IconBase {...props}>
      <rect fill="currentColor" height={1.667} rx={0.833} width={1.667} x={7} y={7.833} />
      <rect fill="currentColor" height={1.667} rx={0.833} width={7.5} x={9.5} y={7.833} />
      <rect fill="currentColor" height={1.667} rx={0.833} width={1.667} x={7} y={11.166} />
      <rect fill="currentColor" height={1.667} rx={0.833} width={7.5} x={9.5} y={11.166} />
      <rect fill="currentColor" height={1.667} rx={0.833} width={1.667} x={7} y={14.5} />
      <rect fill="currentColor" height={1.667} rx={0.833} width={7.5} x={9.5} y={14.5} />
    </IconBase>
  );
}

export default TaskIcon;
