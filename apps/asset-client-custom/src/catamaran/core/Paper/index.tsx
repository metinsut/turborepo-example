import React from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: String;
  style?: React.CSSProperties;
};

const Paper = React.forwardRef((props: Props, ref: any) => {
  const { className, style, ...rest } = props;
  return (
    <section
      className={clsx(className, 'elev-2 bg-white radius-16')}
      ref={ref}
      style={style}
      {...rest}
    />
  );
});

export default Paper;
