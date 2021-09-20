import { IArticle } from '../../../interfaces';
import Tooltip from '../../ui/Tooltip';
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
					<Tooltip content={content.description}>{content.company}</Tooltip>
					<span className='time'>
						{'//'} {content.time_start} - {content.time_end}
					</span>
				</h4>
				<span className='additional_info'>{content.additional_info}</span>
				<h5>{content.job_title}</h5>
				{content.responsibilities && (
					<Responsibilities responsibilities={content.responsibilities} />
				)}
				{content.technologies && (
					<Technologies technologies={content.technologies} />
				)}
			</section>
		</article>
	);
}
