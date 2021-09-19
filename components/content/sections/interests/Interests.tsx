import { Fragment } from 'react';
import { IInterests } from '../../../../interfaces';
import Title from '../../../ui/title/Title';
import styles from './Interests.module.scss';

interface Props {
	interests: IInterests;
}

export default function Interests({ interests }: Props): JSX.Element {
	return (
		<>
			<Title title={interests.title} type={interests.type} />
			<section>
				<div className={styles.content_list}>
					{interests.content.data.map((item: string, idx: number) => (
						<Fragment key={idx}>
							<span className={styles.content_list_item}>{item}</span>
						</Fragment>
					))}
				</div>
			</section>
		</>
	);
}
