import Title from '../../ui/title/Title';
import Article from '../partials/Article';
import { SectionInterface } from '../../../interfaces';
// import styles from './Section.module.scss';

interface Props {
	section: SectionInterface;
}

export default function Section({ section }: Props): JSX.Element {
	console.log(section);
	return (
		<section className={section.type}>
			<Title title={section.title} />

			{section.content?.map(article => (
				<Article key={article.id} content={article} />
			))}
		</section>
	);
}
