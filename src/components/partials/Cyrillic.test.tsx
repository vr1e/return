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

describe('Cyrillic', () => {
	const renderCyrillic = () => {
		return render(
			<TransliterateContextProvider>
				<Cyrillic />
			</TransliterateContextProvider>
		);
	};

	describe('Rendering', () => {
		it('should render the textarea with the correct label and copy button text', () => {
			renderCyrillic();

			expect(
				screen.getByRole('textbox', { name: 'cyrillic text input' })
			).toBeInTheDocument();

			expect(screen.getByText('Ћирилични текст:')).toBeInTheDocument();

			expect(
				screen.getByRole('button', { name: 'Copy cyrillic text to clipboard' })
			).toHaveTextContent('Копирај');
		});

		it('should render all special letter insertion buttons in a group', () => {
			renderCyrillic();

			const group = screen.getByRole('group', {
				name: 'Insert special Cyrillic letters'
			});
			expect(group).toBeInTheDocument();

			const letters = ['ђ', 'ж', 'ћ', 'ч', 'ш'];
			letters.forEach(letter => {
				const button = screen.getByRole('button', {
					name: `Insert Cyrillic letter ${letter}`
				});
				expect(button).toBeInTheDocument();
				expect(button).toHaveTextContent(letter);
			});
		});
	});

	describe('Letter Insertion', () => {
		it('should insert a letter at the current cursor position', async () => {
			const user = userEvent.setup();
			renderCyrillic();

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			}) as HTMLTextAreaElement;

			await user.type(textarea, 'тест');
			textarea.setSelectionRange(2, 2); // Set cursor after 'с'

			const button = screen.getByRole('button', {
				name: /Insert Cyrillic letter ђ/
			});
			await user.click(button);

			await waitFor(() => {
				expect(textarea.value).toBe('теђст');
				expect(textarea.selectionStart).toBe(3);
			});
		});

		it('should replace selected text with an inserted letter', async () => {
			const user = userEvent.setup();
			renderCyrillic();

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			}) as HTMLTextAreaElement;

			await user.type(textarea, 'тест');
			textarea.setSelectionRange(1, 3); // Select 'ес'

			const button = screen.getByRole('button', {
				name: /Insert Cyrillic letter ж/
			});
			await user.click(button);

			await waitFor(() => {
				expect(textarea.value).toBe('тжт');
			});
		});

		it('should restore focus to the textarea after inserting a letter', async () => {
			const user = userEvent.setup();
			renderCyrillic();

			const textarea = screen.getByRole('textbox', {
				name: 'cyrillic text input'
			});
			await user.click(textarea);
			expect(textarea).toHaveFocus();

			const button = screen.getByRole('button', {
				name: /Insert Cyrillic letter ђ/
			});
			await user.click(button);

			await waitFor(() => {
				expect(textarea).toHaveFocus();
			});
		});
	});

	describe('Integration with Transliterate Context', () => {
		it('should update Latin text when Cyrillic text is entered', async () => {
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

			await user.type(cyrillicTextarea, 'тест');

			await waitFor(() => {
				expect(latinTextarea).toHaveValue('test');
			});
		});

		it('should update Latin text when a special letter is inserted', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Cyrillic />
					<Latin />
				</TransliterateContextProvider>
			);

			const button = screen.getByRole('button', {
				name: /Insert Cyrillic letter ђ/
			});
			const latinTextarea = screen.getByRole('textbox', {
				name: 'latin text input'
			});

			await user.click(button);

			await waitFor(() => {
				expect(latinTextarea).toHaveValue('đ');
			});
		});
	});
});
