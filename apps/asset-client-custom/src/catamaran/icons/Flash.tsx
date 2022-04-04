import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function FlashIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="m5.521 12.56 9.414-7.964c.195-.165.482.034.397.274l-2.048 5.797a.25.25 0 0 0 .236.333h4.825a.25.25 0 0 1 .166.437l-8.96 8c-.186.166-.474-.012-.408-.252l1.604-5.87a.25.25 0 0 0-.241-.315H5.683a.25.25 0 0 1-.162-.44Z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default FlashIcon;
