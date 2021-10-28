import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);
	const [tasks, setTasks] = useState([]);

	const transformedTasks = (taskObj) => {
		const loadedTasks = [];

		for (const taskKey in taskObj) {
			loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
		}

		setTasks(loadedTasks);
	};

	const {
		isLoading,
		error,
		sendRequest: fetchTasks
	} = useHttp(
		{
			url: 'https://react-http-da9af-default-rtdb.firebaseio.com/tasks.json'
		},
		transformedTasks
	);

	useEffect(() => {
		fetchTasks();
	}, []);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
