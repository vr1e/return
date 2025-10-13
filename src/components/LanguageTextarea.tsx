import {
	useState,
	forwardRef,
	useRef,
	type ReactNode,
	type ChangeEvent,
	type KeyboardEvent
} from 'react';
import { useAutoResize } from '../hooks/useAutoResize';
import { logger } from '../utils/logger';

interface LanguageTextareaProps {
	id: 'cyrillic' | 'latin';
	label: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	theme: 'primary' | 'secondary';
	copyButtonText: string;
	children?: ReactNode;
}

const LanguageTextarea = forwardRef<HTMLTextAreaElement, LanguageTextareaProps>(
	({ id, label, value, onChange, theme, copyButtonText, children }, ref) => {
		const [active, setActive] = useState(false);
		const [copySuccess, setCopySuccess] = useState(false);
		const [copyError, setCopyError] = useState(false);

		// Use forwarded ref if provided, otherwise create a local ref for the hook
		const localRef = useRef<HTMLTextAreaElement>(null);
		const targetRef = (ref || localRef) as React.RefObject<HTMLTextAreaElement>;

		useAutoResize(targetRef, value);

		const handleCopy = async () => {
			try {
				// Check if clipboard API is available
				if (!navigator.clipboard) {
					throw new Error(
						'Clipboard API is not supported in this browser or context (requires HTTPS)'
					);
				}

				await navigator.clipboard.writeText(value || '');
				setCopySuccess(true);
				setCopyError(false);
				setTimeout(() => setCopySuccess(false), 1500);
			} catch (err) {
				logger.logError('Failed to copy text', err, { textareaId: id });
				setCopyError(true);
				setCopySuccess(false);
				setTimeout(() => setCopyError(false), 3000);
			}
		};

		// Intercept Ctrl+C/Cmd+C to use custom copy functionality
		const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
				event.preventDefault();
				handleCopy();
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
					ref={targetRef}
					value={value}
					onChange={onChange}
					onKeyDown={handleKeyDown}
					onFocus={() => setActive(true)}
					onBlur={() => setActive(false)}
					aria-label={`${id} text input`}
				/>
				<button
					className={`${theme} ${copySuccess ? 'copy-success' : ''} ${
						copyError ? 'copy-error' : ''
					}`}
					onClick={handleCopy}
					aria-label={`Copy ${id} text to clipboard`}>
					{copyButtonText}
					{copySuccess ? ' ✓' : ''}
					{copyError ? ' ✗' : ''}
				</button>
				{copyError && (
					<div className='error-message' role='alert'>
						Failed to copy. Please try again.
					</div>
				)}
				{children}
				<div aria-live='polite' aria-atomic='true' className='sr-only'>
					{copySuccess && 'Text copied to clipboard successfully'}
					{copyError && 'Failed to copy text to clipboard'}
				</div>
			</div>
		);
	}
);

LanguageTextarea.displayName = 'LanguageTextarea';

export default LanguageTextarea;
