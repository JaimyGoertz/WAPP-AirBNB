const initialState = {};

export function ChartsReducer(state = initialState, action) {
	switch (action.type) {
		case 'handleReviewChartsAction':
			return { ...state, reviewChart: action.value };
		case 'handleAvailabilityChartsAction':
			return { ...state, availabilityChart: action.value };
		default:
			return state;
	}
}
