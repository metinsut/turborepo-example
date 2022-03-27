import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function UngroupIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 22 22">
      <path
        clipRule="evenodd"
        d="M6.333 7.972a2.013 2.013 0 01-.666 0v2.056a2.013 2.013 0 01.666 0V7.972zm1.64-1.639h2.055a2.011 2.011 0 010-.666H7.972a2.013 2.013 0 010 .666zm6-.666a2.013 2.013 0 010 .666h2.055a2.011 2.011 0 010-.666h-2.055zm4.36 2.305a2.014 2.014 0 01-.666 0v2.056a2.015 2.015 0 01.666 0V7.972zm0 6a2.011 2.011 0 01-.666 0v2.056a2.015 2.015 0 01.666 0v-2.056zm-2.305 4.361a2.011 2.011 0 010-.666h-2.055a2.013 2.013 0 010 .666h2.055zm-6 0a2.011 2.011 0 010-.666H7.972a2.013 2.013 0 010 .666h2.056zm-4.361-2.305a2.013 2.013 0 01.666 0v-2.056a2.011 2.011 0 01-.666 0v2.056z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <circle cx={6} cy={6} fill="currentColor" r={1.333} />
      <circle cx={6} cy={12} fill="currentColor" r={1.333} />
      <circle cx={18} cy={12} fill="currentColor" r={1.333} />
      <circle cx={6} cy={18} fill="currentColor" r={1.333} />
      <circle cx={12} cy={6} fill="currentColor" r={1.333} />
      <circle cx={12} cy={18} fill="currentColor" r={1.333} />
      <circle cx={18} cy={6} fill="currentColor" r={1.333} />
      <circle cx={18} cy={18} fill="currentColor" r={1.333} />
      <path
        d="M10.161 12.778a.75.75 0 001.06 1.06l-1.06-1.06zm3.703-1.581a.75.75 0 00-1.061-1.06l1.06 1.06zm-1.086 2.667a.75.75 0 001.06-1.061l-1.06 1.06zm-1.581-3.703a.75.75 0 00-1.06 1.06l1.06-1.06zm.025 3.678l2.642-2.642-1.061-1.06-2.642 2.641 1.06 1.06zm2.617-1.036l-2.642-2.642-1.06 1.06 2.641 2.643 1.06-1.061z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default UngroupIcon;
