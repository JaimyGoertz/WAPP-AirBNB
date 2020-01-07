const initialState = {};

export function MapReducer(state = initialState, action) {
	switch (action.type) {
		case 'saveLocationsAction':
			return { ...state, locations: action.value };
		case 'locationDetailsAction':
			return { ...state, locationDetails: action.value };
		case 'handleSaveNeighbourhoodsAction':
			return { ...state, neighbourhoods: action.value };
		default:
			return state;
	}
}
