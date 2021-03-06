import React, { createContext, useEffect, useReducer } from 'react';
import _isUndefined from 'lodash/isUndefined'

import { appState } from "./state.js";
import { queryItems } from './data/results';
import { ResetFilters } from './data/filters';

export const AppContext = createContext();

/**
 * if you specify showMap = true, then you must...
 * a) specify the map div element's string id -and-
 * b) specify showMapLocation as object, e.g { x: 9.127734, y: 47.31239 }
 */
export const initialState = {
	places: [],
	showMap: true,
	place: null,
	// container: null,
	container: 'viewDiv', 		// to show map when page loads, we must specify id of map div here			   
	headerText: 'Choose an address',
	showMapLocation: { x: -0.204010, y: 51.523760 }, // London
	results: {
		loading: true
	},
	details: {},
	filters: {
		restaurantTypes: null, // comma delim string
		ratingTypes: [],
		seatingEnabled: false,
		seats: { min: 0, max: 80 }
	}
};

let initialResults = [];

function reducer(state, { type, payload }) {
	let myFeature;
	switch (type) {
		case 'ADD_PLACES':
			if (payload.length > 0) {
				return { ...state, places: payload };
			} else {
				return { ...state, places: initialResults, showMap: false };
			}
		case 'SHOW_MAP':
			return {
				...state,
				places: [],
				showMap: payload.showMap,
				place: payload.place,
				container: payload.container,
				headerText: payload.place.attributes.Place_addr
			};
		case 'RESULTS_LOADING':
			return { ...state, results: payload }; 
		case 'QUERY_DETAILS':
			myFeature = payload;
			return {
				...state,
				details: {
					queryFeature: myFeature
				}
			};
		case 'HAS_DETAILS':
			return {
				...state,
				details: {
					queryFeature: state.details.queryFeature,
					attributes: payload.attributes,
					savedExtent: payload.savedExtent,
					activeItem: payload.activeItem
				}
			};
		case 'CLEAR_DETAILS':
			// revert details savedExtent and activeItem
			return {
				...state,
				details: initialState.details
			};
		case 'HAS_FILTER_CHANGES':
			console.debug(`reduce HAS_FILTER_CHANGES`);

			let newRatingTypes = state.filters.ratingTypes;
			// if (payload.ratingType) {
			// 	if (!newRatingTypes.includes(payload.ratingType.value)) {
			// 		// add rating type
			// 		newRatingTypes.push(payload.ratingType.value);
			// 	} else {
			// 		// remove rating type
			// 		newRatingTypes = newRatingTypes.filter((item) => item !== payload.ratingType.value);
			// 	}
			// }
			if (payload.ratingType) {
				if (payload.ratingType.selected) {
					if (!newRatingTypes.includes(payload.ratingType.value)) {
						// add rating type
						newRatingTypes.push(payload.ratingType.value);
					}
				} else {
					// remove rating type
					newRatingTypes = newRatingTypes.filter((item) => item !== payload.ratingType.value);
				}
			}

			const newFilters = {
				restaurantTypes: payload.restaurantTypes || state.filters.restaurantTypes,
				ratingTypes: newRatingTypes,
				seatingEnabled: !_isUndefined(payload.seatingEnabled) ? payload.seatingEnabled : state.filters.seatingEnabled,
				seats: payload.seats || state.filters.seats,
				hasChanges: true
			}

			return {
				...state,
				filters: newFilters
			};
		case 'CLEAR_FILTERS':
			// hacky but have exhausted other options at this point
			// disabled. not fully implemented
			// ResetFilters(state);
			return {
				...state,
				filters: initialState.filters
			};
		default:
			return state;
	}
}

const AppContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	// note: this does not persist
	// let queryLayerView;

	// NOTE this side-effect is the default, "on page load" behavior
	useEffect(() => {
		// placeLocator().then((results) => {
		// 	initialResults = results;
		// 	dispatch({ type: 'ADD_PLACES', payload: results });
		// });
		document.title = 'Business Viewer'; 		// https://stackoverflow.com/questions/46160461/how-do-you-set-the-document-title-in-react

	}, []);

	useEffect(() => {
		const loadMap = async () => {
			const { initialize, showLocation } = await import('./data/webmap');
			const { container, place, showMapLocation } = state;
			
			// -----------------------------------------------------------------------
			// initialize webmap
			const mapInit = await initialize(container, dispatch);
			const mapView = mapInit.mapView;
			
			const queryLayerView = await mapView.whenLayerView(mapInit.queryLayer);
			
			// show location on webmap
			// showLocation(place, showMapLocation);
			
			const { queryItems } = await import('./data/results')

			// View extent changes
			mapView.watch("center", () => !appState.activeItem && queryItems(queryLayerView, state.filters, dispatch));

			// ------------------------------------------------------------------------
			// initialize results

			// TODO figure out a way to not need to pass dispatcher here... 
			//	... changing results.js into a react component or function are possible
			//	solutions
			// here is a place to start :(
			// https://www.pluralsight.com/guides/different-ways-to-dispatch-actions-with-redux
			queryItems(queryLayerView, state.filters, dispatch);
		};
		const loadPlaces = async(places) => {
			console.log(`loadPlaces()... places.length=${places.length}`);
			// note: this IS called, but we do NOT need to do anything here to show
			//	the list of places. see comment below
		};
		if (state.showMap) {
			// TODO see results.js line 85. uncommenting that line causes the following line
			//	to be called infinitely. i believe the fix is to add a new useEffect with a 
			//	narrower "listener" on the state. only care there about updates to results
			loadMap();
		} else if (state.places && state.places.length > 0) {
			// note: this IS called, but we do NOT need to do anything here to show
			//	the list of places. FWIW I'm not sure how the list appears, but it does
			//
			// ... TODO leaving this in because  maybe we want to hide the map here
			loadPlaces(state.places);
		}
	// }, [state]);
	}, [state.showMap]);

	useEffect(() => {
		// const placeName = state.details.queryFeature ? 
		// 	state.details.queryFeature.attributes["PlaceName"] :
		// 	'NONE'
		
		// console.debug(`Side effect queryFeature, ${placeName}`);

		// // const { queryDetails } = await import('./data/details')
		// const { queryDetails } = import('./data/details')
		// queryDetails(queryLayerView, state.details.queryFeature, dispatch)

		const loadAndQueryDetails = async () => {
			const placeName = state.details.queryFeature ? 
				state.details.queryFeature.attributes["PlaceName"] :
				'NONE'
			
			console.debug(`Side effect queryFeature, ${placeName}`);

			const { queryDetails } = await import('./data/details');
			// const { queryDetails } = import('./data/details')
			if (state.results && state.results.layerView) {
				queryDetails(state.results.layerView, state.details.queryFeature, dispatch);
			}
		}
		loadAndQueryDetails();
	}, [state.details.queryFeature]);

	useEffect(() => {	
		queryItems(state.results.layerView, state.filters, dispatch);
	}, [state.filters]);

	return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
