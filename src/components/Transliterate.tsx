import React from 'react';
import styles from './Transliterate.module.css';

import Cyrillic from './partials/Cyrillic';
import Latin from './partials/Latin';
import TransliterateContextProvider from '../contexts/TransliterateContext';

function Transliterate() {
	return (
		<div
			id='main-content'
			className={`${styles.transliterateBox} transliterate-box`}>
			<TransliterateContextProvider>
				<Cyrillic />

				{/* <Convert /> */}

				<Latin />
			</TransliterateContextProvider>
		</div>
	);
}

export default Transliterate;
