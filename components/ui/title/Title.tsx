import styles from './Title.module.scss';

interface Props {
	title: string;
	type: string;
}

export default function Title({ title, type }: Props): JSX.Element {
	return (
		<div className={styles.title}>
			<img
				className={styles.icon}
				src={`${type}.svg`}
				alt={title}
				title={title}
			/>
			<h3>{title}</h3>
			<span className={styles.line_decoration}></span>
		</div>
	);
}
