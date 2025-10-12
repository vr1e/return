// Error type definitions for error handling and reporting

export interface ErrorInfo {
	componentStack: string;
}

export interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

export interface ErrorTrackingParams {
	errorName: string;
	errorMessage: string;
	componentStack?: string;
	userAction?: string;
}

export type ErrorBoundaryOnError = (
	error: Error,
	errorInfo: ErrorInfo
) => void;
