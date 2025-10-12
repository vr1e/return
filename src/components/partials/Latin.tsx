import { useTransliterate } from '../../hooks/useTransliterate';
import LanguageTextarea from '../LanguageTextarea';

// Latin text input panel - displays text and auto-converts to Cyrillic
export default function Latin() {
	const { latin, handleLatin } = useTransliterate();

	return (
		<LanguageTextarea
			id='latin'
			label='Latin text:'
			value={latin}
			onChange={handleLatin}
			theme='secondary'
			copyButtonText='Copy'
		/>
	);
}
