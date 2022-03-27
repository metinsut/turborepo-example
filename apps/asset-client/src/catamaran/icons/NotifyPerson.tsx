import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function NotifyPerson(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 32 32">
      <circle cx="16" cy="16" fill="currentColor" opacity="0.1" r="16" />
      <path
        clipRule="evenodd"
        d="M17.9955 9.45215H12.881C10.6718 9.45215 8.88095 11.243 8.88095 13.4522V19.1188C8.88095 21.328 10.6718 23.1188 12.881 23.1188H18.5476C20.7568 23.1188 22.5476 21.328 22.5476 19.1188V14.0043C22.2372 14.1518 21.901 14.2538 21.5476 14.3018V19.1188C21.5476 20.7757 20.2045 22.1188 18.5476 22.1188H12.881C11.2241 22.1188 9.88095 20.7757 9.88095 19.1188V13.4522C9.88095 11.7953 11.2241 10.4521 12.881 10.4521H17.6979C17.746 10.0988 17.848 9.76258 17.9955 9.45215Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <ellipse cx="21.0833" cy="10.9161" fill="currentColor" rx="2.44047" ry="2.44048" />
      <g opacity="0.7">
        <ellipse cx="15.7143" cy="14.5714" fill="currentColor" rx="2.57143" ry="2.57143" />
        <path
          clipRule="evenodd"
          d="M13.7598 17.0331C12.7032 17.6909 12 18.8628 12 20.199V20.5717H19.4534V20.199C19.4534 18.8569 18.744 17.6806 17.6797 17.0244C17.1414 17.4563 16.458 17.7146 15.7143 17.7146C14.9755 17.7146 14.2963 17.4597 13.7598 17.0331Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </g>
    </IconBase>
  );
}

export default NotifyPerson;
