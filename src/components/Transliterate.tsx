import React from 'react';
import styled from 'styled-components';
import Convert from './partials/Convert';

import Cyrillic from './partials/Cyrillic';
import Latin from './partials/Latin';
import TransliterateContextProvider from './contexts/TransliterateContext';

const TransliterateBox = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	gap: 1rem;
	padding: 1rem;
	margin-top: 5vh;
`;

function Transliterate() {
	return (
		<TransliterateBox className='transliterate-box'>
			<TransliterateContextProvider>
				<Cyrillic />

				{/* <Convert /> */}

				<Latin />
			</TransliterateContextProvider>
		</TransliterateBox>
	);
}

export default Transliterate;
