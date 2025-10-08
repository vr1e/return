import React from 'react';
import styles from './Transliterate.module.css';
import Convert from './partials/Convert';

import Cyrillic from './partials/Cyrillic';
import Latin from './partials/Latin';
import TransliterateContextProvider from './contexts/TransliterateContext';

function Transliterate() {
	return (
		<div className={`${styles.transliterateBox} transliterate-box`}>
			<TransliterateContextProvider>
				<Cyrillic />

				{/* <Convert /> */}

				<Latin />
			</TransliterateContextProvider>
		</div>
	);
}

export default Transliterate;
