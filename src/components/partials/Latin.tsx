import { useRef } from 'react';
import { useTransliterate } from '../../hooks/useTransliterate';
import LanguageTextarea from '../LanguageTextarea';

export default function Latin() {
	const { latin, handleLatin } = useTransliterate();
	const refLatin = useRef<HTMLTextAreaElement>(null);

	return (
		<LanguageTextarea
			id='latin'
			label='Latin text:'
			value={latin}
			onChange={handleLatin}
			theme='secondary'
			copyButtonText='Copy'
			ref={refLatin}
		/>
	);
}
