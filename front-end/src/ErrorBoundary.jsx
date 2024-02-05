import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          {/* Display more error details if needed */}
          {this.state.error && <p>Error: {this.state.error.toString()}</p>}
          {this.state.errorInfo && (
            <p>Component Stack Trace: {this.state.errorInfo.componentStack}</p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary