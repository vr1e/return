import React from 'react';
import styles from './Transliterate.module.css';
import ErrorBoundary from './ErrorBoundary';
import { analytics } from '../services/analytics';

import Cyrillic from './partials/Cyrillic';
import Latin from './partials/Latin';
import TransliterateContextProvider from '../contexts/TransliterateContext';

function Transliterate() {
	return (
		<div
			id='main-content'
			className={`${styles.transliterateBox} transliterate-box`}>
			<ErrorBoundary
				onError={(error, errorInfo) => {
					analytics.trackError({
						errorName: error.name,
						errorMessage: error.message,
						componentStack: errorInfo.componentStack,
						userAction: 'transliterate-page'
					});
				}}>
				<TransliterateContextProvider>
					<Cyrillic />

					{/* <Convert /> */}

					<Latin />
				</TransliterateContextProvider>
			</ErrorBoundary>
		</div>
	);
}

export default Transliterate;
