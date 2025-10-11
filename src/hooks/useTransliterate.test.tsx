import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTransliterate } from './useTransliterate';
import TransliterateContextProvider from '../components/contexts/TransliterateContext';
import { ReactNode } from 'react';

describe('useTransliterate', () => {
	it('should throw an error when used outside of TransliterateContextProvider', () => {
		// Mock console.error to suppress React error boundary output in tests
		const originalError = console.error;
		console.error = () => {};

		expect(() => {
			renderHook(() => useTransliterate());
		}).toThrow(
			'useTransliterate must be used within a TransliterateContextProvider'
		);

		// Restore console.error
		console.error = originalError;
	});

	it('should return context value when used within TransliterateContextProvider', () => {
		const wrapper = ({ children }: { children: ReactNode }) => (
			<TransliterateContextProvider>{children}</TransliterateContextProvider>
		);

		const { result } = renderHook(() => useTransliterate(), { wrapper });

		// Verify all expected properties exist
		expect(result.current).toHaveProperty('cyrillic');
		expect(result.current).toHaveProperty('latin');
		expect(result.current).toHaveProperty('handleCyrillic');
		expect(result.current).toHaveProperty('handleLatin');
		expect(result.current).toHaveProperty('replaceText');
	});

	it('should return non-null context value', () => {
		const wrapper = ({ children }: { children: ReactNode }) => (
			<TransliterateContextProvider>{children}</TransliterateContextProvider>
		);

		const { result } = renderHook(() => useTransliterate(), { wrapper });

		expect(result.current).not.toBeNull();
		expect(result.current).toBeDefined();
	});

	it('should return context with correct types', () => {
		const wrapper = ({ children }: { children: ReactNode }) => (
			<TransliterateContextProvider>{children}</TransliterateContextProvider>
		);

		const { result } = renderHook(() => useTransliterate(), { wrapper });

		expect(typeof result.current.cyrillic).toBe('string');
		expect(typeof result.current.latin).toBe('string');
		expect(typeof result.current.handleCyrillic).toBe('function');
		expect(typeof result.current.handleLatin).toBe('function');
		expect(typeof result.current.replaceText).toBe('function');
	});

	it('should return initial empty strings for cyrillic and latin', () => {
		const wrapper = ({ children }: { children: ReactNode }) => (
			<TransliterateContextProvider>{children}</TransliterateContextProvider>
		);

		const { result } = renderHook(() => useTransliterate(), { wrapper });

		expect(result.current.cyrillic).toBe('');
		expect(result.current.latin).toBe('');
	});
});
