import { useLayoutEffect, RefObject } from 'react';

export const useAutoResize = (
	ref: RefObject<HTMLTextAreaElement>,
	value: string
) => {
	useLayoutEffect(() => {
		const element = ref.current;
		if (element) {
			// Temporarily reset height to allow it to shrink
			element.style.height = '0px';
			// Set the height to the scroll height
			element.style.height = `${element.scrollHeight}px`;
		}
	}, [ref, value]);
};
