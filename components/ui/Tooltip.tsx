import styles from './Tooltip.module.css';

interface Props {
	content: string;
	children?: any
}

export default function Tooltip(props: Props) {
	if (!props.content) return <>{props.children}</>

	return (
		<span data-tooltip={props.content} className={styles.tooltip}>
			{props.children}
		</span>
	);
}