import Header from '../components/content/Header';
import Aside from '../components/content/aside/Aside';
import { getFireData, getSections } from '../utils/get-data';
import Main from '../components/content/main/Main';

export default function IndexPage({ asideSections, mainSections, basicInfo }) {
	return (
		<div className='content'>
			<div className='left-bar'>
				<Header basicInfo={basicInfo} />
				<Aside asideSections={asideSections} />
			</div>
			<Main mainSections={mainSections} />
		</div>
	);
}

export async function getStaticProps() {
	const asides = await getSections('aside');
	const mains = await getSections('main');
	const basicInfo = await getFireData('basic_info');

	return {
		props: {
			asideSections: asides,
			mainSections: mains,
			basicInfo: basicInfo,
		},
	};
}
