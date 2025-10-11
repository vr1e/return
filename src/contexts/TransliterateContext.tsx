import {
	createContext,
	useState,
	useEffect,
	useRef,
	ReactNode,
	ChangeEvent,
	RefObject
} from 'react';
import transliterate from 'serbian-transliterate';
import containsUpperCase from '../helpers/containsUpperCase';
import { analytics } from '../services/analytics';

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
	const trackingTimeoutRef = useRef<number | null>(null);

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
			if (name === 'cyrillic') {
				setCyrillic(newContent);
			} else if (name === 'latin') {
				setLatin(newContent);
			}
		}
	};

	useEffect(() => {
		if (lastEdit === 'cyrillic') {
			setLatin(transliterate(cyrillic, 'toLatin'));
		} else if (lastEdit === 'latin') {
			setCyrillic(transliterate(latin, 'toCyrillic'));
		}
	}, [cyrillic, latin, lastEdit]);

	useEffect(() => {
		// Debounce tracking to avoid firing on every keystroke
		if (trackingTimeoutRef.current !== null) {
			clearTimeout(trackingTimeoutRef.current);
		}

		// Only track if there was an edit and there is text
		if (lastEdit === 'cyrillic' || lastEdit === 'latin') {
			const text = lastEdit === 'cyrillic' ? cyrillic : latin;

			if (text.length > 0) {
				trackingTimeoutRef.current = window.setTimeout(() => {
					analytics.trackTransliteration({
						direction: lastEdit === 'cyrillic' ? 'toLatin' : 'toCyrillic',
						textLength: text.length
					});
				}, 2000);
			}
		}

		return () => {
			if (trackingTimeoutRef.current !== null) {
				clearTimeout(trackingTimeoutRef.current);
			}
		};
	}, [cyrillic, latin, lastEdit]);

	return (
		<TransliterateContext.Provider
			value={{ cyrillic, latin, handleCyrillic, handleLatin, replaceText }}>
			{children}
		</TransliterateContext.Provider>
	);
}

export default TransliterateContextProvider;
