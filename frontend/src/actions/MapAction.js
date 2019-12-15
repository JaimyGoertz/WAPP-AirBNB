export function getLocationsChangeAction() {
	return async (dispatch) => {
		return await fetch(`https://localhost:5001/listings/locations`)
			.then((locations) => {
				return locations.json();
			})
			.then((content) => {
				dispatch(handleSaveLocationsAction(content));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

function handleSaveLocationsAction(content) {
	console.log(content);
	return {
		type: 'saveLocationsAction',
		value: content
	};
}
