import { describe, it, expect, vi } from 'vitest';
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

		it('should allow keyboard focus on letter buttons', async () => {
			const user = userEvent.setup();

			const letterButton = screen.getByRole('button', {
				name: 'Insert Cyrillic letter ђ'
			});

			// Tab through the focusable elements to the letter button
			await user.tab(); // textarea
			await user.tab(); // copy button
			await user.tab(); // first letter button

			expect(letterButton).toHaveFocus();
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
				name: 'Copy cyrillic text to clipboard'
			});
			expect(copyButton).toBeInTheDocument();
			expect(copyButton).toHaveAttribute(
				'aria-label',
				'Copy cyrillic text to clipboard'
			);
		});

		it('should have aria-label on Latin copy button', () => {
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const copyButton = screen.getByRole('button', {
				name: 'Copy latin text to clipboard'
			});
			expect(copyButton).toBeInTheDocument();
			expect(copyButton).toHaveAttribute(
				'aria-label',
				'Copy latin text to clipboard'
			);
		});

		it('should show success feedback after copy', async () => {
			const user = userEvent.setup();
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: vi.fn().mockResolvedValue(undefined) },
				writable: true,
				configurable: true
			});

			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const copyButton = screen.getByRole('button', {
				name: 'Copy cyrillic text to clipboard'
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
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: vi.fn().mockResolvedValue(undefined) },
				writable: true,
				configurable: true
			});

			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const copyButton = screen.getByRole('button', {
				name: 'Copy latin text to clipboard'
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

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute('aria-label', 'cyrillic text input');
		});

		it('should have aria-label on Latin textarea', () => {
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox', {
				name: 'latin text input'
			});
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute('aria-label', 'latin text input');
		});
	});

	describe('Keyboard Shortcuts', () => {
		it('should copy Cyrillic text with Ctrl+C', async () => {
			const user = userEvent.setup();
			const writeTextMock = vi.fn().mockResolvedValue(undefined);
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: writeTextMock },
				writable: true,
				configurable: true
			});

			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});

			await user.type(textarea, 'test');
			await user.keyboard('{Control>}c{/Control}');

			expect(writeTextMock).toHaveBeenCalled();
		});

		it('should copy Latin text with Ctrl+C', async () => {
			const user = userEvent.setup();
			const writeTextMock = vi.fn().mockResolvedValue(undefined);
			Object.defineProperty(navigator, 'clipboard', {
				value: { writeText: writeTextMock },
				writable: true,
				configurable: true
			});

			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox', {
				name: 'latin text input'
			});

			await user.type(textarea, 'test');
			await user.keyboard('{Control>}c{/Control}');

			expect(writeTextMock).toHaveBeenCalled();
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
				name: 'cyrillic text input'
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
});
