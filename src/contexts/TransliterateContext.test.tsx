import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useRef, useContext } from 'react';
import userEvent from '@testing-library/user-event';
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

	describe('Optimized useEffect with lastEdit', () => {
		it('should transliterate from cyrillic to latin when cyrillic is edited', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				return (
					<div>
						<textarea
							data-testid='cyrillic-input'
							name='cyrillic'
							value={context?.cyrillic}
							onChange={context?.handleCyrillic}
						/>
						<span data-testid='latin-output'>{context?.latin}</span>
					</div>
				);
			};

			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const cyrillicInput = screen.getByTestId('cyrillic-input');
			await user.type(cyrillicInput, 'Здраво');

			await waitFor(() => {
				expect(screen.getByTestId('latin-output')).toHaveTextContent('Zdravo');
			});
		});

		it('should transliterate from latin to cyrillic when latin is edited', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				return (
					<div>
						<textarea
							data-testid='latin-input'
							name='latin'
							value={context?.latin}
							onChange={context?.handleLatin}
						/>
						<span data-testid='cyrillic-output'>{context?.cyrillic}</span>
					</div>
				);
			};

			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const latinInput = screen.getByTestId('latin-input');
			await user.type(latinInput, 'Zdravo');

			await waitFor(() => {
				expect(screen.getByTestId('cyrillic-output')).toHaveTextContent(
					'Здраво'
				);
			});
		});

		it('should not cause infinite loop when switching between inputs', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				return (
					<div>
						<textarea
							data-testid='cyrillic-input'
							name='cyrillic'
							value={context?.cyrillic}
							onChange={context?.handleCyrillic}
						/>
						<textarea
							data-testid='latin-input'
							name='latin'
							value={context?.latin}
							onChange={context?.handleLatin}
						/>
					</div>
				);
			};

			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const cyrillicInput = screen.getByTestId('cyrillic-input');
			const latinInput = screen.getByTestId('latin-input');

			// Type in cyrillic
			await user.type(cyrillicInput, 'Тест');
			await waitFor(() => {
				expect(latinInput).toHaveValue('Test');
			});

			// Type in latin
			await user.clear(latinInput);
			await user.type(latinInput, 'Нови');
			await waitFor(() => {
				expect(cyrillicInput).toHaveValue('Нови');
			});

			// Verify no infinite loop by checking values are stable
			await new Promise(resolve => setTimeout(resolve, 100));
			expect(cyrillicInput).toHaveValue('Нови');
			expect(latinInput).toHaveValue('Нови');
		});

		it('should handle multiple rapid keystrokes efficiently', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				return (
					<div>
						<textarea
							data-testid='cyrillic-input'
							name='cyrillic'
							value={context?.cyrillic}
							onChange={context?.handleCyrillic}
						/>
						<span data-testid='latin-output'>{context?.latin}</span>
					</div>
				);
			};

			const user = userEvent.setup({ delay: 1 });
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const cyrillicInput = screen.getByTestId('cyrillic-input');
			// Type quickly without delay
			await user.type(cyrillicInput, 'Брзо куцање');

			await waitFor(() => {
				expect(screen.getByTestId('latin-output')).toHaveTextContent(
					'Brzo kucanje'
				);
			});
		});
	});

	describe('Generic replaceText functionality', () => {
		it('should replace text in cyrillic textarea', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				const cyrillicRef = useRef<HTMLTextAreaElement>(null);

				return (
					<div>
						<textarea
							ref={cyrillicRef}
							data-testid='cyrillic-input'
							name='cyrillic'
							value={context?.cyrillic}
							onChange={context?.handleCyrillic}
						/>
						<button
							data-testid='replace-btn'
							onClick={() => context?.replaceText(cyrillicRef, 'ђ')}>
							Replace
						</button>
						<span data-testid='latin-output'>{context?.latin}</span>
					</div>
				);
			};

			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const cyrillicInput =
				screen.getByTestId<HTMLTextAreaElement>('cyrillic-input');
			const replaceBtn = screen.getByTestId('replace-btn');

			// Type some text
			await user.type(cyrillicInput, 'тест');
			// Select the first character
			cyrillicInput.setSelectionRange(0, 1);

			// Click replace button
			await user.click(replaceBtn);

			// First character should be replaced with ђ
			await waitFor(() => {
				expect(cyrillicInput).toHaveValue('ђест');
			});

			// Latin should be transliterated
			await waitFor(() => {
				expect(screen.getByTestId('latin-output')).toHaveTextContent('đest');
			});
		});

		it('should replace text in latin textarea', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				const latinRef = useRef<HTMLTextAreaElement>(null);

				return (
					<div>
						<textarea
							ref={latinRef}
							data-testid='latin-input'
							name='latin'
							value={context?.latin}
							onChange={context?.handleLatin}
						/>
						<button
							data-testid='replace-btn'
							onClick={() => context?.replaceText(latinRef, 'đ')}>
							Replace
						</button>
						<span data-testid='cyrillic-output'>{context?.cyrillic}</span>
					</div>
				);
			};

			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const latinInput = screen.getByTestId<HTMLTextAreaElement>('latin-input');
			const replaceBtn = screen.getByTestId('replace-btn');

			// Type some text
			await user.type(latinInput, 'test');
			// Select the first character
			latinInput.setSelectionRange(0, 1);

			// Click replace button
			await user.click(replaceBtn);

			// First character should be replaced with đ
			await waitFor(() => {
				expect(latinInput).toHaveValue('đest');
			});

			// Cyrillic should be transliterated
			await waitFor(() => {
				expect(screen.getByTestId('cyrillic-output')).toHaveTextContent('ђест');
			});
		});

		it('should handle uppercase replacement in cyrillic', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				const cyrillicRef = useRef<HTMLTextAreaElement>(null);

				return (
					<div>
						<textarea
							ref={cyrillicRef}
							data-testid='cyrillic-input'
							name='cyrillic'
							value={context?.cyrillic}
							onChange={context?.handleCyrillic}
						/>
						<button
							data-testid='replace-btn'
							onClick={() => context?.replaceText(cyrillicRef, 'ђ')}>
							Replace
						</button>
					</div>
				);
			};

			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const cyrillicInput =
				screen.getByTestId<HTMLTextAreaElement>('cyrillic-input');
			const replaceBtn = screen.getByTestId('replace-btn');

			// Type uppercase text
			await user.type(cyrillicInput, 'ТЕСТ');
			// Select the first character
			cyrillicInput.setSelectionRange(0, 1);

			// Click replace button
			await user.click(replaceBtn);

			// Should replace with uppercase version
			await waitFor(() => {
				expect(cyrillicInput).toHaveValue('ЂЕСТ');
			});
		});

		it('should handle lowercase replacement in cyrillic', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				const cyrillicRef = useRef<HTMLTextAreaElement>(null);

				return (
					<div>
						<textarea
							ref={cyrillicRef}
							data-testid='cyrillic-input'
							name='cyrillic'
							value={context?.cyrillic}
							onChange={context?.handleCyrillic}
						/>
						<button
							data-testid='replace-btn'
							onClick={() => context?.replaceText(cyrillicRef, 'ђ')}>
							Replace
						</button>
					</div>
				);
			};

			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const cyrillicInput =
				screen.getByTestId<HTMLTextAreaElement>('cyrillic-input');
			const replaceBtn = screen.getByTestId('replace-btn');

			// Type lowercase text
			await user.type(cyrillicInput, 'тест');
			// Select the first character
			cyrillicInput.setSelectionRange(0, 1);

			// Click replace button
			await user.click(replaceBtn);

			// Should replace with lowercase version
			await waitFor(() => {
				expect(cyrillicInput).toHaveValue('ђест');
			});
		});

		it('should replace selected text range', async () => {
			const TestComponent = () => {
				const context = useContext(TransliterateContext);
				const cyrillicRef = useRef<HTMLTextAreaElement>(null);

				return (
					<div>
						<textarea
							ref={cyrillicRef}
							data-testid='cyrillic-input'
							name='cyrillic'
							value={context?.cyrillic}
							onChange={context?.handleCyrillic}
						/>
						<button
							data-testid='replace-btn'
							onClick={() => context?.replaceText(cyrillicRef, 'ђ')}>
							Replace
						</button>
					</div>
				);
			};

			const user = userEvent.setup();
			render(
				<TransliterateContextProvider>
					<TestComponent />
				</TransliterateContextProvider>
			);

			const cyrillicInput =
				screen.getByTestId<HTMLTextAreaElement>('cyrillic-input');
			const replaceBtn = screen.getByTestId('replace-btn');

			// Type some text
			await user.type(cyrillicInput, 'тест');
			// Select multiple characters (first two)
			cyrillicInput.setSelectionRange(0, 2);

			// Click replace button
			await user.click(replaceBtn);

			// Selected text should be replaced with single character
			await waitFor(() => {
				expect(cyrillicInput).toHaveValue('ђст');
			});
		});
	});
});
