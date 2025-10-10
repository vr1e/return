import { useState, useEffect, useContext, useRef } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

const cyrReplacementLetters = 'ђжћчш';

function Cyrillic() {
	const transliterate = useContext(
		TransliterateContext
	);
	const [active, setActive] = useState(false);
	const [height, setHeight] = useState(200);
	const refCyrillic = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (refCyrillic?.current) {
			if (refCyrillic.current.scrollHeight > height)
				setHeight(refCyrillic.current.scrollHeight + 5);
		}
	}, [transliterate?.cyrillic]);

	return (
		<div className='language-input'>
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
				onFocus={() => {
					setActive(true);
				}}
				onBlur={() => setActive(false)}
			/>
			<button
				className='primary'
				onClick={() => navigator.clipboard.writeText(transliterate?.cyrillic || '')}>
				Копирај
			</button>
			<div className='button-list'>
				{cyrReplacementLetters.split('').map((letter, idx) => (
					<a
						key={idx}
						className='secondary'
						onClick={() => transliterate?.replaceText(refCyrillic, letter)}>
						{letter}
					</a>
				))}
			</div>
		</div>
	);
}

export default Cyrillic;
