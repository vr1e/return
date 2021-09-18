import { MainContent } from '../../../interfaces';
import Lists from './partials/Lists';

interface Props {
	content: MainContent;
}

export default function Article({ content }: Props): JSX.Element {
	console.log(content);
	return (
		<article>
			<ol>
				<h4>
					{content.company}{' '}
					<span>
						{'//'} {content.time_start} - {content.time_end}
					</span>
				</h4>
				<li>
					<h5>{content.job_title}</h5>
					<p>
						Responsibilities: - <Lists data={content.responsibilities} />
					</p>
					<p>
						Technologies: <Lists data={content.technologies} />
					</p>
				</li>
			</ol>
		</article>
	);
}
