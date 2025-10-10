import { useState, useEffect, useContext, useRef } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

const cyrReplacementLetters = 'ђжћчш';

function Cyrillic() {
	const transliterate = useContext(
		TransliterateContext
	);
	const [active, setActive] = useState(false);
	const [height, setHeight] = useState(200);
	const [copySuccess, setCopySuccess] = useState(false);
	const refCyrillic = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (refCyrillic?.current) {
			if (refCyrillic.current.scrollHeight > height)
				setHeight(refCyrillic.current.scrollHeight + 5);
		}
	}, [transliterate?.cyrillic]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(transliterate?.cyrillic || '');
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 1500);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// Handle Ctrl+C (Windows/Linux) or Cmd+C (Mac)
		if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
			event.preventDefault();
			handleCopy();
		}
	};

	return (
		<div className='language-input'>
			<div id='cyrillic-instructions' className='sr-only'>
				Press Ctrl+C or Cmd+C to copy text to clipboard. Use the letter insertion
				buttons below to insert special Cyrillic characters.
			</div>
			<label htmlFor='cyrillic'>
				<span className='highlight primary'>Ћирилични текст:</span>
			</label>
			<textarea
				id='cyrillic'
				name='cyrillic'
				className={active ? 'active' : ''}
				style={{ height: `${height}px` }}
				placeholder=''
				ref={refCyrillic}
				value={transliterate?.cyrillic}
				onChange={transliterate?.handleCyrillic}
				onKeyDown={handleKeyDown}
				onFocus={() => {
					setActive(true);
				}}
				onBlur={() => setActive(false)}
				aria-describedby='cyrillic-instructions'
				aria-label='Cyrillic text input'
			/>
			<button
				className={`primary ${copySuccess ? 'copy-success' : ''}`}
				onClick={handleCopy}
				aria-label='Copy Cyrillic text to clipboard'>
				Копирај{copySuccess ? ' ✓' : ''}
			</button>
			<div className='button-list' role='group' aria-label='Insert special Cyrillic letters'>
				{cyrReplacementLetters.split('').map((letter, idx) => (
					<button
						key={idx}
						type='button'
						className='primary'
						onClick={() => transliterate?.replaceText(refCyrillic, letter)}
						aria-label={`Insert Cyrillic letter ${letter}`}>
						{letter}
					</button>
				))}
			</div>
			<div aria-live='polite' aria-atomic='true' className='sr-only'>
				{copySuccess && 'Text copied to clipboard successfully'}
			</div>
		</div>
	);
}

export default Cyrillic;
