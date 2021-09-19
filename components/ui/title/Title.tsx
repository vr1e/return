import styles from './Title.module.scss';

interface Props {
	title: string;
}

export default function Title({title}: Props): JSX.Element {
	return (
		<div className={styles.title}>
			<img
				className={styles.icon}
				src={`${title.toLowerCase().replace(' ', '_')}.svg`}
				alt={title}
				title={title}
			/>
			<h3>{title}</h3>
			<span className={styles.line_decoration}></span>
		</div>
	);
}
