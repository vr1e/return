import Header from '../components/content/Header';
import Aside from '../components/content/aside/Aside';
import { getAllData, getAsides, getMains } from '../utils/get-data';
import Main from '../components/content/main/Main';

export default function IndexPage({ data, asideSections, mainSections }) {
	// console.log(mainSections);
	const { name, title } = data;
	return (
		<>
			<Header name={name} title={title} />
			<Aside asideSections={asideSections} />
			<Main mainSections={mainSections} />
		</>
	);
}

export async function getStaticProps() {
	const allData = getAllData();
	const asides = getAsides();
	const mains = getMains();

	return {
		props: {
			data: allData,
			asideSections: asides,
			mainSections: mains,
		},
	};
}
