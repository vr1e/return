import { useContext } from 'react';
import { TransliterateContext } from '../contexts/TransliterateContext';

export const useTransliterate = () => {
	const context = useContext(TransliterateContext);
	if (context === null) {
		throw new Error(
			'useTransliterate must be used within a TransliterateContextProvider'
		);
	}
	return context;
};
