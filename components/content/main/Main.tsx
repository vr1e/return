import Section from './Section';
import { SectionInterface } from '../../../interfaces';

interface Props {
	mainSections: SectionInterface[];
}

export default function Main({ mainSections }: Props): JSX.Element {
	// console.log(mainSections);
	return (
		<main className='main-content'>
			{mainSections.map(section => (
				<Section key={section.id} section={section} />
			))}
		</main>
	);
}
