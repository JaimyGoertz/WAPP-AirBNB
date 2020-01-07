export function getChartReviewAction() {
	return async (dispatch) => {
		return await fetch(`https://localhost:5001/charts/review`)
			.then((Charts) => {
				return Charts.json();
			})
			.then((content) => {
				dispatch(handleReviewChartsAction(content));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

function handleReviewChartsAction(content) {
	return {
		type: 'handleReviewChartsAction',
		value: content
	};
}

export function getChartAvailabilityAction() {
	return async (dispatch) => {
		return await fetch(`https://localhost:5001/charts/availability`)
			.then((Charts) => {
				return Charts.json();
			})
			.then((content) => {
				dispatch(handleAvailabilityChartsAction(content));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

function handleAvailabilityChartsAction(content) {
	return {
		type: 'handleAvailabilityChartsAction',
		value: content
	};
}
