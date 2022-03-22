import React, { useContext, useRef } from 'react';

import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-flow";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-notice";
import "@esri/calcite-components/dist/components/calcite-pagination";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-shell-center-row";
import "@esri/calcite-components/dist/components/calcite-tooltip-manager";
import {
	CalciteBlock,
	CalciteFlow,
	CalciteIcon,
	CalciteNotice,
	CalcitePagination,
	CalcitePanel,
	CalciteShell,
	CalciteShellPanel,
	CalciteShellCenterRow,
	CalciteTooltipManager,
  } from "@esri/calcite-components-react";
  import "@esri/calcite-components/dist/calcite/calcite.css";

// import AppBar from '@material-ui/core/AppBar';
// import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// // import TextField from '@material-ui/core/TextField';
// // import Autocomplete from '@mui/material/Autocomplete'

import { Apartment, ArrowBack, Check, PanoramaFishEyeOutlined } from '@material-ui/icons';

import { AppContext } from './AppContext';

import './App.css';
// import { Tooltip } from '@material-ui/core';

function App() {
	const { state, dispatch } = useContext(AppContext);
	const mapRef = useRef(null);
	
	return (
		<CalciteTooltipManager>
			<CalciteShell className="calcite-presentation" content-behind id="shell">
				<div className="temporary-header" slot="header">
					{/* <CalciteIcon icon="globe" scale="l"></CalciteIcon> */}
					<CalciteIcon icon="globe"/>
					RestaurantFinder
					{/* <calcite-action-pad layout="horizontal" expand-disabled>
						<calcite-action id="themeToggle" text="Light" icon="brightness"></calcite-action>
					</calcite-action-pad> */}
				</div>
				<CalciteShellPanel slot="primary-panel" width-scale id="primary-panel">
					<CalciteFlow id="flow">
						<CalcitePanel heading="Results" id="resultBlock"
								loading={state.results.loading}
								summary={state.results.message}>
							<CalcitePagination id="pagination" slot="footer">
							</CalcitePagination>
							<CalciteBlock open id="results">
								{(state.results.resultFeatures) && (state.results.resultFeatures.length >= 0) ? (
									null
								) : (
									<CalciteNotice active width="full">
										<span slot="title">
											No results in view
										</span>
										<span slot="message">
											Reset filters or move the map
										</span>
									</CalciteNotice>
								)}
							</CalciteBlock>
						</CalcitePanel>
					</CalciteFlow>
				</CalciteShellPanel>
				<CalciteShellCenterRow height-scale="l">
					{/* map view is rendered in this div based on initialState*/}
					<div className="mapDiv" ref={mapRef} id="myMapDiv">
						{[state.showMap ? (
							[]
						) : (
							<CalciteNotice active>
								<span slot="message" id="overview-text">Initial state, "showMap" is configured to false. Nothing to show here.</span>
							</CalciteNotice>
						)]}
					</div>
				</CalciteShellCenterRow>
			</CalciteShell>
		</CalciteTooltipManager>

		// <Container maxWidth="lg" className="app-container">
		// 	<Container maxWidth={state.showMap ? 'lg' : 'sm'} className="app-container">
		// 		{/* note: id is required here to show map when page loads */}
		// 		<div className="mapDiv" ref={mapRef} id="myMapDiv">
		// 			{state.showMap ? (
		// 				[]
		// 			) : (
		// 				<List>
		// 					{state.places.map((place) => (
		// 						<ListItem
		// 							button
		// 							onClick={() => {
		// 								dispatch({
		// 									type: 'SHOW_MAP',
		// 									payload: {
		// 										showMap: true,
		// 										place,
		// 										container: mapRef.current,
		// 									},
		// 								});
		// 							}}
		// 							key={place.attributes.Place_addr}
		// 						>
		// 							<ListItemText
		// 								primary={place.attributes.PlaceName}
		// 								secondary={place.attributes.Place_addr}
		// 							/>
		// 						</ListItem>
		// 					))}
		// 				</List>
		// 			)}
		// 		</div>
		// 	</Container>
		// </Container>
	);
}

export default App;
