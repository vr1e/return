import Article from '../../partials/Article';
import Title from '../../../ui/title/Title';
import { IExperience } from "../../../../interfaces";
import { sortArticlesByStartDateDescending } from "../../../../utils/sortArticlesByStartDate";

interface Props {
	experience: IExperience;
}

export default function Experience({ experience }: Props) {
	if (!experience.content) { return null }

	const sortedArticles = sortArticlesByStartDateDescending(experience.content);
	return (
		<section className={experience.type}>
			<Title title={experience.title} type={experience.type} />

			{sortedArticles.map(article => (
				<Article key={article.id} content={article} />
			))}
		</section>
	);
}
