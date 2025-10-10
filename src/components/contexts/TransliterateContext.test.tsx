import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import TransliterateContextProvider, {
	TransliterateContext
} from './TransliterateContext';

describe('TransliterateContext', () => {
	it('provides context values', () => {
		const TestComponent = () => {
			const context = useContext(TransliterateContext);
			return (
				<div>
					<span data-testid='cyrillic'>{context?.cyrillic}</span>
					<span data-testid='latin'>{context?.latin}</span>
				</div>
			);
		};

		render(
			<TransliterateContextProvider>
				<TestComponent />
			</TransliterateContextProvider>
		);

		expect(screen.getByTestId('cyrillic')).toBeInTheDocument();
		expect(screen.getByTestId('latin')).toBeInTheDocument();
	});

	it('initializes with empty strings', () => {
		const TestComponent = () => {
			const context = useContext(TransliterateContext);
			return (
				<div>
					<span data-testid='cyrillic'>{context?.cyrillic || 'empty'}</span>
					<span data-testid='latin'>{context?.latin || 'empty'}</span>
				</div>
			);
		};

		render(
			<TransliterateContextProvider>
				<TestComponent />
			</TransliterateContextProvider>
		);

		expect(screen.getByTestId('cyrillic')).toHaveTextContent('empty');
		expect(screen.getByTestId('latin')).toHaveTextContent('empty');
	});
});
