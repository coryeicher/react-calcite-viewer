import { whenFalseOnce } from "https://js.arcgis.com/4.22/@arcgis/core/core/watchUtils.js";

import { appConfig } from ".././config.js";
import { appState } from ".././state.js";

import { AppContext } from '.././AppContext';

import { handleCasing, whereClause } from '.././utils.js';

// TODO replace these element references with state updates
const paginationNode = document.getElementById("pagination");
// TODO also, resetNode is part of the filters UI
// const resetNode = document.getElementById("reset");
const resultsNode = document.getElementById("results");

export async function queryItems(layerView, dispatch, start = 0) {
    // resetNode.hidden = !appState.hasFilterChanges;
    // resetNode.indicator = appState.hasFilterChanges;

    if (!layerView) {
      return;
    }
    const view = layerView.view;

    notifyResultsLoading(true, "", dispatch);

    const where = whereClause();

    layerView.featureEffect = {
      filter: {
        where: where,
      },
      excludedEffect: "grayscale(80%) opacity(30%)",
    };

    await whenFalseOnce(layerView, "updating");

    if (start === 0) {
      appState.count = await layerView.queryFeatureCount({
        geometry: view.extent.clone(),
        where,
      });
      paginationNode.total = appState.count;
      paginationNode.start = 1;
    }

    paginationNode.hidden = appState.count <= appConfig.pageNum;

    const results = await layerView.queryFeatures({
      start,
      num: appConfig.pageNum,
      geometry: view.extent.clone(),
      where: whereClause(),
      outFields: [
        ...appConfig.layerOutFields,
        layerView.layer.objectIdField,
      ],
    });
        
    const msg = `${appState.count} restaurants found within the map.`
    notifyHasResults(results.features, msg, layerView, dispatch);
  }

function notifyHasResults(resultFeatures, msg, resultLayerView, dispatch) {

    // TODO for clarity:
    //  rename type and re-use
    //  refactor notify functions (use 1 fn?) and re-use

    dispatch({
        type: 'RESULTS_LOADING', 
        payload: {
            loading: false,
            message: msg,
            features: resultFeatures,
            layerView: resultLayerView
        },
    });
}

function notifyResultsLoading(isLoading, msg, dispatch) {

    dispatch({
        type: 'RESULTS_LOADING',
        payload: {
            loading: isLoading,
            message: msg,
        }
    });
}