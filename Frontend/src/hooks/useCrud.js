import { useState, useEffect } from 'react';
import useAsyncError from './useAsyncError';
import { toast } from 'react-toastify';

export default function useCrud(url) {
	const [error, setError] = useState('');
	const [items, setItems] = useState([]);
	const throwError = useAsyncError();
	useEffect(() => {
		fetchApi(url)
			.then((items) => {
				setItems(items);
			})
			.catch((err) => {
				throwError(err);
			});
	}, []);
	const fetchApi = (path, method, body) => {
		return fetch(`${path}`, {
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
	const handleAdd = (newItem) => {
		fetchApi(`${url}`, 'POST', newItem)
			.then((item) => {
				toast.success('🎉 item created');
				setItems([...items, item]);
			})
			.catch((err) => {
				setError(err.message);
			});
	};
	const handleDelete = (id) => {
		fetchApi(`${url}/${id}`, 'DELETE')
			.then((deletedItem) => {
				setItems((items) => items.filter((item) => deletedItem.id !== item.id));
				toast.success('🎉 Item deleted');
			})
			.catch((err) => setError(err.message));
	};
	const handleUpdate = (id, newData) => {
		console.log('id', id);
		console.log(`${url}/${id}`, newData);
		fetchApi(`${url}/${id}`, 'PUT', newData)
			.then((updatedItem) => {
				if (!id) {
					console.log('yea', updatedItem);
					setItems(updatedItem);
				} else {
					setItems((items) =>
						items.map((item) => {
							if (item.id === updatedItem.id) {
								return updatedItem;
							}
							return item;
						})
					);
				}
				toast.success('🎉  Item updated');
			})
			.catch((err) => setError(err.message));
	};
	return [items, handleAdd, handleUpdate, handleDelete, error];
}
