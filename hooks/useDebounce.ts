import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDebounce = (value: any, delay = 800): any => {
	const [debouncedValue, setDebouncedValue] = useState<any>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	return debouncedValue;
};

export default useDebounce;
