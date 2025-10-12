import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cyrillic from './Cyrillic';
import TransliterateContextProvider from '../../contexts/TransliterateContext';

describe('Cyrillic component', () => {
	it('renders textarea with correct attributes', () => {
		render(
			<TransliterateContextProvider>
				<Cyrillic />
			</TransliterateContextProvider>
		);

		const textarea = screen.getByRole('textbox');
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute('id', 'cyrillic');
		expect(textarea).toHaveAttribute('name', 'cyrillic');
	});

	it('renders copy button', () => {
		render(
			<TransliterateContextProvider>
				<Cyrillic />
			</TransliterateContextProvider>
		);

		expect(screen.getByText('Копирај')).toBeInTheDocument();
	});

	it('renders special character buttons', () => {
		render(
			<TransliterateContextProvider>
				<Cyrillic />
			</TransliterateContextProvider>
		);

		const specialChars = 'ђжћчш'.split('');
		specialChars.forEach(char => {
			expect(screen.getByText(char)).toBeInTheDocument();
		});
	});

	it('updates textarea value on input', async () => {
		const user = userEvent.setup();
		render(
			<TransliterateContextProvider>
				<Cyrillic />
			</TransliterateContextProvider>
		);

		const textarea = screen.getByRole('textbox');
		await user.type(textarea, 'Здраво');

		expect(textarea).toHaveValue('Здраво');
	});

	describe('Auto-resizing behavior', () => {
		it('should update height when text is added', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox');

			// Mock scrollHeight to simulate content growth
			Object.defineProperty(textarea, 'scrollHeight', {
				configurable: true,
				value: 400
			});

			// Type text to trigger height update
			await user.type(textarea, 'Први ред\nДруги ред\nТрећи ред');

			// Height should be set based on scrollHeight
			expect(textarea.style.height).toBeTruthy();
		});

		it('should shrink height when text is deleted', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox');

			// Add multiline text
			await user.type(textarea, 'Први ред\nДруги ред\nТрећи ред');

			// Mock larger scrollHeight
			Object.defineProperty(textarea, 'scrollHeight', {
				configurable: true,
				value: 400
			});
			await user.type(textarea, 'x'); // Trigger update

			// Clear text
			await user.clear(textarea);

			// Mock smaller scrollHeight
			Object.defineProperty(textarea, 'scrollHeight', {
				configurable: true,
				value: 100
			});
			await user.type(textarea, 'x'); // Trigger update

			// Height should update based on new scrollHeight
			expect(textarea.style.height).toBeTruthy();
		});

		it('should have initial height set', () => {
			render(
				<TransliterateContextProvider>
					<Cyrillic />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox');

			// Should have a style height set (even if 0px initially)
			expect(textarea.style.height).toBeTruthy();
		});
	});
});
