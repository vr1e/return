import { BasicInfo, Section } from '../interfaces';

export async function getFireData(dataPath: string): Promise<BasicInfo | Section[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_DB_HOST}/${dataPath}.json`
	);

	const data = await response.json();

	return data;
}

export async function getSections(type: string): Promise<Section[]> {
	const data = await getFireData('sections') as Section[];

	const filteredData = data.filter((section: Section) => section.type === type);

	return filteredData;
}
