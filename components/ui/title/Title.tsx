import styles from './Title.module.css';

interface Props {
	title: string;
	type: string;
}

export default function Title({ title, type }: Props) {
	return (
		<div className={styles.title}>
			<img
				className={styles.icon}
				src={`${type}.png`}
				alt={title}
				title={title}
			/>
			<h3>{title}</h3>
			<span className={styles.line_decoration}></span>
		</div>
	);
}
