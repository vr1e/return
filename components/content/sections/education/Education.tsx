import { IEducation, ISchool } from '../../../../interfaces';
import Title from '../../../ui/title/Title';

interface Props {
	education: IEducation;
}

export default function Education({ education }: Props): JSX.Element {
	return (
		<section>
			<Title title={education.title} type={education.type} />
			<article>
				{education.content.map((edc: ISchool) => (
					<div key={edc.id}>
						<h5>
							{edc.title}{' '}
							<span>
								// {edc.time_start} - {edc.time_end}
							</span>
						</h5>
						<span>{edc.description}</span>
						<h6>{edc.name}</h6>
						<p>{edc.specialization}</p>
					</div>
				))}
			</article>
		</section>
	);
}
