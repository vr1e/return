/**
 * Parses a date string into a Date object.
 *
 * @param {string} dateStr - The date string to parse, expected in "Month Year" or "Year" format.
 * @returns {Date | null} A Date object if the string can be parsed, null otherwise.
 */
export function parseDateString(dateStr: string): Date | null {
	if (!dateStr) return null;

	const parts = dateStr.split(" ");
	const month = parts.length === 2 ? parts[0] : "January";
	const year = parts[parts.length - 1];

	return new Date(`${month} ${year}`);
}
