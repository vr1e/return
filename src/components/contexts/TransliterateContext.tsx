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
import containsUpperCase from '../../helpers/containsUpperCase';
import { trackTransliteration } from '../../utils/analytics';

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
			setCyrillic(newContent);

			// Restore focus and position cursor after inserted letter
			setTimeout(() => {
				if (element.current) {
					element.current.focus();
					const newCursorPos = selectionStart + replacementText.length;
					element.current.setSelectionRange(newCursorPos, newCursorPos);
				}
			}, 0);
		}
	};

	useEffect(() => {
		if (lastEdit === 'cyrillic') {
			setLatin(transliterate(cyrillic, 'toLatin'));
		} else if (lastEdit === 'latin') {
			setCyrillic(transliterate(latin, 'toCyrillic'));
		}

		// Only set up tracking if there's a valid lastEdit
		if (lastEdit === 'cyrillic' || lastEdit === 'latin') {
			// Track transliteration usage with debouncing (only track after 2 seconds of inactivity)
			if (trackingTimeoutRef.current !== null) {
				clearTimeout(trackingTimeoutRef.current);
			}

			const text = lastEdit === 'cyrillic' ? cyrillic : latin;
			if (text.length > 0) {
				trackingTimeoutRef.current = window.setTimeout(() => {
					trackTransliteration({
						direction: lastEdit === 'cyrillic' ? 'toLatin' : 'toCyrillic',
						textLength: text.length
					});
				}, 2000);
			}
		}

		// Always return cleanup function
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
