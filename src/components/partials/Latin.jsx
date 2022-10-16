import React, { useState, useRef, useEffect, useContext } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

function Latin() {
	const { latin, handleLatin } = useContext(TransliterateContext);
	const [active, setActive] = useState(false);
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
				className={active ? 'active' : ''}
				style={{ height: `${height}px` }}
				placeholder=''
				ref={refLatin}
				value={latin}
				onChange={e => handleLatin(e)}
				onFocus={() => {
					setActive(true);
				}}
				onBlur={() => setActive(false)}
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
