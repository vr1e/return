import styles from './Tooltip.module.scss';

interface Props {
	content: string;
	children?: any
}

export default function Tooltip(props: Props): JSX.Element {
	if (!props.content) return <>{props.children}</>

	return (
		<a data-tooltip={props.content} className={styles.tooltip}>
			{props.children}
		</a>
	);
}