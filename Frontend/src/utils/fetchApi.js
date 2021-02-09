const fetchApi = (path, options, body) => {
	return fetch(`/api${path}`, {
		method,
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

export default fetchApi;
