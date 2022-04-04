/* eslint-disable no-console */
import ErrorPage from 'views/Errors/Error500';
import React from 'react';

type MyProps = {};
type MyState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    const { hasError } = this.state;
    console.group('Error');
    console.log('hasError', hasError);
    console.log(error);
    console.log(info);
    console.groupEnd();
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    console.log('error');
    if (hasError) {
      return (
        // <ErrorPage
        //   onRedirect={() => {
        //     this.setState({ hasError: false });
        //   }}
        // />
        <div>{hasError}</div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
