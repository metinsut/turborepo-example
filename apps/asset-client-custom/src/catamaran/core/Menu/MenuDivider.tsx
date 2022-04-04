import { forwardRef } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
};

const MenuDivider = (props: Props, ref: any) => {
  const { className, ...rest } = props;
  return <div className={clsx(className, 'divider-horizontal my8 mx16')} {...rest} ref={ref} />;
};

export default forwardRef(MenuDivider);
