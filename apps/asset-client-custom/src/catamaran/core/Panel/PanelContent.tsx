import React from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
}

const PanelContent = ({ className, children, content }: Props) => (
  <div className={className}>{children ?? content}</div>
);

export default PanelContent;
