import { IArticle } from '../../../interfaces';
// import Lists from '../../ui/Lists';
import styles from './Article.module.scss';
import Responsibilities from './Responsibilities';
import Technologies from './Technologies';

interface Props {
	content: IArticle;
}

export default function Article({ content }: Props): JSX.Element {
	// console.log(content);

	return (
		<article>
			<section className={styles.list}>
				<h4 className={styles.title}>
					{content.company}
					<span className={styles.time}>
						{'//'} {content.time_start} - {content.time_end}
					</span>
				</h4>
				<span className={styles.additional_info}>
					{content.additional_info}
				</span>
				<h5>{content.job_title}</h5>
				<Responsibilities responsibilities={content.responsibilities} />
				<Technologies technologies={content.technologies} />
			</section>
		</article>
	);
}
