import { IProject } from '../../../../interfaces';
import Tooltip from '../../../ui/Tooltip';
interface Props {
	project: IProject;
}

export default function Project({ project }: Props): JSX.Element {
	return (
		<>
			<Tooltip content={!project.url ? 'no longer operating' : ''}>
				<strong className='project-item'>
					<a href={project.url} target='_blank' rel='noreferrer'>
						{project.title}
					</a>
				</strong>
			</Tooltip>

			{project.technologies && (
				<div className='technologies'>
					{project.technologies.map((technology, idx) => (
						<span className='list-item' key={idx}>
							{technology}
						</span>
					))}
				</div>
			)}
		</>
	);
}
