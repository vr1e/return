import React from 'react';
// import transliterateToCyrillic from '../helpers/transliterateToCyrillic';
// import transliterateToLatin from '../helpers/transliterateToLatin';
// import isUpperCase from '../helpers/isUpperCase';
import Convert from './partials/Convert';

import Cyrillic from './partials/Cyrillic';
import Latin from './partials/Latin';
import TransliterateContextProvider from './contexts/TransliterateContext';

export default function Transliterate() {
	// const realTimeConvertText = e => {
	// 	if (e.target.name === 'latin')
	// 		setLatin(transliterateToLatin(e.target.value));
	// 	else if (e.target.name === 'cyrillic') {
	// 		const transliteratedText = transliterateToCyrillic(e.target.value);
	// 		setCyrillic(transliteratedText);
	// 	} else return;
	// };

	// const replaceText = (el, e) => {
	// 	let content = el.current.value;
	// 	const selectedText = content.slice(
	// 		el.current.selectionStart,
	// 		el.current.selectionEnd
	// 	);

	// 	const replacementText = isUpperCase(selectedText)
	// 		? e.currentTarget.text.toUpperCase()
	// 		: e.currentTarget.text;

	// 	let newContent =
	// 		content.slice(0, el.current.selectionStart) +
	// 		replacementText +
	// 		content.slice(el.current.selectionEnd);
	// 	setCyrillic(newContent);
	// };

	// useEffect(() => setCyrillic(transliterateToCyrillic(latin)), [latin]);

	// useEffect(() => setLatin(transliterateToLatin(cyrillic)), [cyrillic]);

	// useEffect(() => {
	// 	if (refCyrillic.current.scrollHeight > cyrHeight)
	// 		setCyrHeight(refCyrillic.current.scrollHeight + 5);
	// 	if (refLatin.current.scrollHeight > latHeight)
	// 		setLatHeight(refLatin.current.scrollHeight + 5);
	// }, [cyrillic, latin]);

	return (
		<div className='transliterate-box'>
			<TransliterateContextProvider>
				<Cyrillic />

				<Convert />

				<Latin />
			</TransliterateContextProvider>
		</div>
	);
}
