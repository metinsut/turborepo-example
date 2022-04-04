import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

const InfoCautionIcon = (props: Props) => (
  <IconBase {...props} viewBox="0 0 24 24">
    <circle cx={12} cy={17} fill="currentColor" r={1} />
    <path
      d="M10.22 7.988l.67 6.018a1.117 1.117 0 002.22 0l.67-6.018a1.79 1.79 0 10-3.56 0z"
      fill="currentColor"
    />
  </IconBase>
);

export default InfoCautionIcon;
