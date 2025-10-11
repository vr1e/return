function getEnvVariable(name: string): string {
	const value = import.meta.env[name];
	if (typeof value !== 'string' || !value) {
		throw new Error(
			`Environment variable ${name} must be defined and a non-empty string!`
		);
	}
	return value;
}

export const INSIGHTS_PROJECT_ID = getEnvVariable('VITE_INSIGHTS_PROJECT_ID');
