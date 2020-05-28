import React, { createContext, useState } from 'react';

export const TransliterateContext = createContext();

function TransliterateContextProvider(props) {
	const [cyrillic, setCyrillic] = useState('');
	const [latin, setLatin] = useState('');

	const handleCyrillic = newContent => {
		setCyrillic(newContent);
	};

	const handleLatin = newContent => {
		setLatin(newContent);
	};

	return (
		<TransliterateContext.Provider
			value={{ cyrillic, latin, handleCyrillic, handleLatin }}>
			{props.children}
		</TransliterateContext.Provider>
	);
}

export default TransliterateContextProvider;
