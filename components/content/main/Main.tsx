import Section from './Section';

export default function Main({ mainSections }): JSX.Element {
	// console.log(mainSections);
	return (
		<main>
			{mainSections.map(section => (
				<Section key={section.id} section={section} />
			))}
		</main>
	);
}
