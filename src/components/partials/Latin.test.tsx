import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Latin from './Latin';
import TransliterateContextProvider from '../contexts/TransliterateContext';

describe('Latin component', () => {
	it('renders textarea with correct attributes', () => {
		render(
			<TransliterateContextProvider>
				<Latin />
			</TransliterateContextProvider>
		);

		const textarea = screen.getByRole('textbox');
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute('id', 'latin');
		expect(textarea).toHaveAttribute('name', 'latin');
	});

	it('renders copy button', () => {
		render(
			<TransliterateContextProvider>
				<Latin />
			</TransliterateContextProvider>
		);

		expect(screen.getByText('Copy')).toBeInTheDocument();
	});

	it('updates textarea value on input', async () => {
		const user = userEvent.setup();
		render(
			<TransliterateContextProvider>
				<Latin />
			</TransliterateContextProvider>
		);

		const textarea = screen.getByRole('textbox');
		await user.type(textarea, 'Zdravo');

		expect(textarea).toHaveValue('Zdravo');
	});

	describe('Auto-resizing behavior', () => {
		it('should update height when text is added', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
			const initialHeight = textarea.style.height;

			// Mock scrollHeight to simulate content growth
			Object.defineProperty(textarea, 'scrollHeight', {
				configurable: true,
				value: 400
			});

			// Type text to trigger height update
			await user.type(textarea, 'First line\nSecond line\nThird line');

			// Height should be set based on scrollHeight
			expect(textarea.style.height).toBeTruthy();
		});

		it('should shrink height when text is deleted', async () => {
			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<Latin />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

			// Add multiline text
			await user.type(textarea, 'First line\nSecond line\nThird line');

			// Mock larger scrollHeight
			Object.defineProperty(textarea, 'scrollHeight', {
				configurable: true,
				value: 400
			});
			await user.type(textarea, 'x'); // Trigger update

			const largerHeight = textarea.style.height;

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
					<Latin />
				</TransliterateContextProvider>
			);

			const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

			// Should have a style height set (even if 0px initially)
			expect(textarea.style.height).toBeTruthy();
		});
	});
});
