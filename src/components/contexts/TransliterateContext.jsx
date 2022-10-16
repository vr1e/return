import React, { createContext, useState, useEffect } from 'react';
import transliterateToCyrillic from '../../helpers/transliterateToCyrillic';
import transliterateToLatin from '../../helpers/transliterateToLatin';
import isUpperCase from '../../helpers/isUpperCase';

export const TransliterateContext = createContext();

function TransliterateContextProvider(props) {
	const [cyrillic, setCyrillic] = useState('');
	const [latin, setLatin] = useState('');
	const [lastEdit, setLastEdit] = useState(null);

	const handleCyrillic = e => {
		const newContent = e.target.value;
		setLastEdit(e.target.name);
		setCyrillic(newContent);
	};

	const handleLatin = e => {
		const newContent = e.target.value;
		setLastEdit(e.target.name);
		setLatin(newContent);
	};

	const replaceText = (el, e) => {
		let content = el.current.value;
		const selectedText = content.slice(
			el.current.selectionStart,
			el.current.selectionEnd
		);

		const replacementText = isUpperCase(selectedText)
			? e.currentTarget.text.toUpperCase()
			: e.currentTarget.text;

		let newContent =
			content.slice(0, el.current.selectionStart) +
			replacementText +
			content.slice(el.current.selectionEnd);

		setLastEdit(e.target.name);
		setCyrillic(newContent);
	};

	useEffect(() => {
		if (lastEdit === 'cyrillic') {
			setLatin(transliterateToLatin(cyrillic));
		} else if (lastEdit === 'latin') {
			setCyrillic(transliterateToCyrillic(latin));
		} else {
			return;
		}
	}, [cyrillic, latin]);

	return (
		<TransliterateContext.Provider
			value={{ cyrillic, latin, handleCyrillic, handleLatin, replaceText }}>
			{props.children}
		</TransliterateContext.Provider>
	);
}

export default TransliterateContextProvider;
