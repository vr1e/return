import { MainContent } from '../../../interfaces';
import Lists from '../../ui/Lists';
import styles from './Article.module.scss';

interface Props {
	content: MainContent;
}

export default function Article({ content }: Props): JSX.Element {
	// console.log(content);

	return (
		<article>
			<ol className={styles.list}>
				<li className={styles.item}>
					<h4 className={styles.title}>
						{content.company}{' '}
						<span className={styles.time}>
							{'//'} {content.time_start} - {content.time_end}
						</span>
					</h4>
					<h5>{content.job_title}</h5>
					<div className='responsibilities'>
						<h6>Responsibilities:</h6>
						<Lists data={content.responsibilities} separator={'-'} />
					</div>

					<div className='technologies'>
						<h6>Technologies:</h6>
					</div>
					<Lists data={content.technologies} separator={','} />
				</li>
			</ol>
		</article>
	);
}
