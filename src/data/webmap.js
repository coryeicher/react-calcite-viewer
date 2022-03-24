import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import WebMap from '@arcgis/core/WebMap';
import config from '@arcgis/core/config';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import Point from '@arcgis/core/geometry/Point';

// widgets
import Expand from '@arcgis/core/widgets/Expand'
import Home from '@arcgis/core/widgets/Home'
import Legend from '@arcgis/core/widgets/Legend'
import Search from '@arcgis/core/widgets/Search'

import '@arcgis/core/assets/esri/themes/light/main.css';

import { appConfig } from '.././config.js';

const symbol = {
	type: 'picture-marker',
	// from '@mui/icons-material/Apartment';
	url: 'https://coowydy65hkjls6p.maps.arcgis.com/sharing/rest/content/items/dff6f88348484e81a951a637d659e287/data',
	width: 22,
	height: 22,
	yoffset: 23,
};

export const webmap = new WebMap({
	portalItem: {
		id: appConfig.webMapId
	  }
});

const app = {
	map: webmap,
	ui: {
		components: ['attribution', 'zoom', /*'compass',*/ ],
	},
};

export let view = new MapView(app);

setupWidgets();

export async function initialize(container, dispatch) {
	view.container = container;
	
	// config.apiKey =	'REPLACE_WITH_API_KEY'
   
	await view.when();

	const queryLayer = view.map.layers.find(
	  (layer) => layer.url === appConfig.queryLayerUrl
	);
  
	if (!queryLayer) {
	  return;
	}
  
	await queryLayer.load();
  
	queryLayer.outFields = [
	  ...appConfig.layerOutFields,
	  queryLayer.objectIdField,
	];

	// View clicking
	view.on("click", async (event) => {
		const response = await view.hitTest(event);

		const results = response.results.filter(
		(result) =>
			result.graphic.sourceLayer?.id === queryLayer.id &&
			!result.graphic.isAggregate
		);

		if (!results.length) {
		return;
		}

		const graphic = results[0].graphic;

		console.debug(`Map feature onClick(), ${graphic.attributes["PlaceName"]}`);
		dispatch({
			type: 'QUERY_DETAILS',
			payload: graphic
		});
	});

	return { mapView: view, queryLayer: queryLayer};
}

/**
 * If item, display graphic at item coordinate and zoom to item extent...
 * ... otherwise just center map on mapCoord
 */
export async function showLocation(item, mapCoord) {
	
	if (item) {
		let attributes, location, extent
		({ attributes, location, extent } = item);

		const graphic = new Graphic({
			attributes,
			geometry: {
				type: 'point',
				...location
			},
			symbol,
			popupTemplate: {
				title: 'At this location:',
				content: '<p style="text-align: center; text-transform: uppercase">{PlaceName}</p><p>{Place_addr}</p>'
			}
		});
		view.graphics.add(graphic);
		view.extent = extent;
	} else {
		// let coordinate = {...location};
		// if (isEmpty(coordinate)) {
		// 	coordinate = { x: mapCoord.x, y: mapCoord.y}
		// }
		
		// NOTE none of these work from INITIAL STATE (map does not show)...
		//		but if triggered later, map displays fine
		// view.center = mapCoord;
		// view.center = [mapCoord.x, mapCoord.y];
		view.center = new Point({ x: mapCoord.x, y: mapCoord.y});
	}
}

function setupWidgets() {
	const home = new Home({
		view: view
	});
	view.ui.add(home, 'top-left');

	view.ui.move("zoom", "top-left");

	const search = new Search({
		view,
		resultGraphicEnabled: false,
		popupEnabled: false,
	  });
	
	  const searchExpand = new Expand({
		view,
		content: search,
	  });
	
	  view.ui.add(searchExpand, "top-left");
	
	  const legend = new Legend({
		view,
	  });
	
	  const legendExpand = new Expand({
		view,
		content: legend,
	  });
	
	  view.ui.add(legendExpand, "top-left");
}
