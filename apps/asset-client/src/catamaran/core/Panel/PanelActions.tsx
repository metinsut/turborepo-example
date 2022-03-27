import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const PanelActions = ({ children }: Props) => {
  const childrenArray = React.Children.toArray(children);
  const renderElement = childrenArray.map((child, index) => {
    if (index === 0) {
      return <div key={index.toString()}>{child}</div>;
    }
    return (
      <div className="flex align-items-center" key={index.toString()}>
        <div className="divider-vertical" />
        {child}
      </div>
    );
  });

  return <div className="panel-action mt16">{renderElement}</div>;
};

export default PanelActions;
