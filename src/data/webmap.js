import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import WebMap from '@arcgis/core/WebMap';
import config from '@arcgis/core/config';
import Home from '@arcgis/core/widgets/Home'
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import Point from '@arcgis/core/geometry/Point';

import '@arcgis/core/assets/esri/themes/light/main.css';

import { coffee } from './images';
import { isEmpty } from 'lodash';

const symbol = {
	type: 'picture-marker',
	// from '@mui/icons-material/Apartment';
	url: 'https://coowydy65hkjls6p.maps.arcgis.com/sharing/rest/content/items/dff6f88348484e81a951a637d659e287/data',
	width: 22,
	height: 22,
	yoffset: 23,
};

// const checkSymbol = {
// 	type: 'picture-marker',
// 	// from https://icons8.com/icons/set/check--static --> icon Becris Lineal → Mintab for iOS  → Check
// 	// url: 'https://eichcorp.maps.arcgis.com/sharing/rest/content/items/1d11db1d7ade47dd8c782054851a7279/data',
// 	url: 'https://coowydy65hkjls6p.maps.arcgis.com/sharing/rest/content/items/cb24ce457b5447d9bdd2ffb054a5d0df/data',
// 	width: 22,
// 	height: 22,
// 	yoffset: 23,
// };

// const checkSymbol = new TextSymbol({
// 	color: '#7A003C',
// 	text: '\ue605',  // esri-icon-check-mark
// 	font: {  // autocast as new Font()
// 	  size: 24,
// 	  family: 'CalciteWebCoreIcons'
// 	}
//   });
const checkSymbol = {
	type: 'text',
	color: '#7A003C',
	text: '\ue605',  // esri-icon-check-mark
	font: {  // autocast as new Font()
	  size: 24,
	  family: 'CalciteWebCoreIcons'
	}
  };

export const webmap = new WebMap({
	// TODO centralize all this config in one place, e.g AppContext.js
	portalItem: {
		// id: 'f9b9672edbe440f49c6473c1de46eaef' // AE Sites Proto EXTERNAL 09 (New Viewer). requires ae_web apiKey
		// id: '44f6dab525c5461a8e8b0b4286ccc93b' // streetViewProto_02
		// id: '2ff9e65d764f4a218f45563f9ace4408' // streetViewProto_02_classic
		id: "1c03bf18ac7a4d4c8741dd43cb479076", // streetViewProto_03_classic
	  }
});

const app = {
	map: webmap,
	scale: 100000,
	ui: {
		components: ['attribution', 'zoom', /*'compass',*/ ],
	},
};

export let view = new MapView(app);

const home = new Home({
	view: view
});
view.ui.add(home, 'top-left');

export async function initialize(container) {
	view.container = container;
	
	// config.apiKey =	'REPLACE_WITH_API_KEY'
   
	return view;
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
