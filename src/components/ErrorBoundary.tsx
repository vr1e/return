import { Component, ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';
import type {
	ErrorBoundaryState,
	ErrorInfo,
	ErrorBoundaryOnError
} from '../types/errors';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: ErrorBoundaryOnError;
	showDetails?: boolean;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child
 * component tree, logs those errors, and displays a fallback UI.
 *
 * @example
 * <ErrorBoundary onError={(error, errorInfo) => logErrorToService(error, errorInfo)}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null
		};
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		// Update state so the next render will show the fallback UI
		return {
			hasError: true,
			error
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// Log error to console for debugging
		console.error('ErrorBoundary caught an error:', error, errorInfo);

		// Update state with error info
		this.setState({
			errorInfo
		});

		// Call optional error callback (e.g., for logging to external service)
		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}
	}

	resetError = (): void => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null
		});
	};

	render(): ReactNode {
		if (this.state.hasError) {
			// Render custom fallback if provided
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Render default fallback UI
			return (
				<ErrorFallback
					error={this.state.error}
					resetError={this.resetError}
					showDetails={this.props.showDetails}
				/>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
