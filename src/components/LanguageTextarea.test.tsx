import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import LanguageTextarea from './LanguageTextarea';

// Mock the useAutoResize hook
vi.mock('../hooks/useAutoResize', () => ({
	useAutoResize: vi.fn()
}));

describe('LanguageTextarea', () => {
	const defaultProps = {
		id: 'cyrillic' as const,
		label: 'Test Label:',
		value: 'Test content',
		onChange: vi.fn(),
		theme: 'primary' as const,
		copyButtonText: 'Copy'
	};

	describe('Rendering', () => {
		it('should render textarea with correct props', () => {
			render(<LanguageTextarea {...defaultProps} />);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute('id', 'cyrillic');
			expect(textarea).toHaveAttribute('name', 'cyrillic');
			expect(textarea).toHaveValue('Test content');
		});

		it('should render label with correct text and theme', () => {
			render(<LanguageTextarea {...defaultProps} />);

			const label = screen.getByText('Test Label:');
			expect(label).toBeInTheDocument();
			expect(label).toHaveClass('highlight', 'primary');
		});

		it('should render copy button with correct text', () => {
			render(<LanguageTextarea {...defaultProps} />);

			const button = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent('Copy');
		});

		it('should render children when provided', () => {
			render(
				<LanguageTextarea {...defaultProps}>
					<div data-testid='child-element'>Child content</div>
				</LanguageTextarea>
			);

			expect(screen.getByTestId('child-element')).toBeInTheDocument();
			expect(screen.getByText('Child content')).toBeInTheDocument();
		});

		it('should apply secondary theme correctly', () => {
			render(<LanguageTextarea {...defaultProps} theme='secondary' />);

			const label = screen.getByText('Test Label:');
			expect(label).toHaveClass('highlight', 'secondary');
		});
	});

	describe('Copy Functionality', () => {
		it('should copy text to clipboard on button click', async () => {
			const user = userEvent.setup();
			const writeTextMock = vi.fn().mockResolvedValue(undefined);
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: writeTextMock },
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} value='Text to copy' />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});
			await user.click(copyButton);

			expect(writeTextMock).toHaveBeenCalledWith('Text to copy');
		});

		it('should copy empty string when value is empty', async () => {
			const user = userEvent.setup();
			const writeTextMock = vi.fn().mockResolvedValue(undefined);
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: writeTextMock },
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} value='' />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});
			await user.click(copyButton);

			expect(writeTextMock).toHaveBeenCalledWith('');
		});

		it('should show success indicator after copy', async () => {
			const user = userEvent.setup();
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: vi.fn().mockResolvedValue(undefined) },
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(copyButton);

			await waitFor(() => {
				expect(copyButton).toHaveTextContent('✓');
				expect(copyButton).toHaveClass('copy-success');
			});
		});

		it('should announce copy success to screen readers', async () => {
			const user = userEvent.setup();
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: vi.fn().mockResolvedValue(undefined) },
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(copyButton);

			await waitFor(() => {
				const announcement = screen.getByText(
					'Text copied to clipboard successfully'
				);
				expect(announcement).toBeInTheDocument();

				const liveRegion = announcement.closest('[aria-live="polite"]');
				expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
				expect(liveRegion).toHaveClass('sr-only');
			});
		});

		it('should hide success indicator after timeout', async () => {
			const user = userEvent.setup();
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: vi.fn().mockResolvedValue(undefined) },
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(copyButton);

			// Success should show
			await waitFor(() => {
				expect(copyButton).toHaveTextContent('✓');
			});

			// Success should hide after 1500ms
			await waitFor(
				() => {
					expect(copyButton).not.toHaveTextContent('✓');
				},
				{ timeout: 2000 }
			);
		});

		it('should handle clipboard API errors gracefully', async () => {
			const user = userEvent.setup();
			const consoleErrorSpy = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			Object.defineProperty(navigator, 'clipboard', {
				value: {
					writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
				},
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(copyButton);

			await waitFor(() => {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					'Failed to copy text:',
					expect.any(Error)
				);
			});

			consoleErrorSpy.mockRestore();
		});

		it('should show error message when clipboard API fails', async () => {
			const user = userEvent.setup();
			vi.spyOn(console, 'error').mockImplementation(() => {});
			Object.defineProperty(navigator, 'clipboard', {
				value: {
					writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
				},
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(copyButton);

			await waitFor(() => {
				expect(
					screen.getByText('Failed to copy. Please try again.')
				).toBeInTheDocument();
				expect(copyButton).toHaveTextContent('✗');
			});
		});

		it('should announce error to screen readers', async () => {
			const user = userEvent.setup();
			vi.spyOn(console, 'error').mockImplementation(() => {});
			Object.defineProperty(navigator, 'clipboard', {
				value: {
					writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
				},
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(copyButton);

			await waitFor(() => {
				const announcement = screen.getByText(
					'Failed to copy text to clipboard'
				);
				expect(announcement).toBeInTheDocument();
			});
		});

		it('should hide error message after timeout', async () => {
			const user = userEvent.setup();
			vi.spyOn(console, 'error').mockImplementation(() => {});
			Object.defineProperty(navigator, 'clipboard', {
				value: {
					writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
				},
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(copyButton);

			// Error should show
			await waitFor(() => {
				expect(
					screen.getByText('Failed to copy. Please try again.')
				).toBeInTheDocument();
			});

			// Error should hide after 3000ms
			await waitFor(
				() => {
					expect(
						screen.queryByText('Failed to copy. Please try again.')
					).not.toBeInTheDocument();
				},
				{ timeout: 3500 }
			);
		});

		it('should handle missing clipboard API', async () => {
			const user = userEvent.setup();
			vi.spyOn(console, 'error').mockImplementation(() => {});
			Object.defineProperty(navigator, 'clipboard', {
				value: undefined,
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(copyButton);

			await waitFor(() => {
				expect(
					screen.getByText('Failed to copy. Please try again.')
				).toBeInTheDocument();
			});
		});
	});

	describe('Keyboard Shortcuts', () => {
		it('should copy text on Ctrl+C', async () => {
			const user = userEvent.setup();
			const writeTextMock = vi.fn().mockResolvedValue(undefined);
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: writeTextMock },
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} value='Test text' />);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});

			await user.click(textarea);
			await user.keyboard('{Control>}c{/Control}');

			expect(writeTextMock).toHaveBeenCalledWith('Test text');
		});

		it('should copy text on Cmd+C (Meta key)', async () => {
			const user = userEvent.setup();
			const writeTextMock = vi.fn().mockResolvedValue(undefined);
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: writeTextMock },
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} value='Test text' />);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});

			await user.click(textarea);
			await user.keyboard('{Meta>}c{/Meta}');

			expect(writeTextMock).toHaveBeenCalledWith('Test text');
		});

		it('should show success indicator after keyboard shortcut', async () => {
			const user = userEvent.setup();
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: vi.fn().mockResolvedValue(undefined) },
				writable: true,
				configurable: true
			});

			render(<LanguageTextarea {...defaultProps} />);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});
			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
			});

			await user.click(textarea);
			await user.keyboard('{Control>}c{/Control}');

			await waitFor(() => {
				expect(copyButton).toHaveTextContent('✓');
			});
		});
	});

	describe('Focus Management', () => {
		it('should add active class on focus', async () => {
			const user = userEvent.setup();
			render(<LanguageTextarea {...defaultProps} />);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});

			expect(textarea).not.toHaveClass('active');

			await user.click(textarea);

			expect(textarea).toHaveClass('active');
		});

		it('should remove active class on blur', async () => {
			const user = userEvent.setup();
			render(<LanguageTextarea {...defaultProps} />);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});

			await user.click(textarea);
			expect(textarea).toHaveClass('active');

			await user.tab();
			expect(textarea).not.toHaveClass('active');
		});
	});

	describe('onChange Handler', () => {
		it('should call onChange when text is entered', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(<LanguageTextarea {...defaultProps} onChange={handleChange} />);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});

			await user.click(textarea);
			await user.type(textarea, 'a');

			expect(handleChange).toHaveBeenCalled();
		});
	});

	describe('Ref Forwarding', () => {
		it('should forward ref to textarea element', () => {
			const ref = createRef<HTMLTextAreaElement>();

			render(<LanguageTextarea {...defaultProps} ref={ref} />);

			expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
			expect(ref.current?.id).toBe('cyrillic');
		});

		it('should work without forwarded ref', () => {
			render(<LanguageTextarea {...defaultProps} />);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});
			expect(textarea).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('should have proper aria-label on textarea', () => {
			render(<LanguageTextarea {...defaultProps} id='cyrillic' />);

			const textarea = screen.getByRole('textbox');
			expect(textarea).toHaveAttribute('aria-label', 'cyrillic text input');
		});

		it('should have proper aria-label on copy button', () => {
			render(<LanguageTextarea {...defaultProps} id='latin' />);

			const button = screen.getByRole('button', {
				name: 'Copy latin text to clipboard'
			});
			expect(button).toHaveAttribute(
				'aria-label',
				'Copy latin text to clipboard'
			);
		});

		it('should have aria-live region for announcements', () => {
			render(<LanguageTextarea {...defaultProps} />);

			const liveRegion = document.querySelector('[aria-live="polite"]');
			expect(liveRegion).toBeInTheDocument();
			expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
			expect(liveRegion).toHaveClass('sr-only');
		});

		it('should associate label with textarea', () => {
			render(<LanguageTextarea {...defaultProps} />);

			const label = screen.getByText('Test Label:').closest('label');
			expect(label).toHaveAttribute('for', 'cyrillic');
		});
	});
});
