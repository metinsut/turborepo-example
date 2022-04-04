import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function FreezeIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M12.06 6.752v2.54" stroke="currentColor" strokeLinecap="square" strokeWidth={2} />
      <path
        d="M10.647 5.058l1.411 1.411 1.412-1.411"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M12.059 17.763v-2.541"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth={2}
      />
      <path
        d="M13.47 19.457l-1.411-1.412-1.412 1.412"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M7.29 15.01l2.201-1.27"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth={2}
      />
      <path
        d="M6.53 17.079l.516-1.928-1.928-.517"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M16.827 9.504l-2.2 1.27"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth={2}
      />
      <path
        d="M17.588 7.435l-.516 1.928L19 9.88"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M7.173 9.386l2.2 1.27"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth={2}
      />
      <path
        d="M5 9.761l1.929-.516-.517-1.929"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M16.71 14.891l-2.201-1.27"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth={2}
      />
      <path
        d="M18.882 14.516l-1.928.517.517 1.928"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M12 9.155l2.464 1.422v2.846L12 14.845l-2.464-1.422v-2.846L12 9.155z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default FreezeIcon;
