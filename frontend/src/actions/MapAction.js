export function getLocationsChangeAction() {
	return async (dispatch) => {
		const data = await fetch(`http://localhost:44337/Listings/locations`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		const content = await data.json();
		console.log(content);
		if (content.error) {
			throw new Error('Data incorrect');
		} else {
			dispatch(handleSaveLocationsAction(content));
		}
	};
}

function handleSaveLocationsAction(content) {
	console.log(content);
	return {
		type: 'handleSaveLocationsAction',
		locations: content
	};
}
