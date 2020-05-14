import React, { useState, useEffect } from 'react';
import transliterateToCyrillic from '../helpers/transliterateToCyrillic';
import transliterateToLatin from '../helpers/transliterateToLatin';

export default function Transliterate() {
	const [cyrillic, setCyrillic] = useState('');
	const [latin, setLatin] = useState('');

	const [cyrHeight, setCyrHeight] = useState(200);
	const [latHeight, setLatHeight] = useState(200);

	const realTimeConvertText = e => {
		if (e.target.name === 'latin') {
			setLatin(e.target.value);
			if (e.target.scrollHeight > 200) setLatHeight(e.target.scrollHeight + 10);
		} else if (e.target.name === 'cyrillic') {
			setCyrillic(e.target.value);
			if (e.target.scrollHeight > 200) setCyrHeight(e.target.scrollHeight + 10);
		} else return;
	};

	useEffect(() => {
		setCyrillic(transliterateToCyrillic(latin));
	}, [latin]);

	useEffect(() => {
		setLatin(transliterateToLatin(cyrillic));
	}, [cyrillic]);

	return (
		<div className='transliterate-box'>
			<div className='language-input'>
				<label htmlFor='cyrillic'>
					<span className='highlight'>Cyrillic text:</span>
				</label>

				<textarea
					id='cyrillic'
					name='cyrillic'
					style={{ height: `${cyrHeight}px` }}
					placeholder=''
					value={cyrillic}
					onChange={realTimeConvertText}
				/>
			</div>
			<div className='language-input'>
				<label htmlFor='latin'>
					<span className='highlight'>Latin text:</span>
				</label>

				<textarea
					id='latin'
					name='latin'
					style={{ height: `${latHeight}px` }}
					placeholder=''
					value={latin}
					onChange={realTimeConvertText}
				/>
			</div>
		</div>
	);
}
