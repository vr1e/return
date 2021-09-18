import Article from './Article';

export default function Section({ section }): JSX.Element {
	// console.log(section);
	return (
		<section>
			<h3>{section.title}</h3>
			{section.content?.map(article => (
				<Article key={article.id} content={article} />
			))}
		</section>
	);
}
