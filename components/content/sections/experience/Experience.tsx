// import Title from '../../ui/title/Title';
import Article from '../../partials/Article';
// import { SectionInterface } from '../../../interfaces';
// import styles from './Section.module.scss';
import Title from '../../../ui/title/Title';
import { IExperience } from "../../../../interfaces";

interface Props {
	experience: IExperience;
}

export default function Experience({ experience }: Props): JSX.Element {
	// console.log(experience);
	return (
		<section className={experience.type}>
			<Title title={experience.title} type={experience.type} />

			 {experience.content?.map(article => (
				<Article key={article.id} content={article} />
			))}
		</section>
	);
}
