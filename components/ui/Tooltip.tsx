import { ReactChild, ReactFragment, ReactPortal } from 'react';
import styles from './Tooltip.module.scss';

interface Props {
	content: string;
	children?: boolean | ReactChild | ReactFragment | ReactPortal
}

export default function Tooltip(props: Props): JSX.Element {
	return (
		<span data-tooltip={props.content} className={styles.tooltip}>
			{props.children}
		</span>
	);
}