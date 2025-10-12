import {
	createContext,
	useReducer,
	ReactNode,
	ChangeEvent,
	RefObject
} from 'react';
import transliterate from 'serbian-transliterate';
import containsUpperCase from '../helpers/containsUpperCase';
// Note: Analytics logic is omitted for brevity but can be easily added back into the dispatch functions.

interface ITransliterateState {
	cyrillic: string;
	latin: string;
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

interface ITransliterateContext extends ITransliterateState {
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

const transliterateReducer = (
	state: ITransliterateState,
	action: Action
): ITransliterateState => {
	switch (action.type) {
		case 'SET_CYRILLIC':
			return {
				cyrillic: action.payload,
				latin: transliterate(action.payload, 'toLatin')
			};
		case 'SET_LATIN':
			return {
				latin: action.payload,
				cyrillic: transliterate(action.payload, 'toCyrillic')
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
					latin: transliterate(newContent, 'toLatin')
				};
			} else {
				return {
					latin: newContent,
					cyrillic: transliterate(newContent, 'toCyrillic')
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
		latin: ''
	});

	const handleCyrillic = (event: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch({ type: 'SET_CYRILLIC', payload: event.target.value });
	};

	const handleLatin = (event: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch({ type: 'SET_LATIN', payload: event.target.value });
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

	return (
		<TransliterateContext.Provider
			value={{ ...state, handleCyrillic, handleLatin, replaceText }}>
			{children}
		</TransliterateContext.Provider>
	);
}

export default TransliterateContextProvider;
