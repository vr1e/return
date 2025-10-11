import { init, track, parameters, trackPages } from 'insights-js';

// Type definitions
export type TransliterationEventParams = {
	direction: 'toLatin' | 'toCyrillic';
	textLength?: number;
};

export type NavigationEventParams = {
	from?: string;
	to?: string;
};

// Infer the ParameterValue type from the library's own functions for type safety.
type ParameterValue = ReturnType<typeof parameters.screenType>;

type AnalyticsConfig = {
	projectId: string;
	disabled?: boolean;
};

type AnalyticsState = 'uninitialized' | 'disabled' | 'active';

// The return type for insights-js parameters can be complex.
// It accepts ParameterValue objects or strings.
type InsightsParams = Record<string, string | ParameterValue>;

type InputParams = Record<string, string | number | boolean | undefined | ParameterValue>;

class AnalyticsService {
	private state: AnalyticsState = 'uninitialized';

	public init(config: AnalyticsConfig): void {
		if (this.state !== 'uninitialized') {
			console.warn('Analytics already initialized');
			return;
		}

		if (
			config.disabled ||
			!config.projectId?.trim() ||
			config.projectId === 'your-project-id-here'
		) {
			this.state = 'disabled';
			return;
		}

		try {
			init(config.projectId);
			this.state = 'active';
		} catch (error) {
			console.error('Failed to initialize analytics:', error);
			this.state = 'disabled';
		}
	}

	public trackPages(): void {
		if (this.state !== 'active') return;
		try {
			trackPages();
		} catch (error) {
			console.error('Failed to enable page tracking:', error);
		}
	}

	public trackTransliteration(params: TransliterationEventParams): void {
		if (this.state !== 'active') return;

		try {
			track({
				id: 'transliteration-used',
				parameters: this.buildParameters({
					direction: params.direction,
					textLength: params.textLength,
					locale: parameters.locale(),
					screenType: parameters.screenType() // Corrected from screenSize
				})
			});
		} catch (error) {
			console.error('Failed to track transliteration:', error);
		}
	}

	public trackNavigation(params: NavigationEventParams): void {
		if (this.state !== 'active') return;

		try {
			track({
				id: 'navigation',
				parameters: this.buildParameters({
					from: params.from,
					to: params.to,
					locale: parameters.locale(),
					screenType: parameters.screenType()
				})
			});
		} catch (error) {
			console.error('Failed to track navigation:', error);
		}
	}

	public trackEvent(
		id: string,
		params?: Record<string, string | number | boolean | undefined>
	): void {
		if (this.state !== 'active') return;

		try {
			track({
				id,
				parameters: params ? this.buildParameters(params) : undefined
			});
		} catch (error) {
			console.error(`Failed to track event "${id}":`, error);
		}
	}

	public isEnabled(): boolean {
		return this.state === 'active';
	}

	/**
	 * Resets the analytics state for testing purposes.
	 * This method is guarded to only run in a test environment.
	 */
	public reset(): void {
		if (import.meta.env.TEST) {
			this.state = 'uninitialized';
		}
	}

	private buildParameters(params: InputParams): InsightsParams {
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
	}
}

// Export a singleton instance
export const analytics = new AnalyticsService();
