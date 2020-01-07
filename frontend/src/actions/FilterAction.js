export function priceChangeAction(price) {
	return {
		type: 'priceChangeAction',
		value: price
	};
}

export function reviewChangeAction(review) {
	return {
		type: 'reviewChangeAction',
		value: review
	};
}

export function neighbourhoodsChangeAction(neighbourhood) {
	return {
		type: 'neighbourhoodChangeAction',
		value: neighbourhood
	};
}

export function clickFilterButtonAction(neighbourhood, price, review) {
	if (price != '') {
		price = parseInt(price);
	} else {
		price = 0;
	}
	if (review != '') {
		review = parseInt(review);
	} else {
		review = 0;
	}

	return async (dispatch) => {
		const data = await fetch(`https://localhost:5001/listings/filter`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ neighbourhood, price, review })
		});
		const content = await data.json();
		if (content.error) {
			throw new Error('Fetch failed');
		} else {
			dispatch(handleFilterAction(content));
		}
	};
}

function handleFilterAction(content) {
	return {
		type: 'handleFilterAction',
		value: content
	};
}

export function clickResetButtonAction() {
	return {
		type: 'clickResetButtonAction'
	};
}
