import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import styled from 'styled-components';

const ConvertButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
`;

export default function Convert() {
	return (
		<ConvertButton>
			<FontAwesomeIcon icon={faPencilAlt} size='lg' color='#F9C80E' />
			{/* <FontAwesomeIcon icon={faCheck} size='lg' color='#B5FFE1' /> */}
		</ConvertButton>
	);
}
