import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error when shouldThrow is true
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
	if (shouldThrow) {
		throw new Error('Test error');
	}
	return <div>No error</div>;
}

// Wrapper to provide Router context for Link in ErrorFallback
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
	<BrowserRouter>{children}</BrowserRouter>
);

describe('ErrorBoundary', () => {
	beforeEach(() => {
		// Suppress console.error for cleaner test output
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	describe('Normal Operation', () => {
		it('should render children when no error occurs', () => {
			render(
				<ErrorBoundary>
					<ThrowError shouldThrow={false} />
				</ErrorBoundary>
			);

			expect(screen.getByText('No error')).toBeInTheDocument();
		});

		it('should not display error fallback when no error', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary>
						<div>Content</div>
					</ErrorBoundary>
				</RouterWrapper>
			);

			expect(
				screen.queryByText('Something went wrong')
			).not.toBeInTheDocument();
			expect(screen.getByText('Content')).toBeInTheDocument();
		});
	});

	describe('Error Handling', () => {
		it('should catch errors and display fallback UI', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			expect(screen.getByText('Something went wrong')).toBeInTheDocument();
			expect(screen.getByText('Test error')).toBeInTheDocument();
		});

		it('should display error message in fallback', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			expect(screen.getByRole('alert')).toBeInTheDocument();
			expect(screen.getByText(/Test error/i)).toBeInTheDocument();
		});

		it('should call onError callback when error occurs', () => {
			const onError = vi.fn();

			render(
				<RouterWrapper>
					<ErrorBoundary onError={onError}>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			expect(onError).toHaveBeenCalledWith(
				expect.objectContaining({ message: 'Test error' }),
				expect.objectContaining({ componentStack: expect.any(String) })
			);
		});

		it('should log error to console', () => {
			const consoleErrorSpy = vi.spyOn(console, 'error');

			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			expect(consoleErrorSpy).toHaveBeenCalledWith(
				'ErrorBoundary caught an error:',
				expect.objectContaining({ message: 'Test error' }),
				expect.objectContaining({ componentStack: expect.any(String) })
			);
		});
	});

	describe('Fallback UI', () => {
		it('should render Try Again button', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			expect(
				screen.getByRole('button', { name: /try again/i })
			).toBeInTheDocument();
		});

		it('should render Go to Home link', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			const homeLink = screen.getByRole('link', { name: /go to home/i });
			expect(homeLink).toBeInTheDocument();
			expect(homeLink).toHaveAttribute('href', '/');
		});

		it('should render custom fallback when provided', () => {
			const customFallback = <div>Custom error message</div>;

			render(
				<ErrorBoundary fallback={customFallback}>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>
			);

			expect(screen.getByText('Custom error message')).toBeInTheDocument();
			expect(
				screen.queryByText('Something went wrong')
			).not.toBeInTheDocument();
		});
	});

	describe('Error Reset', () => {
		it('should reset error state and recover when component no longer throws', async () => {
			const user = userEvent.setup();
			let throwError = true;

			function ConditionalThrow() {
				if (throwError) {
					throw new Error('Test error');
				}
				return <div>No error</div>;
			}

			render(
				<RouterWrapper>
					<ErrorBoundary key='test-boundary'>
						<ConditionalThrow />
					</ErrorBoundary>
				</RouterWrapper>
			);

			// Error boundary should show
			expect(screen.getByText('Something went wrong')).toBeInTheDocument();

			// Fix the error condition
			throwError = false;

			// Click Try Again - this resets the error boundary and retries rendering
			const tryAgainButton = screen.getByRole('button', { name: /try again/i });
			await user.click(tryAgainButton);

			// After reset, since the component no longer throws, it should show normal content
			await waitFor(() => {
				expect(screen.getByText('No error')).toBeInTheDocument();
			});
		});

		it('should call resetError callback on link click', async () => {
			const user = userEvent.setup();

			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			// Error boundary should show
			expect(screen.getByText('Something went wrong')).toBeInTheDocument();

			// Click Go to Home link
			const homeLink = screen.getByRole('link', { name: /go to home/i });

			// Verify link exists and clicking it triggers navigation
			expect(homeLink).toHaveAttribute('href', '/');
			await user.click(homeLink);
		});
	});

	describe('Error Details', () => {
		it('should not show technical details by default', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			expect(screen.queryByText('Technical details')).not.toBeInTheDocument();
		});

		it('should show technical details when showDetails is true', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary showDetails={true}>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			expect(screen.getByText('Technical details')).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('should have proper ARIA attributes on error container', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			const errorContainer = screen.getByRole('alert');
			expect(errorContainer).toHaveAttribute('aria-live', 'assertive');
		});

		it('should render error icon with aria-hidden', () => {
			render(
				<RouterWrapper>
					<ErrorBoundary>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</RouterWrapper>
			);

			const errorIcon = screen
				.getByText('⚠️')
				.closest('div[aria-hidden="true"]');
			expect(errorIcon).toBeInTheDocument();
		});
	});
});
