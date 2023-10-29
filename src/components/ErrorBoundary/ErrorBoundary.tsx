import { Component, ReactNode } from 'react';
import style from './ErrorBoundary.module.scss';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error: error });
    console.error(`ErrorBoundary: ${error}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1 className={style.heading}>Oops! Something went wrong...</h1>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
