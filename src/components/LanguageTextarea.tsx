import {
	useState,
	ReactNode,
	forwardRef,
	useRef,
	useImperativeHandle,
	type ChangeEvent,
	type RefObject,
	type KeyboardEvent
} from 'react';
import { useAutoResize } from '../hooks/useAutoResize';

interface LanguageTextareaProps {
	id: 'cyrillic' | 'latin';
	label: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	replaceText?: (
		element: RefObject<HTMLTextAreaElement>,
		letter: string
	) => void;
	theme: 'primary' | 'secondary';
	copyButtonText: string;
	children?: ReactNode;
}

// eslint-disable-next-line react/display-name
const LanguageTextarea = forwardRef<HTMLTextAreaElement, LanguageTextareaProps>(
	(
		{ id, label, value, onChange, theme, copyButtonText, children },
		forwardedRef
	) => {
		const [active, setActive] = useState(false);
		const [copySuccess, setCopySuccess] = useState(false);

		const internalRef = useRef<HTMLTextAreaElement>(null);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		useImperativeHandle(forwardedRef, () => internalRef.current!, []);
		useAutoResize(internalRef, value);

		const handleCopy = async () => {
			try {
				await navigator.clipboard.writeText(value || '');
				setCopySuccess(true);
				setTimeout(() => setCopySuccess(false), 1500);
			} catch (err) {
				console.error('Failed to copy text:', err);
			}
		};

		const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
				event.preventDefault();
				void handleCopy();
			}
		};

		return (
			<div className='language-input'>
				<label htmlFor={id}>
					<span className={`highlight ${theme}`}>{label}</span>
				</label>
				<textarea
					id={id}
					name={id}
					className={active ? 'active' : ''}
					ref={internalRef}
					value={value}
					onChange={onChange}
					onKeyDown={handleKeyDown}
					onFocus={() => setActive(true)}
					onBlur={() => setActive(false)}
					aria-label={`${id} text input`}
				/>
				<button
					className={`${theme} ${copySuccess ? 'copy-success' : ''}`}
					onClick={() => void handleCopy()}
					aria-label={`Copy ${id} text to clipboard`}>
					{copyButtonText}
					{copySuccess ? ' ✓' : ''}
				</button>
				{children}
				<div aria-live='polite' aria-atomic='true' className='sr-only'>
					{copySuccess && 'Text copied to clipboard successfully'}
				</div>
			</div>
		);
	}
);

export default LanguageTextarea;
