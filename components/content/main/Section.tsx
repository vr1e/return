import Article from './Article';
import styles from './Section.module.scss';

export default function Section({ section }): JSX.Element {
	// console.log(section);
	return (
		<section>
			<div className={styles.title}>
				<img
					className={styles.icon}
					src={`${section.title.toLowerCase().replace(' ', '_')}.svg`}
					alt={section.title}
					title={section.title}
				/>
				<h3>{section.title}</h3>
				<span className={styles.line_decoration}></span>
			</div>
			{section.content?.map(article => (
				<Article key={article.id} content={article} />
			))}
		</section>
	);
}
