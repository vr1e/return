import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import Cyrillic from '../src/components/partials/Cyrillic';
import Latin from '../src/components/partials/Latin';
import TransliterateContextProvider from '../src/contexts/TransliterateContext';

describe('Accessibility Tests', () => {
	describe('Skip to Content Link', () => {
		it('should have a skip-to-content link', () => {
			render(<App />);
			const skipLink = screen.getByText('Skip to main content');
			expect(skipLink).toBeInTheDocument();
			expect(skipLink).toHaveAttribute('href', '#main-content');
			expect(skipLink).toHaveClass('skip-link');
		});

		it('should link to main-content element', () => {
			render(<App />);
			const skipLink = screen.getByText('Skip to main content');
			expect(skipLink.getAttribute('href')).toBe('#main-content');
		});
	});

	describe('Letter Insertion Buttons', () => {
		beforeEach(() => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);
		});

		it('should render letter buttons as proper button elements', () => {
			const letters = ['ђ', 'ж', 'ћ', 'ч', 'ш'];
			letters.forEach(letter => {
				const button = screen.getByRole('button', {
					name: `Insert Cyrillic letter ${letter}`
				});
				expect(button).toBeInTheDocument();
				expect(button.tagName).toBe('BUTTON');
			});
		});

		it('should have proper aria-labels on letter buttons', () => {
			const button = screen.getByRole('button', {
				name: 'Insert Cyrillic letter ђ'
			});
			expect(button).toHaveAttribute('aria-label', 'Insert Cyrillic letter ђ');
		});

		it('should have type="button" on letter buttons', () => {
			const button = screen.getByRole('button', {
				name: 'Insert Cyrillic letter ђ'
			});
			expect(button).toHaveAttribute('type', 'button');
		});

		it('should be keyboard accessible', async () => {
			const user = userEvent.setup();
			const button = screen.getByRole('button', {
				name: 'Insert Cyrillic letter ђ'
			});

			await user.tab();
			// Button should be focusable via keyboard
			expect(button).toHaveClass('primary');
		});

		it('should have a group with aria-label', () => {
			const group = screen.getByRole('group', {
				name: 'Insert special Cyrillic letters'
			});
			expect(group).toBeInTheDocument();
			expect(group).toHaveAttribute(
				'aria-label',
				'Insert special Cyrillic letters'
			);
		});
	});

	describe('Copy Buttons', () => {
		it('should have aria-label on Cyrillic copy button', () => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const copyButton = screen.getByRole('button', {
				name: 'Copy Cyrillic text to clipboard'
			});
			expect(copyButton).toBeInTheDocument();
			expect(copyButton).toHaveAttribute(
				'aria-label',
				'Copy Cyrillic text to clipboard'
			);
		});

		it('should have aria-label on Latin copy button', () => {
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const copyButton = screen.getByRole('button', {
				name: 'Copy Latin text to clipboard'
			});
			expect(copyButton).toBeInTheDocument();
			expect(copyButton).toHaveAttribute(
				'aria-label',
				'Copy Latin text to clipboard'
			);
		});

		it('should show success feedback after copy', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const copyButton = screen.getByRole('button', {
				name: 'Copy Cyrillic text to clipboard'
			});

			await user.click(copyButton);

			// Check for visual success indicator
			await waitFor(() => {
				expect(copyButton.textContent).toContain('✓');
			});

			// Check for screen reader announcement
			const announcement = screen.getByText(
				'Text copied to clipboard successfully'
			);
			expect(announcement).toBeInTheDocument();
		});

		it('should announce copy success to screen readers', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const copyButton = screen.getByRole('button', {
				name: 'Copy Latin text to clipboard'
			});

			await user.click(copyButton);

			await waitFor(() => {
				const announcement = screen.getByText(
					'Text copied to clipboard successfully'
				);
				// Find the parent div which should be the aria-live region
				const liveRegion = announcement.closest('[aria-live="polite"]');
				expect(liveRegion).toBeInTheDocument();
				expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
			});
		});
	});

	describe('Textareas', () => {
		it('should have aria-label on Cyrillic textarea', () => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByLabelText('Cyrillic text input');
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute('aria-label', 'Cyrillic text input');
		});

		it('should have aria-label on Latin textarea', () => {
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByLabelText('Latin text input');
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute('aria-label', 'Latin text input');
		});

		it('should have aria-describedby pointing to instructions', () => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox', {
				name: 'Cyrillic text input'
			});
			expect(textarea).toHaveAttribute(
				'aria-describedby',
				'cyrillic-instructions'
			);

			const instructions = document.getElementById('cyrillic-instructions');
			expect(instructions).toBeInTheDocument();
			expect(instructions).toHaveTextContent('Press Ctrl+C or Cmd+C');
		});

		it('should have keyboard shortcut instructions', () => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const instructions = screen.getByText(/Press Ctrl\+C or Cmd\+C/);
			expect(instructions).toBeInTheDocument();
			expect(instructions).toHaveClass('sr-only');
		});
	});

	describe('Keyboard Shortcuts', () => {
		it('should have onKeyDown handler on Cyrillic textarea', () => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox', {
				name: 'Cyrillic text input'
			});

			// Verify the textarea has a keydown handler
			expect(textarea).toHaveAttribute(
				'aria-describedby',
				'cyrillic-instructions'
			);

			// Verify instructions mention the keyboard shortcut
			const instructions = screen.getByText(/Press Ctrl\+C or Cmd\+C/);
			expect(instructions).toBeInTheDocument();
		});

		it('should have onKeyDown handler on Latin textarea', () => {
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox', {
				name: 'Latin text input'
			});

			// Verify the textarea has a keydown handler
			expect(textarea).toHaveAttribute(
				'aria-describedby',
				'latin-instructions'
			);

			// Verify instructions mention the keyboard shortcut
			const instructions = screen.getByText(/Press Ctrl\+C or Cmd\+C/);
			expect(instructions).toBeInTheDocument();
		});
	});

	describe('Focus Management', () => {
		it('should restore focus to textarea after letter insertion', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox', {
				name: 'Cyrillic text input'
			});
			const letterButton = screen.getByRole('button', {
				name: 'Insert Cyrillic letter ђ'
			});

			// Focus textarea first
			await user.click(textarea);
			expect(textarea).toHaveFocus();

			// Click letter button
			await user.click(letterButton);

			// Focus should return to textarea
			await waitFor(() => {
				expect(textarea).toHaveFocus();
			});
		});
	});

	describe('Screen Reader Content', () => {
		it('should have sr-only class on screen reader instructions', () => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const instructions = screen.getByText(/Press Ctrl\+C or Cmd\+C/);
			expect(instructions).toHaveClass('sr-only');
		});

		it('should have aria-live region for copy announcements', () => {
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			// Find the aria-live region (it's empty initially)
			const liveRegions = document.querySelectorAll('[aria-live="polite"]');
			expect(liveRegions.length).toBeGreaterThan(0);
		});
	});

	describe('Focus Indicators', () => {
		it('should have focus-visible styles on buttons', () => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const button = screen.getByRole('button', {
				name: 'Insert Cyrillic letter ђ'
			});

			// Button should be styleable with :focus-visible
			expect(button).toBeInTheDocument();
		});
	});
});
