import { IProject } from '../../../../interfaces';

interface Props {
	project: IProject;
}

export default function Project({ project }: Props): JSX.Element {
	return (
		<>
			<strong>
				<a href={project.url} target='_blank' rel='noreferrer'>
					{project.title}
				</a>
			</strong>

			{!project.url && <small> (no longer working)</small>}

			<div className='technologies'>
				{project.technologies.map((technology, idx) => (
					<span className='list-item' key={idx}>
						{technology}
					</span>
				))}
			</div>
		</>
	);
}
