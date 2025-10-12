import {
	createContext,
	useReducer,
	ReactNode,
	ChangeEvent,
	RefObject,
	useEffect,
	useRef
} from 'react';
import transliterate from 'serbian-transliterate';
import { analytics } from '../services/analytics';
import containsUpperCase from '../helpers/containsUpperCase';

interface ITransliterateState {
	cyrillic: string;
	latin: string;
	lastEdit: 'cyrillic' | 'latin' | null;
}

type Action =
	| { type: 'SET_CYRILLIC'; payload: string }
	| { type: 'SET_LATIN'; payload: string }
	| {
			type: 'REPLACE_TEXT';
			payload: {
				name: 'cyrillic' | 'latin';
				element: RefObject<HTMLTextAreaElement>;
				letter: string;
			};
	  };

interface ITransliterateContext extends Omit<ITransliterateState, 'lastEdit'> {
	handleCyrillic: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	handleLatin: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	setCyrillic: (text: string) => void;
	setLatin: (text: string) => void;
	replaceText: (
		element: RefObject<HTMLTextAreaElement>,
		letter: string
	) => void;
}

export const TransliterateContext = createContext<ITransliterateContext | null>(
	null
);

const transliterateReducer = (
	state: ITransliterateState,
	action: Action
): ITransliterateState => {
	switch (action.type) {
		case 'SET_CYRILLIC':
			return {
				cyrillic: action.payload,
				latin: transliterate(action.payload, 'toLatin'),
				lastEdit: 'cyrillic'
			};
		case 'SET_LATIN':
			return {
				latin: action.payload,
				cyrillic: transliterate(action.payload, 'toCyrillic'),
				lastEdit: 'latin'
			};
		case 'REPLACE_TEXT': {
			const { element, letter, name } = action.payload;
			if (!element.current) return state;

			const { value, selectionStart, selectionEnd } = element.current;
			const selectedText = value.slice(selectionStart, selectionEnd);
			const replacementText = containsUpperCase(selectedText)
				? letter.toUpperCase()
				: letter;

			const newContent =
				value.slice(0, selectionStart) +
				replacementText +
				value.slice(selectionEnd);

			if (name === 'cyrillic') {
				return {
					cyrillic: newContent,
					latin: transliterate(newContent, 'toLatin'),
					lastEdit: 'cyrillic'
				};
			} else {
				return {
					latin: newContent,
					cyrillic: transliterate(newContent, 'toCyrillic'),
					lastEdit: 'latin'
				};
			}
		}
		default:
			return state;
	}
};

function TransliterateContextProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(transliterateReducer, {
		cyrillic: '',
		latin: '',
		lastEdit: null
	});

	const trackingTimeoutRef = useRef<number | null>(null);

	// Effect for handling analytics tracking.
	// It tracks transliteration usage with a 2-second debounce.
	useEffect(() => {
		const cleanup = () => {
			if (trackingTimeoutRef.current) {
				clearTimeout(trackingTimeoutRef.current);
			}
		};

		cleanup(); // Clear previous timeout on every run.

		if (!state.lastEdit) {
			return; // Don't track initial state or if there's no edit.
		}

		const text = state.lastEdit === 'cyrillic' ? state.cyrillic : state.latin;

		if (text.length > 0) {
			trackingTimeoutRef.current = window.setTimeout(() => {
				analytics.trackTransliteration({
					direction: state.lastEdit === 'cyrillic' ? 'toLatin' : 'toCyrillic',
					textLength: text.length
				});
			}, 2000);
		}

		return cleanup;
	}, [state.cyrillic, state.latin, state.lastEdit]);

	const handleCyrillic = (event: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch({ type: 'SET_CYRILLIC', payload: event.target.value });
	};

	const handleLatin = (event: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch({ type: 'SET_LATIN', payload: event.target.value });
	};

	const setCyrillic = (text: string) => {
		dispatch({ type: 'SET_CYRILLIC', payload: text });
	};

	const setLatin = (text: string) => {
		dispatch({ type: 'SET_LATIN', payload: text });
	};

	const replaceText = (
		element: RefObject<HTMLTextAreaElement>,
		letter: string
	) => {
		if (element.current) {
			dispatch({
				type: 'REPLACE_TEXT',
				payload: {
					name: element.current.name as 'cyrillic' | 'latin',
					element,
					letter
				}
			});
		}
	};

	const { lastEdit: _, ...restState } = state;

	return (
		<TransliterateContext.Provider
			value={{
				...restState,
				handleCyrillic,
				handleLatin,
				setCyrillic,
				setLatin,
				replaceText
			}}>
			{children}
		</TransliterateContext.Provider>
	);
}

export default TransliterateContextProvider;
