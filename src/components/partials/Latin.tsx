import { useState, useRef, useEffect, useContext } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

export default function Latin() {
	const transliterate = useContext(TransliterateContext);
	const [active, setActive] = useState(false);
	const [height, setHeight] = useState(200);
	const refLatin = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (refLatin?.current) {
			if (refLatin.current.scrollHeight > height)
				setHeight(refLatin.current.scrollHeight + 5);
		}
	}, [transliterate?.latin]);

	return (
		<div className='language-input'>
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
				onFocus={() => {
					setActive(true);
				}}
				onBlur={() => setActive(false)}
			/>
			<button
				className='secondary'
				onClick={() => navigator.clipboard.writeText(transliterate?.latin || '')}>
				Copy
			</button>
		</div>
	);
}
