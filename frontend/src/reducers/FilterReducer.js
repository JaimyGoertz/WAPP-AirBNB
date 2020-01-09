const initialState = {
	filter: false,
	neighbourhood: 'All',
	locations: {
		type: 'FeatureCollection',
		features: []
	}
};

export function FilterReducer(state = initialState, action) {
	switch (action.type) {
		case 'priceChangeAction':
			return { ...state, price: action.value };
		case 'reviewChangeAction':
			return { ...state, review: action.value };
		case 'neighbourhoodChangeAction':
			return { ...state, neighbourhood: action.value };
		case 'handleFilterAction':
			return { ...state, locations: action.value, filter: true };
		case 'clickResetButtonAction':
			return { ...state, filter: false, price: '', review: '', neighbourhood: 'All' };
		default:
			return state;
	}
}
