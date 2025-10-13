import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './__tests__/setup.ts',
		env: {
			VITE_INSIGHTS_PROJECT_ID: 'test-insights-project-id'
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html'],
			exclude: [
				'node_modules/',
				'__tests__/',
				'**/*.test.{ts,tsx}',
				'**/*.d.ts',
				'**/*.config.*',
				'src/main.tsx',
				'src/vite-env.d.ts',
				'src/App.tsx',
				'src/components/Home.tsx',
				'src/components/Transliterate.tsx',
				'src/components/partials/Convert.tsx',
				'src/config/particles.ts',
				'src/assets/**',
				'dist/**'
			]
		}
	}
});
