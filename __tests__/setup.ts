import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { analytics } from '../src/services/analytics';

afterEach(() => {
	analytics.reset();
});
