import { Fragment } from 'react';
import { IHobbies } from '../../../../interfaces';
import Title from '../../../ui/title/Title';
import styles from './Hobbies.module.scss';

interface Props {
	hobbies: IHobbies;
}

export default function Hobbies({ hobbies }: Props): JSX.Element {
	return (
		<>
			<Title title={hobbies.title} type={hobbies.type} />
			<section>
				<div className={styles.content_list}>
					{hobbies.content.data.map((item: string, idx: number) => (
						<Fragment key={idx}>
							<span className={styles.content_list_item}>{item}</span>
						</Fragment>
					))}
				</div>
			</section>
		</>
	);
}
