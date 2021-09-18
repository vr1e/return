import { Data, Section } from '../interfaces';

export async function getFireData(dataPath: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_DB_HOST}/${dataPath}.json`
	);

	return await response.json();
}

export async function getSections(type: string) {
	const data = await getFireData('sections');

	const filteredData = data.filter((section: Section) => section.type === type);

	return filteredData;
}
