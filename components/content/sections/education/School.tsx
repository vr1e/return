import { ISchool } from '../../../../interfaces';

interface Props {
	school: ISchool;
}

export default function School({ school }: Props): JSX.Element {
	return (
		<div key={school.id} className='school'>
			<h5>
				{school.title}{' '}
				<span className='time'>
					{'//'} {school.time_start} - {school.time_end}
				</span>
			</h5>
			<span>{school.description}</span>
			{school.name && <span className='college-name'>({school.name})</span>}
			<div>{school.specialization}</div>
		</div>
	);
}
