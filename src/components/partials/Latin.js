import React, { useState, useRef, useEffect, useContext } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

function Latin() {
	const { latin, handleLatin } = useContext(TransliterateContext);
	const [height, setHeight] = useState(200);
	const refLatin = useRef();

	useEffect(() => {
		if (refLatin.current.scrollHeight > height)
			setHeight(refLatin.current.scrollHeight + 5);
	}, [latin]);

	return (
		<div className='language-input'>
			<label htmlFor='latin'>
				<span className='highlight secondary'>Latin text:</span>
			</label>
			<textarea
				id='latin'
				name='latin'
				style={{ height: `${height}px` }}
				placeholder=''
				ref={refLatin}
				value={latin}
				onChange={e => handleLatin(e.target.value)}
			/>
			<button
				className='secondary'
				onClick={() => navigator.clipboard.writeText(latin)}>
				Copy
			</button>
		</div>
	);
}

export default Latin;
