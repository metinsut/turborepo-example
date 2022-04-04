import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function GroupIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 22 22">
      <path
        clipRule="evenodd"
        d="M5.333 6.972a2.013 2.013 0 01-.666 0v2.056a2.014 2.014 0 01.666 0V6.972zm1.64-1.639h2.055a2.013 2.013 0 010-.666H6.972a2.013 2.013 0 010 .666zm6-.666a2.013 2.013 0 010 .666h2.055a2.011 2.011 0 010-.666h-2.056zm4.36 2.305a2.014 2.014 0 01-.666 0v2.056a2.015 2.015 0 01.666 0V6.972zm0 6a2.011 2.011 0 01-.666 0v2.056a2.015 2.015 0 01.666 0v-2.056zm-2.305 4.361a2.011 2.011 0 010-.666h-2.056a2.013 2.013 0 010 .666h2.056zm-6 0a2.014 2.014 0 010-.666H6.972a2.013 2.013 0 010 .666h2.056zm-4.361-2.305a2.013 2.013 0 01.666 0v-2.056a2.011 2.011 0 01-.666 0v2.056z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <circle cx={5} cy={5} fill="currentColor" r={1.333} />
      <circle cx={5} cy={11} fill="currentColor" r={1.333} />
      <circle cx={17} cy={11} fill="currentColor" r={1.333} />
      <circle cx={5} cy={17} fill="currentColor" r={1.333} />
      <circle cx={11} cy={5} fill="currentColor" r={1.333} />
      <circle cx={11} cy={17} fill="currentColor" r={1.333} />
      <circle cx={17} cy={5} fill="currentColor" r={1.333} />
      <circle cx={17} cy={17} fill="currentColor" r={1.333} />
    </IconBase>
  );
}

export default GroupIcon;
