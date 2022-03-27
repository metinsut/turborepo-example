import { ContractProperty, MetricProperty } from 'store/slices/contracts/types';
import React from 'react';

export interface SectionWrapperProps {
  sectionProps: ContractProperty | MetricProperty;
}

export function withSectionWrapper<T extends SectionWrapperProps>(
  WrappedComponent: React.FunctionComponent<T>
) {
  return (props: T) => {
    const { sectionProps } = props;
    if (!sectionProps.isVisible) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
