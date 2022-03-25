import { whenFalseOnce } from "https://js.arcgis.com/4.22/@arcgis/core/core/watchUtils.js";

import { appConfig } from ".././config.js";

/**
 * retrieve data for feature
 * @param {*} layerView 
 * @param {*} feature 
 * @param {*} dispatch 
 * @returns 
 */
export async function queryDetails(layerView, queryFeature, dispatch) {
  
    const view = layerView.view;
    const savedExtent = view.extent.clone();
    const activeItem = true;

    await whenFalseOnce(layerView, "updating");
  
    const objectId = queryFeature.attributes[layerView.layer.objectIdField];

    const { features } = await layerView.queryFeatures({
      returnGeometry: true,
      outSpatialReference: layerView.view.spatialReference,
      objectIds: [objectId],
      outFields: appConfig.layerOutFields,
    });
  
    const resultFeature = features[0];
  
    if (!resultFeature.geometry || !resultFeature.attributes) {
      return;
    }
    view.goTo(
        {
          center: [resultFeature.geometry.longitude, resultFeature.geometry.latitude],
          zoom: 13,
        },
        { duration: 400 }
      );
    notifyHasDetails(resultFeature.attributes, savedExtent, dispatch);
  }

function notifyHasDetails(featureAttributes, extent, dispatch) {

    dispatch({
        type: 'HAS_DETAILS', 
        payload: {
            attributes: featureAttributes,
            savedExtent: extent,
            activeItem: true
        },
    });
}
