import { useState, useEffect } from 'react';
import useAsyncError from './useAsyncError';

export default function useTodo() {
	const [error, setError] = useState('');
	const [todolists, setTodolists] = useState([]);
	const throwError = useAsyncError();
	useEffect(() => {
		fetchApi('/todolist')
			.then((todolists) => {
				setTodolists(todolists);
			})
			.catch((err) => {
				throwError(err);
			});
	}, []);
	const fetchApi = (path, method, body) => {
		return fetch(`/api${path}`, {
			method,
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(body),
		}).then((resp) => {
			if (!resp.ok) {
				return resp.json().then((json) => {
					console.log(resp.status);
					const error = new Error(json.message);
					error.status = resp.status;
					throw error;
				});
			}
			return resp.json();
		});
	};
	const handleAddTodo = () => {
		let newTodo = { title: 'New Todolist' };
		// Optimistic UI (We update the state before with a temporary item)
		// setTodolists([...todolists, newTodo]);
		fetchApi(`/todolist`, 'POST', newTodo)
			.then((todolist) => {
				setTodolists([...todolists, todolist]);
			})
			.catch((err) => {
				setError(err.message);
				// If error, we roll back to the previous state
				// setTodolists(todolists);
			});
	};
	const handleDeleteTodo = (todolistId) => {
		fetchApi(`/todolist/${todolistId}`, 'DELETE')
			.then((deletedTodolist) => {
				setTodolists((todolists) =>
					todolists.filter((todolist) => deletedTodolist.id !== todolist.id)
				);
			})
			.catch((err) => setError(err.message));
	};
	const handleUpdate = (todolistId, newData) => {
		fetchApi(`/todolist/${todolistId}`, 'PUT', { title: newData })
			.then((updatedTodolist) => {
				setTodolists((todolists) =>
					todolists.map((todolist) => {
						if (todolist.id === updatedTodolist.id) {
							return updatedTodolist;
						}
						return todolist;
					})
				);
			})
			.catch((err) => setError(err.message));
	};

	return {
		error,
		todolists,
		onAdd: handleAddTodo,
		onDelete: (todolistId) => handleDeleteTodo(todolistId),
		onUpdate: (todolistId, newData) => handleUpdate(todolistId, newData),
	};
}
