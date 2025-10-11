import { useState, useRef, useEffect, useContext } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

export default function Latin() {
	const transliterate = useContext(TransliterateContext);
	const [active, setActive] = useState(false);
	const [height, setHeight] = useState(200);
	const [copySuccess, setCopySuccess] = useState(false);
	const refLatin = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (refLatin?.current) {
			if (refLatin.current.scrollHeight > height)
				setHeight(refLatin.current.scrollHeight + 5);
		}
	}, [transliterate?.latin]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(transliterate?.latin || '');
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
			<div id='latin-instructions' className='sr-only'>
				Press Ctrl+C or Cmd+C to copy text to clipboard.
			</div>
			<label htmlFor='latin'>
				<span className='highlight secondary'>Latin text:</span>
			</label>
			<textarea
				id='latin'
				name='latin'
				className={active ? 'active' : ''}
				style={{ height: `${height}px` }}
				placeholder=''
				ref={refLatin}
				value={transliterate?.latin}
				onChange={transliterate?.handleLatin}
				onKeyDown={handleKeyDown}
				onFocus={() => {
					setActive(true);
				}}
				onBlur={() => setActive(false)}
				aria-describedby='latin-instructions'
				aria-label='Latin text input'
			/>
			<button
				className={`secondary ${copySuccess ? 'copy-success' : ''}`}
				onClick={handleCopy}
				aria-label='Copy Latin text to clipboard'>
				Copy{copySuccess ? ' ✓' : ''}
			</button>
			<div aria-live='polite' aria-atomic='true' className='sr-only'>
				{copySuccess && 'Text copied to clipboard successfully'}
			</div>
		</div>
	);
}
