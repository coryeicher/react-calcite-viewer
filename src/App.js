import React, { useContext, useRef } from 'react';

import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-flow";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-notice";
import "@esri/calcite-components/dist/components/calcite-pagination";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-shell-center-row";
import "@esri/calcite-components/dist/components/calcite-tooltip";
import "@esri/calcite-components/dist/components/calcite-tooltip-manager";
import {
	CalciteBlock,
	CalciteButton,
	CalciteCard,
	CalciteChip,
	CalciteFlow,
	CalciteIcon,
	CalciteNotice,
	CalcitePagination,
	CalcitePanel,
	CalciteShell,
	CalciteShellPanel,
	CalciteShellCenterRow,
	CalciteTooltip,
	CalciteTooltipManager,
	CalciteLabel,
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
						<CalcitePanel 
							heading="Results"
							id="resultBlock"
							loading={state.results.loading}
							summary={state.results.message}
							>
							<CalcitePagination id="pagination" slot="footer">
							</CalcitePagination>
							<CalciteBlock open id="results">
								{(state.results.features) && (state.results.features.length >= 0) ? (
									state.results.features.map((feature) => (
										<button className = "item-button"
												onClick={() => {
													console.debug(`Card onClick(), ${feature.attributes["PlaceName"]}`);
													dispatch({
														type: 'QUERY_DETAILS',
														payload: feature
													});
												}}>
											<CalciteCard>
												{(parseInt(feature.attributes["HasSeating"]) === 1) ? (
													<CalciteChip icon="organization" slot="footer-trailing" scale="s">
														Seating
													</CalciteChip>
												) : (
													null
												)}
												<CalciteChip icon="star" slot="footer-leading" scale="s">
													{feature.attributes["Rating"]} Stars(s)
												</CalciteChip>
												<span slot="title">
												{feature.attributes["PlaceName"]}
												</span>
												<span slot="subtitle">
													{feature.attributes["Place_addr"]}
												</span>
											</CalciteCard>

										</button>
									))
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
						{(state.details && state.details.attributes) ? (
							// wrap CalcitePanel in div to avoid DOMException
							<div>
								<CalcitePanel
									heading = {state.details.attributes["PlaceName"]}
									summary = {`${state.details.attributes["Rating"]} Stars(s)`}
									id = "detail-panel"
									onCalcitePanelBackClick={async(e) => {
										const view = state.results.layerView.view;
										await view.goTo(state.details.savedExtent);
										dispatch({
											type: 'CLEAR_DETAILS', 
											payload: []
										});
									}}>
									<CalciteBlock
										heading = "Restaurant Overview"
										collapsible
										open
									>
										<CalciteNotice active width="full">
											<span id="overview-text" slot="message">
												{(state.details.attributes["overview"]) ? state.details.attributes["overview"] : "No overview available"}
											</span>
										</CalciteNotice>
										{(state.details.attributes["RestType"] && state.details.attributes["RestType"] >= 0) ? (
											<CalciteLabel layout = "inline-space-between">
												Restaurant Type
												<span id="detail-type">
													{/* TODO use config to translate code to string */}
													{`Type ${state.details.attributes["RestType"]}`}
												</span>
											</CalciteLabel>
										) : (null)}
									</CalciteBlock>
									<CalciteBlock
										heading = "Location"
										collapsible
										open
									>
										<CalciteLabel layout = "inline-space-between">
											Address
											<span id="detail-add">
												{state.details.attributes["Place_addr"]}
											</span>
										</CalciteLabel>
										<CalciteLabel layout = "inline-space-between">
											Latitude
											<span id="detail-lat">
												{state.details.attributes["Latitude"]}
											</span>
										</CalciteLabel>
										<CalciteLabel layout = "inline-space-between">
											Longitude
											<span id="detail-lon">
											{state.details.attributes["Longitude"]}
											</span>
										</CalciteLabel>
									</CalciteBlock>
									<CalciteBlock
										heading = "Business Information"
										collapsible
										open
									>
										<CalciteLabel layout = "inline-space-between">
											Rating
											<span id="detail-rat">
												{`${state.details.attributes["Rating"]} Stars(s)`}
											</span>
										</CalciteLabel>
										<CalciteLabel layout = "inline-space-between">
											Restaurant Type
											<span id="detail-typ">
												{`Type ${state.details.attributes["RestType"]}`}
											</span>
										</CalciteLabel>
										<CalciteLabel layout = "inline-space-between">
											Has Seating
											<span id="detail-has">
												{`${parseInt(state.details.attributes["HasSeating"]) === 0 ? "Yes" : "No"}`}
											</span>
										</CalciteLabel>
										<CalciteLabel layout = "inline-space-between">
											Seats
											<span id="detail-num">
											{state.details.attributes["NumSeats"]}
											</span>
										</CalciteLabel>
									</CalciteBlock>
									{(state.details.attributes["FileRoot"]) ? (
										<CalciteButton
											id = "detail-website-link"
											iconEnd = "launch"
											slot = "footer-actions"
											scale = "l"
											width = "full"
											innerText = "StreetView Image"
											href = {`https://www.eichcorp.com/views/${state.details.attributes["FileRoot"]}_pic.jpg`}
											rel = "noref noreferrer"
											target = "blank"
										></CalciteButton>
									) : (null)}
								</CalcitePanel>
							</div>
						) : (
							null
						)}
					</CalciteFlow>
				</CalciteShellPanel>
				<CalciteShellCenterRow height-scale="l" position="end">
					{/* map view is rendered in this div based on initialState*/}
					<div ref={mapRef} id="viewDiv">
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
			<CalciteTooltip reference-element="reset">Reset filters</CalciteTooltip>
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
