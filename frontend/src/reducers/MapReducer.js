const initialState = {};

export function MapReducer(state = initialState, action) {
	switch (action.type) {
		case 'saveLocationsAction':
			return { ...state, locations: action.value };
		case 'locationDetailsAction':
			return { ...state, locationDetails: action.locationDetails };
		default:
			return state;
	}
}
