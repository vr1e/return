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
});
