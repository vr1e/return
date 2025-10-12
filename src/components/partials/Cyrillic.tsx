import { useRef } from 'react';
import { useTransliterate } from '../../hooks/useTransliterate';
import LanguageTextarea from '../LanguageTextarea';

const cyrReplacementLetters = 'ђжћчш';

// Cyrillic text input panel with special letter insertion buttons
function Cyrillic() {
	const { cyrillic, handleCyrillic, setCyrillic } = useTransliterate();
	const refCyrillic = useRef<HTMLTextAreaElement>(null);

	const handleInsertLetter = (letter: string) => {
		const textarea = refCyrillic.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;

		const newValue =
			cyrillic.substring(0, start) + letter + cyrillic.substring(end);

		// Use type-safe setter for programmatic updates
		setCyrillic(newValue);

		// Wait for React re-render before setting cursor position after inserted letter
		textarea.focus();
		requestAnimationFrame(() => {
			if (refCyrillic.current) {
				refCyrillic.current.selectionStart = refCyrillic.current.selectionEnd =
					start + 1;
			}
		});
	};

	return (
		<LanguageTextarea
			ref={refCyrillic} // Ref needed for letter insertion and cursor control
			id='cyrillic'
			label='Ћирилични текст:'
			value={cyrillic}
			onChange={handleCyrillic}
			theme='primary'
			copyButtonText='Копирај'>
			<div
				className='button-list'
				role='group'
				aria-label='Insert special Cyrillic letters'>
				{cyrReplacementLetters.split('').map((letter, idx) => (
					<button
						key={idx}
						type='button'
						className='primary'
						onClick={() => handleInsertLetter(letter)}
						aria-label={`Insert Cyrillic letter ${letter}`}>
						{letter}
					</button>
				))}
			</div>
		</LanguageTextarea>
	);
}

export default Cyrillic;
