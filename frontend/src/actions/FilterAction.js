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

export function clickFilterButtonAction(neighbourhood, priceParam, reviewParam) {
	let price = 0;
	let review = 0;
	console.log(priceParam, reviewParam);
	if (priceParam != undefined) {
		price = parseInt(priceParam);
	} else {
		price = 100000;
	}
	if (reviewParam != undefined) {
		review = parseInt(reviewParam);
	} else {
		review = 0;
	}
	console.log(price, review);
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
