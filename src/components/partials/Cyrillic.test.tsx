import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cyrillic from './Cyrillic';
import TransliterateContextProvider from '../contexts/TransliterateContext';

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
});
