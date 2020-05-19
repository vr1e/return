import React, { useState, useEffect, useRef } from 'react';
import transliterateToCyrillic from '../helpers/transliterateToCyrillic';
import transliterateToLatin from '../helpers/transliterateToLatin';

export default function Transliterate() {
	const [cyrillic, setCyrillic] = useState('');
	const [latin, setLatin] = useState('');
	const refCyrillic = useRef();
	const refLatin = useRef();

	const [cyrHeight, setCyrHeight] = useState(200);
	const [latHeight, setLatHeight] = useState(200);

	const realTimeConvertText = e => {
		if (e.target.name === 'latin') {
			setLatin(e.target.value);

		} else if (e.target.name === 'cyrillic') {
			setCyrillic(e.target.value);

		} else return;
	};

	useEffect(() => setCyrillic(transliterateToCyrillic(latin)), [latin]);

	useEffect(() => setLatin(transliterateToLatin(cyrillic)), [cyrillic]);

	useEffect(() => {
		if (refCyrillic.current.scrollHeight > cyrHeight) setCyrHeight(refCyrillic.current.scrollHeight + 5);
		if (refLatin.current.scrollHeight > latHeight) setLatHeight(refLatin.current.scrollHeight + 5);
	}, [cyrillic, latin])

	return (
		<div className='transliterate-box'>
			<div className='language-input'>
				<label htmlFor='cyrillic'>
					<span className='highlight primary'>Cyrillic text:</span>
				</label>

				<textarea
					id='cyrillic'
					name='cyrillic'
					style={{ height: `${cyrHeight}px` }}
					placeholder=''
					ref={refCyrillic}
					value={cyrillic}
					onChange={realTimeConvertText}
				/>
				<button className="primary" onClick={() => {navigator.clipboard.writeText(cyrillic)}}>Copy</button>
			</div>
			<div className='language-input'>
				<label htmlFor='latin'>
					<span className='highlight secondary'>Latin text:</span>
				</label>

				<textarea
					id='latin'
					name='latin'
					style={{ height: `${latHeight}px` }}
					placeholder=''
					ref={refLatin}
					value={latin}
					onChange={realTimeConvertText}
				/>
				<button className="secondary" onClick={() => {navigator.clipboard.writeText(latin)}}>Copy</button>
			</div>
		</div>
	);
}
