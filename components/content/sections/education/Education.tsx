import { IEducation, ISchool } from '../../../../interfaces';
import Title from '../../../ui/title/Title';
import School from './School';

interface Props {
	education: IEducation;
}

export default function Education({ education }: Props): JSX.Element {
	return (
		<section>
			<Title title={education.title} type={education.type} />
			<article>
				{education.content.map((school: ISchool) => (
					<School key={school.id} school={school} />
				))}
			</article>
		</section>
	);
}
