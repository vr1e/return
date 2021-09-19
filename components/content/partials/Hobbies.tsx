import { Fragment } from 'react';
import styles from './Hobbies.module.scss';

interface Props {
	content: string[];
}

export default function Hobbies({ content }: Props): JSX.Element {
	return (
		<div className={styles.content_list}>
			{content.map((item: string, idx: number) => (
				<Fragment key={idx}>
					<span className={styles.content_list_item}>{item}</span>
				</Fragment>
			))}
		</div>
	);
}
