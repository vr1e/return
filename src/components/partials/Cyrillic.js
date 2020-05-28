import React, { useState, useEffect, useContext, useRef } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

const cyrReplacementLetters = 'ђжћчш';

export default function Cyrillic() {
	const { cyrillic, handleCyrillic } = useContext(TransliterateContext);
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
				style={{ height: `${height}px` }}
				placeholder=''
				ref={refCyrillic}
				value={cyrillic}
				onChange={e => handleCyrillic(e.target.value)}
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
						// onClick={e => replaceText(refCyrillic, e)}
					>
						{letter}
					</a>
				))}
			</div>
		</div>
	);
}

{
}
