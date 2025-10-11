import { init, track, parameters } from 'insights-js';

/**
 * Custom event parameters for transliteration tracking
 */
export type TransliterationEventParams = {
	direction: 'toLatin' | 'toCyrillic';
	textLength?: number;
};

/**
 * Custom event parameters for navigation tracking
 */
export type NavigationEventParams = {
	from?: string;
	to?: string;
};

/**
 * Analytics configuration
 */
type AnalyticsConfig = {
	projectId: string;
	disabled?: boolean;
};

type AnalyticsState = 'uninitialized' | 'disabled' | 'active';
let analyticsState: AnalyticsState = 'uninitialized';

/**
 * Helper to build parameters object, filtering undefined/null and converting to strings
 */
const buildParameters = (params: Record<string, any>) => {
	return Object.fromEntries(
		Object.entries(params)
			.filter(([_, value]) => value !== undefined && value !== null)
			.map(([key, value]) => {
				// Pass through ParameterValue objects from insights-js unchanged
				if (typeof value === 'object' && value !== null && 'value' in value) {
					return [key, value];
				}
				// Convert primitives to strings
				return [key, String(value)];
			})
	);
};

/**
 * Initialize Insights Analytics
 * @param config Analytics configuration object
 */
export const initAnalytics = (config: AnalyticsConfig): void => {
	if (analyticsState !== 'uninitialized') {
		console.warn('Analytics already initialized');
		return;
	}

	if (
		config.disabled ||
		!config.projectId ||
		config.projectId === 'your-project-id-here'
	) {
		analyticsState = 'disabled';
		return;
	}

	try {
		init(config.projectId);
		analyticsState = 'active';
	} catch (error) {
		console.error('Failed to initialize analytics:', error);
		analyticsState = 'disabled';
	}
};

/**
 * Track a transliteration event
 * @param params Event parameters
 */
export const trackTransliteration = (
	params: TransliterationEventParams
): void => {
	if (analyticsState !== 'active') return;

	try {
		track({
			id: 'transliteration-used',
			parameters: buildParameters({
				direction: params.direction,
				textLength: params.textLength,
				locale: parameters.locale(),
				screenSize: parameters.screenType()
			})
		});
	} catch (error) {
		console.error('Failed to track transliteration:', error);
	}
};

/**
 * Track a navigation event
 * @param params Event parameters
 */
export const trackNavigation = (params: NavigationEventParams): void => {
	if (analyticsState !== 'active') return;

	try {
		track({
			id: 'navigation',
			parameters: buildParameters({
				from: params.from,
				to: params.to,
				locale: parameters.locale(),
				screenType: parameters.screenType()
			})
		});
	} catch (error) {
		console.error('Failed to track navigation:', error);
	}
};

/**
 * Track a custom event
 * @param id Event identifier (use kebab-case)
 * @param params Optional event parameters
 */
export const trackEvent = (
	id: string,
	params?: Record<string, string | number | boolean | undefined>
): void => {
	if (analyticsState !== 'active') return;

	try {
		track({
			id,
			parameters: params ? buildParameters(params) : undefined
		});
	} catch (error) {
		console.error(`Failed to track event "${id}":`, error);
	}
};

/**
 * Check if analytics is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
	return analyticsState === 'active';
};
