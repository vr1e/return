import { Link } from 'react-router-dom';
import styles from './ErrorFallback.module.css';

interface ErrorFallbackProps {
	error?: Error | null;
	resetError?: () => void;
	showDetails?: boolean;
}

function ErrorFallback({
	error,
	resetError,
	showDetails = false
}: ErrorFallbackProps) {
	const errorMessage =
		error?.message || 'An unexpected error occurred. Please try again.';

	return (
		<div className={styles.errorContainer} role='alert' aria-live='assertive'>
			<div className={styles.errorIcon} aria-hidden='true'>
				⚠️
			</div>
			<h1 className={styles.errorTitle}>Something went wrong</h1>
			<p className={styles.errorMessage}>{errorMessage}</p>
			{showDetails && error && (
				<details className={styles.errorDetails}>
					<summary>Technical details</summary>
					<pre>{error.stack}</pre>
				</details>
			)}
			<div className={styles.buttonGroup}>
				{resetError && (
					<button
						className={`${styles.button} ${styles.primaryButton}`}
						onClick={resetError}
						type='button'>
						Try Again
					</button>
				)}
				<Link
					to='/'
					className={`${styles.button} ${styles.secondaryButton}`}
					onClick={resetError}>
					Go to Home
				</Link>
			</div>
		</div>
	);
}

export default ErrorFallback;
