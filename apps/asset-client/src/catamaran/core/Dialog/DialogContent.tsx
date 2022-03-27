import React from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
}

const DialogContent = ({ className, children, content }: Props) => (
  <div className={clsx('dialog-content', className)}>{children ?? content}</div>
);

export { DialogContent };
