export async function getFireData(dataPath: string = 'cv') {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_DB_HOST}/${dataPath}.json`
	);

	const data = await response.json();

	return data;
}
