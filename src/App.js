import React, { useContext, useRef } from 'react';

import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-block-section";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-flow";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-notice";
import "@esri/calcite-components/dist/components/calcite-pagination";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-shell-center-row";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-tooltip";
import "@esri/calcite-components/dist/components/calcite-tooltip-manager";
import {
	CalciteAction,
	CalciteBlock,
	CalciteBlockSection,
	CalciteButton,
	CalciteCard,
	CalciteChip,
	CalciteFlow,
	CalciteIcon,
	CalciteOption,
	CalciteNotice,
	CalcitePagination,
	CalcitePanel,
	CalciteSelect,
	CalciteShell,
	CalciteShellPanel,
	CalciteShellCenterRow,
	CalciteSlider,
	CalciteTooltip,
	CalciteTooltipManager,
	CalciteLabel,
  } from "@esri/calcite-components-react";
  import "@esri/calcite-components/dist/calcite/calcite.css";

import { appConfig } from "./config.js";
import { AppContext } from './AppContext';

import './App.css';

function App() {
	const { state, dispatch } = useContext(AppContext);
	const mapRef = useRef(null);
	
	return (
		<CalciteTooltipManager>
			<CalciteShell className="calcite-presentation" content-behind id="shell">
				<div className="temporary-header" slot="header">
					<img src=".\EICHCORPICON.svg" height="32px"/>
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
								<CalcitePanel id = "detail-panel"
									heading = {state.details.attributes["PlaceName"]}
									summary = {`${state.details.attributes["Rating"]} Stars(s)`}
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
				<CalciteShellPanel slot="contextual-panel" detached>
					<CalciteBlock id="filters" heading="Filters" collapsible>
						<CalciteAction id="reset" icon="reset" slot="icon"
							hidden={!state.filters.hasChanges}
							indicator={state.filters.hasChanges}
							onClick={() => {
								dispatch({
									type: 'CLEAR_FILTERS', 
									payload: []
								});
							}}/>
						<CalciteBlock heading="Basics" open>
						<CalciteLabel>
							Restaurant type
							<CalciteSelect id="restaurantType"
								onCalciteSelectChange={(e) => {
									dispatch({
										type: 'HAS_FILTER_CHANGES', 
										payload: {
											restaurantTypes: e.target.selectedOption.value }
									});
								}}>
								<CalciteOption value="all">All</CalciteOption>
								{appConfig.restaurantTypes.map((typeObj) => (
									// hacky and not so pretty
									<CalciteOption value={`${Object.keys(typeObj)[0]}`}>{Object.values(typeObj)[0]}</CalciteOption>
								))}
							</CalciteSelect>
						</CalciteLabel>
						<CalciteLabel>
							Rating
							<div id="ratingType">
							{appConfig.ratingTypes.map((typeObj) => (
								<CalciteChip
									tabIndex = "0"
									// dataset-type instead?
									data-type = "type" 
									value = {typeObj}
									scale = "s"
									onClick={(e) => {
										// use "blue" for selected
										e.target.color = (e.target.color === "grey") ? "blue" : "grey";
										dispatch({
											type: 'HAS_FILTER_CHANGES', 
											payload: {
												ratingType: {
													value: typeObj,
													selected: e.target.color === "blue"
												}
											}
										});
									}}>
									{`${typeObj} stars()`}
								</CalciteChip>
							))}
							</div>
						</CalciteLabel>
						</CalciteBlock>
						<CalciteBlock heading="Seating" open>
							<CalciteBlockSection id="seatingSection" text="Offers seating" toggle-display="switch"
								onCalciteBlockSectionToggle={(e) => {
									dispatch({
										type: 'HAS_FILTER_CHANGES', 
										payload: {
											seatingEnabled: e.target.open
										}
									});
								}}>
								<CalciteLabel>
									Number of seats
									{/* TODO constrain slider to integer values */}
									<CalciteSlider id="seating" range label-handles min="0" max="80" steps="40"
										min-value={state.filters.seats.min}
										max-value={state.filters.seats.max}
										// seemingly not needed, but if we keep need to dispatch event which calls filterMap()
										// onCalciteSliderInput={(e) => {
										// 	dispatch({
										// 		type: 'HAS_FILTER_CHANGES', 
										// 		payload: {
										// 			seats: { min: e.target.minValue, max: e.target.maxValue }
										// 		}
										// 	});
										// }}
										onCalciteSliderChange={(e) => {
											dispatch({
												type: 'HAS_FILTER_CHANGES', 
												payload: {
													seats: { min: e.target.minValue, max: e.target.maxValue }
												}
											});
										}}>
									</CalciteSlider>
								</CalciteLabel>
							</CalciteBlockSection>
						</CalciteBlock>
					</CalciteBlock>
				</CalciteShellPanel>
			</CalciteShell>
			<CalciteTooltip reference-element="reset">Reset filters</CalciteTooltip>
		</CalciteTooltipManager>
	);
}

export default App;
