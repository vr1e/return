import fs from 'fs';
import path from 'path';
import { Data, Section } from '../interfaces';

export function buildDocumentPath(): string {
	return path.join(process.cwd(), 'data', 'data.json');
}

export function getAllData(): Data {
	const filePath = buildDocumentPath();
	const fileData = fs.readFileSync(filePath, 'utf-8');
	const data = JSON.parse(fileData);

	return data;
}

export function getAsides(): Section[] {
	const allData = getAllData();

	const data = allData.sections.filter(section => section.type === 'aside');

	return data;
}

export function getMains(): Section[] {
	const allData = getAllData();

	const data = allData.sections.filter(section => section.type === 'main');
	return data;
}