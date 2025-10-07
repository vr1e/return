import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	ChangeEvent,
	RefObject
} from 'react';
import transliterate from 'serbian-transliterate';
import containsUpperCase from '../../helpers/containsUpperCase';

interface ITransliterateContext {
	cyrillic: string;
	latin: string;
	handleCyrillic: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	handleLatin: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	replaceText: (
		element: RefObject<HTMLTextAreaElement>,
		letter: string
	) => void;
}

export const TransliterateContext = createContext<ITransliterateContext | null>(
	null
);

function TransliterateContextProvider({ children }: { children: ReactNode }) {
	const [cyrillic, setCyrillic] = useState('');
	const [latin, setLatin] = useState('');
	const [lastEdit, setLastEdit] = useState<string | null>(null);

	const handleCyrillic = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setLastEdit(event.target.name);
		setCyrillic(event.target.value);
	};

	const handleLatin = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setLastEdit(event.target.name);
		setLatin(event.target.value);
	};

	const replaceText = (
		element: RefObject<HTMLTextAreaElement>,
		letter: string
	) => {
		if (element.current) {
			const { value, selectionStart, selectionEnd, name } = element.current;
			const selectedText = value.slice(selectionStart, selectionEnd);
			const replacementText = containsUpperCase(selectedText)
				? letter.toUpperCase()
				: letter;

			const newContent =
				value.slice(0, element.current.selectionStart) +
				replacementText +
				value.slice(element.current.selectionEnd);

			setLastEdit(name);
			setCyrillic(newContent);
		}
	};

	useEffect(() => {
		if (lastEdit === 'cyrillic') {
			setLatin(transliterate(cyrillic, 'toLatin'));
		} else if (lastEdit === 'latin') {
			setCyrillic(transliterate(latin, 'toCyrillic'));
		} else {
			return;
		}
	}, [cyrillic, latin]);

	return (
		<TransliterateContext.Provider
			value={{ cyrillic, latin, handleCyrillic, handleLatin, replaceText }}>
			{children}
		</TransliterateContext.Provider>
	);
}

export default TransliterateContextProvider;
