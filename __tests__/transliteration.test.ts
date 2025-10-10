import { describe, it, expect } from 'vitest';
import transliterate from 'serbian-transliterate';

describe('serbian-transliterate integration', () => {
	describe('Cyrillic to Latin', () => {
		it('converts basic Cyrillic characters', () => {
			expect(transliterate('Здраво', 'toLatin')).toBe('Zdravo');
			expect(transliterate('Привет', 'toLatin')).toBe('Privet');
		});

		it('converts Serbian digraphs correctly', () => {
			expect(transliterate('џ', 'toLatin')).toBe('dž');
			expect(transliterate('љ', 'toLatin')).toBe('lj');
			expect(transliterate('њ', 'toLatin')).toBe('nj');
		});

		it('preserves case', () => {
			expect(transliterate('ЗДРАВО', 'toLatin')).toBe('ZDRAVO');
			expect(transliterate('Здраво', 'toLatin')).toBe('Zdravo');
			expect(transliterate('здраво', 'toLatin')).toBe('zdravo');
		});

		it('handles mixed text with numbers and symbols', () => {
			expect(transliterate('Београд 2024!', 'toLatin')).toBe('Beograd 2024!');
		});
	});

	describe('Latin to Cyrillic', () => {
		it('converts basic Latin characters', () => {
			expect(transliterate('Zdravo', 'toCyrillic')).toBe('Здраво');
			expect(transliterate('Privet', 'toCyrillic')).toBe('Привет');
		});

		it('converts Latin digraphs to Cyrillic', () => {
			expect(transliterate('dž', 'toCyrillic')).toBe('џ');
			expect(transliterate('lj', 'toCyrillic')).toBe('љ');
			expect(transliterate('nj', 'toCyrillic')).toBe('њ');
		});

		it('preserves case', () => {
			expect(transliterate('ZDRAVO', 'toCyrillic')).toBe('ЗДРАВО');
			expect(transliterate('Zdravo', 'toCyrillic')).toBe('Здраво');
			expect(transliterate('zdravo', 'toCyrillic')).toBe('здраво');
		});

		it('handles mixed text with numbers and symbols', () => {
			expect(transliterate('Beograd 2024!', 'toCyrillic')).toBe('Београд 2024!');
		});
	});

	describe('edge cases', () => {
		it('handles empty strings', () => {
			expect(transliterate('', 'toLatin')).toBe('');
			expect(transliterate('', 'toCyrillic')).toBe('');
		});

		it('handles strings with only numbers', () => {
			expect(transliterate('12345', 'toLatin')).toBe('12345');
			expect(transliterate('12345', 'toCyrillic')).toBe('12345');
		});

		it('handles strings with only symbols', () => {
			expect(transliterate('!@#$%', 'toLatin')).toBe('!@#$%');
			expect(transliterate('!@#$%', 'toCyrillic')).toBe('!@#$%');
		});
	});
});
