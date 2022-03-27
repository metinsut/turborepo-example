import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function PersonIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 16 16">
      <path
        clipRule="evenodd"
        d="M7.47555 8.50459C6.93382 8.40729 6.35335 8.3123 5.88632 8.60355C4.75369 9.30988 4 10.567 4 12.0001V12.1668C4 12.627 4.3731 13.0001 4.83333 13.0001H11.1667C11.6269 13.0001 12 12.627 12 12.1668V12.0001C12 10.5639 11.2431 9.30455 10.1065 8.59907C9.63885 8.30882 9.05862 8.40504 8.51713 8.50349C8.347 8.53442 8.17196 8.55055 7.99328 8.55055C7.81675 8.55055 7.64376 8.5348 7.47555 8.50459Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <circle cx="8" cy="5.5" fill="currentColor" r="2.5" />
    </IconBase>
  );
}

export default PersonIcon;
