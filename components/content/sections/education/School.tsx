import { ISchool } from '../../../../interfaces';

interface Props {
	school: ISchool;
}

export default function School({ school }: Props): JSX.Element {
	return (
		<div key={school.id}>
			<h5>
				{school.title}{' '}
				<span>
					{'//'} {school.time_start} - {school.time_end}
				</span>
			</h5>
			<span>{school.description}</span>
			<h6>{school.name}</h6>
			<p>{school.specialization}</p>
		</div>
	);
}
