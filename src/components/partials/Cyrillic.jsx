import React, { useState, useEffect, useContext, useRef } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

const cyrReplacementLetters = 'ђжћчш';

function Cyrillic() {
	const { cyrillic, handleCyrillic, replaceText } = useContext(
		TransliterateContext
	);
	const [active, setActive] = useState(false);
	const [height, setHeight] = useState(200);
	const refCyrillic = useRef();

	useEffect(() => {
		if (refCyrillic.current.scrollHeight > height)
			setHeight(refCyrillic.current.scrollHeight + 5);
	}, [cyrillic]);

	return (
		<div className='language-input'>
			<label htmlFor='cyrillic'>
				<span className='highlight primary'>Ћирилични тeкст:</span>
			</label>
			<textarea
				id='cyrillic'
				name='cyrillic'
				className={active ? 'active' : ''}
				style={{ height: `${height}px` }}
				placeholder=''
				ref={refCyrillic}
				value={cyrillic}
				onChange={e => handleCyrillic(e)}
				onFocus={() => {
					setActive(true);
				}}
				onBlur={() => setActive(false)}
			/>
			<button
				className='primary'
				onClick={() => navigator.clipboard.writeText(cyrillic)}>
				Koпирaj
			</button>
			<div className='button-list'>
				{cyrReplacementLetters.split('').map((letter, idx) => (
					<a
						key={idx}
						className='secondary'
						onClick={e => replaceText(refCyrillic, e)}>
						{letter}
					</a>
				))}
			</div>
		</div>
	);
}

export default Cyrillic;
