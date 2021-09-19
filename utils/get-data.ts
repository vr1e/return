import { BasicInfo, SectionInterface } from '../interfaces';

export async function getFireData(
	dataPath: string
): Promise<BasicInfo | SectionInterface[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_DB_HOST}/${dataPath}.json`
	);

	const data = await response.json();

	return data;
}

export async function getSections(
	category: string
): Promise<SectionInterface[]> {
	const data = (await getFireData('sections')) as SectionInterface[];

	const filteredData = data.filter(
		(section: SectionInterface) => section.category === category
	);

	return filteredData;
}
