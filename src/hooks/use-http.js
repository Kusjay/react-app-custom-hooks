import { useState } from 'react';

const useHttp = (requestConfig, applyData) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = async () => {
		setIsLoading(true);
		setError(null);
		try {
			// const response = await fetch(
			// 	'https://react-http-da9af-default-rtdb.firebaseio.com/tasks.json'
			// );

			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.method : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			// const loadedTasks = [];

			// for (const taskKey in data) {
			// 	loadedTasks.push({ id: taskKey, text: data[taskKey].text });
			// }

			// setTasks(loadedTasks);

			applyData(data);
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	};

	return {
		isLoading,
		error,
		sendRequest
	};
};

export default useHttp;
