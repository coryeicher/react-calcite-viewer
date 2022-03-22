import React, { createContext, useEffect, useReducer } from 'react';

import { placeLocator } from './data/locator';
import { appConfig } from "./config.js";
import { appState } from "./state.js";

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
	}
};

let initialResults = [];

function reducer(state, { type, payload }) {
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
		case 'SHOW_DETAILS':
			const myFeature = payload;
			console.debug(`reduce SHOW_DETAILS, ${myFeature.attributes["PlaceName"]}`);
			return {
				...state,
				details: {
					feature: myFeature
				}
			};
		default:
			return state;
	}
}

const AppContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	let queryLayerView;

	// NOTE this side-effect is the default, "on page load" behavior
	useEffect(() => {
		// placeLocator().then((results) => {
		// 	initialResults = results;
		// 	dispatch({ type: 'ADD_PLACES', payload: results });
		// });
		document.title = 'Restaurant Finder'; 		// https://stackoverflow.com/questions/46160461/how-do-you-set-the-document-title-in-react

	}, []);

	useEffect(() => {
		const loadMap = async () => {
			const { initialize, showLocation } = await import('./data/webmap');
			const { container, place, showMapLocation } = state;
			
			// -----------------------------------------------------------------------
			// initialize webmap
			const mapView = await initialize(container);
			
			// TODO push some of this logic into the initialize fn

			await mapView.when();

			const queryLayer = mapView.map.layers.find(
			  (layer) => layer.url === appConfig.collegeLayerUrl
			);
		  
			if (!queryLayer) {
			  return;
			}
		  
			await queryLayer.load();
		  
			queryLayer.outFields = [
			  ...appConfig.collegeLayerOutFields,
			  queryLayer.objectIdField,
			];
			
			// pulled up so that we can use in other side effects
			// const queryLayerView = await mapView.whenLayerView(queryLayer);
			queryLayerView = await mapView.whenLayerView(queryLayer);
			
			// show location on webmap
			// showLocation(place, showMapLocation);
			
			const { queryItems } = await import('./data/results')

			// View extent changes
			mapView.watch("center", () => !appState.activeItem && queryItems(queryLayerView, dispatch));

			// ------------------------------------------------------------------------
			// initialize results

			// TODO figure out a way to not need to pass dispatcher here... 
			//	... changing results.js into a react component or function are possible
			//	solutions
			// here is a place to start :(
			// https://www.pluralsight.com/guides/different-ways-to-dispatch-actions-with-redux
			queryItems(queryLayerView, dispatch);
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

	return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
