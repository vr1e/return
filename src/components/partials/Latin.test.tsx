import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransliterateContextProvider from '../../contexts/TransliterateContext';
import Cyrillic from './Cyrillic';
import Latin from './Latin';

// Mock the useAutoResize hook as it's not relevant to this component's logic
vi.mock('../../hooks/useAutoResize', () => ({
	useAutoResize: vi.fn()
}));

describe('Latin', () => {
	const renderLatin = () => {
		return render(
			<TransliterateContextProvider>
				<Latin />
			</TransliterateContextProvider>
		);
	};

	describe('Rendering', () => {
		it('should render the textarea with the correct label and copy button text', () => {
			renderLatin();

			expect(
				screen.getByRole('textbox', { name: 'latin text input' })
			).toBeInTheDocument();

			expect(screen.getByText('Latin text:')).toBeInTheDocument();

			expect(
				screen.getByRole('button', { name: 'Copy latin text to clipboard' })
			).toHaveTextContent('Copy');
		});

		it('should not render any special letter insertion buttons', () => {
			renderLatin();

			const letterButtons = screen.queryAllByRole('button', {
				name: /Insert .* letter/
			});

			expect(letterButtons).toHaveLength(0);
		});
	});

	describe('Integration with Transliterate Context', () => {
		it('should update Cyrillic text when Latin text is entered', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Cyrillic />
					<Latin />
				</TransliterateContextProvider>
			);

			const cyrillicTextarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});
			const latinTextarea = screen.getByRole('textbox', {
				name: 'latin text input'
			});

			await user.type(latinTextarea, 'test');

			await waitFor(() => {
				expect(cyrillicTextarea).toHaveValue('тест');
			});
		});

		it('should update Cyrillic text for letters with diacritics', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Cyrillic />
					<Latin />
				</TransliterateContextProvider>
			);

			const cyrillicTextarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});
			const latinTextarea = screen.getByRole('textbox', {
				name: 'latin text input'
			});

			await user.type(latinTextarea, 'đšćčž');

			await waitFor(() => {
				expect(cyrillicTextarea).toHaveValue('ђшћчж');
			});
		});
	});
});
