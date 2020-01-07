export function getLocationDetailsAction(id) {
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
		value: content
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
	return {
		type: 'saveLocationsAction',
		value: content
	};
}

export function getNeighbourhoodsChangeAction() {
	return async (dispatch) => {
		return await fetch(`https://localhost:5001/listings/Neighbourhoods`)
			.then((Neighbourhoods) => {
				return Neighbourhoods.json();
			})
			.then((content) => {
				dispatch(handleSaveNeighbourhoodsAction(content));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

function handleSaveNeighbourhoodsAction(content) {
	return {
		type: 'handleSaveNeighbourhoodsAction',
		value: content
	};
}
