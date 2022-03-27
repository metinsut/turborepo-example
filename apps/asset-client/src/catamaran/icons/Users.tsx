import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function UsersIcon(props: Props) {
  return (
    <IconBase {...props}>
      <circle cx={12} cy={8.352} fill="currentColor" r={3.231} />
      <path
        clipRule="evenodd"
        d="M11 11.582c-2.761 0-5 2.274-5 5.035 0 .276.224.504.5.504h5.913v-.16c0-.432.207-.83.545-1.078-.064-.414.07-.842.376-1.148l.397-.397c.306-.305.734-.44 1.148-.376a1.336 1.336 0 011.077-.545h.563c.13 0 .258.019.379.055A4.98 4.98 0 0013 11.582h-2z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <circle cx={16.238} cy={17.242} fill="currentColor" r={0.848} />
      <path
        clipRule="evenodd"
        d="M16.83 14.628a.336.336 0 00-.311-.211h-.563a.336.336 0 00-.311.21.363.363 0 01-.224.206c-.106.036-.21.079-.309.128a.363.363 0 01-.303.013.336.336 0 00-.37.071l-.398.397a.336.336 0 00-.071.37.363.363 0 01-.014.304c-.049.1-.091.203-.127.309a.363.363 0 01-.205.224.336.336 0 00-.211.311v.563c0 .137.083.26.21.312.1.039.172.123.206.223.036.107.079.21.128.309a.363.363 0 01.013.304.336.336 0 00.071.37l.397.397a.336.336 0 00.37.071.364.364 0 01.305.013c.099.05.202.092.308.128.1.034.184.107.224.205a.336.336 0 00.312.212h.561a.336.336 0 00.313-.212.364.364 0 01.224-.205c.105-.036.208-.079.307-.128a.364.364 0 01.304-.013.336.336 0 00.37-.071l.397-.397a.336.336 0 00.072-.37.364.364 0 01.013-.305c.049-.099.092-.201.128-.307a.364.364 0 01.205-.224.336.336 0 00.212-.313v-.561a.336.336 0 00-.212-.312.364.364 0 01-.205-.225 2.526 2.526 0 00-.128-.307.364.364 0 01-.013-.304.336.336 0 00-.072-.37l-.397-.398a.337.337 0 00-.37-.071.363.363 0 01-.304-.013 2.542 2.542 0 00-.307-.128.363.363 0 01-.224-.205zm-.592 4.309a1.695 1.695 0 100-3.39 1.695 1.695 0 000 3.39z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default UsersIcon;
