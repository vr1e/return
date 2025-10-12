import { useRef } from 'react';
import { useTransliterate } from '../../hooks/useTransliterate';
import LanguageTextarea from '../LanguageTextarea';

const cyrReplacementLetters = 'ђжћчш';

function Cyrillic() {
	const { cyrillic, handleCyrillic, replaceText } = useTransliterate();
	const refCyrillic = useRef<HTMLTextAreaElement>(null);

	return (
		<LanguageTextarea
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
						onClick={() => {
							replaceText(refCyrillic, letter);
							refCyrillic.current?.focus();
						}}
						aria-label={`Insert Cyrillic letter ${letter}`}>
						{letter}
					</button>
				))}
			</div>
		</LanguageTextarea>
	);
}

export default Cyrillic;
