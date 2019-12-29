export function getLocationDetailsAction(id) {
	console.log(id);
	return async (dispatch) => {
		return await fetch(`http://localhost:5000/Listings/details/${id}`)
			.then((details) => {
				return details.json();
			})
			.then((content) => {
				dispatch(LocationDetailsAction(content));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

function LocationDetailsAction(content) {
	return {
		type: 'locationDetailsAction',
		locationDetails: content
	};
}

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
