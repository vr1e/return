import { describe, it, expect } from 'vitest';
import containsUpperCase from './containsUpperCase';

describe('containsUpperCase', () => {
	it('returns true for uppercase letters', () => {
		expect(containsUpperCase('ABC')).toBe(true);
		expect(containsUpperCase('Hello')).toBe(true);
		expect(containsUpperCase('WORLD')).toBe(true);
	});

	it('returns false for lowercase letters', () => {
		expect(containsUpperCase('abc')).toBe(false);
		expect(containsUpperCase('hello')).toBe(false);
	});

	it('returns false for numbers and symbols', () => {
		expect(containsUpperCase('123')).toBe(false);
		expect(containsUpperCase('!@#')).toBe(false);
	});

	it('returns false for empty string', () => {
		expect(containsUpperCase('')).toBe(false);
	});
});
