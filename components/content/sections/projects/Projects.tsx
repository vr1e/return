import { IProjects } from '../../../../interfaces';
import Title from '../../../ui/title/Title';
import Project from './Project';
import styles from './Projects.module.scss';

interface Props {
	projects: IProjects;
}

export default function Projects({ projects }: Props): JSX.Element {
	// console.log(projects);
	const projectYears = projects.content.map(project => project.year);
	const uniqueYears = Array.from(new Set(projectYears)).sort().reverse();

	const orderedProjects = {};

	projects.content.forEach(project => {
		orderedProjects[project.year] = projects.content.filter(
			el => project.year === el.year
		);
	});

	// console.log(orderedProjects);

	return (
		<section className={styles.projects}>
			<Title title={projects.title} type={projects.type} />
			<article>
				<ul className={styles.list_year}>
					{uniqueYears.map(year => (
						<li className={styles.list_year_item} key={year}>
							<h5 className={styles.year}>{year}</h5>
							{orderedProjects[year].map(project => (
								<Project key={project.id} project={project} />
							))}
						</li>
					))}
				</ul>
			</article>
		</section>
	);
}
