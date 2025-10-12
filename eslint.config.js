import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.strict,
	react.configs.flat.recommended,
	{
		plugins: {
			react,
			'react-hooks': reactHooks
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			]
		},
		settings: {
			react: {
				version: 'detect'
			}
		}
	},
	{
		ignores: ['dist/', 'coverage/', 'src/assets/']
	},
	// Test files
	{
		files: ['**/*.test.ts', '**/*.test.tsx'],
		rules: {
			// Allow expressions such as .toBeNull, .toBeTruthy, .empty, etc.
			'@typescript-eslint/no-unused-expressions': 'off'
		}
	}
);
