/**
 * handle click event on card or map feature
 * @param {*} objectId 
 * @returns 
 */
 async function resultClickHandler(objectId) {
    // TODO uncomment and fix this
    
    // appState.savedExtent = view.extent.clone();
    // appState.activeItem = true;
  
    // await whenFalseOnce(collegeLayerView, "updating");
  
    // const { features } = await collegeLayerView.queryFeatures({
    //   returnGeometry: true,
    //   outSpatialReference: view.spatialReference,
    //   objectIds: [objectId],
    //   outFields: appConfig.collegeLayerOutFields,
    // });
  
    // const result = features[0];
  
    // if (!result.geometry || !result.attributes) {
    //   return;
    // }
  
    // filtersNode.hidden = true;
    // const attributes = result.attributes;
    // const detailPanelNode = document.getElementById("detail-panel");
    
    // // a janky way to replace content in a single panel vs appending entire new one each time
    // if (!detailPanelNode) {
    //   const panel = document.createElement("calcite-panel");
    //   panel.heading = handleCasing(attributes["PlaceName"]);
    //   panel.summary = `${attributes["Rating"]} Stars(s)`;
    //   panel.id = "detail-panel";
    //   panel.addEventListener("calcitePanelBackClick", async () => {
    //     if (appState.savedExtent) {
    //       await view.goTo(appState.savedExtent);
    //       appState.savedExtent = null;
    //     }
    //     appState.activeItem = false;
    //     filtersNode.hidden = false;
    //   });
  
    //   const blockOne = document.createElement("calcite-block");
    //   blockOne.heading = "Restaurant Overview";
    //   blockOne.collapsible = true;
    //   blockOne.open = true;
  
    //   const blockTwo = document.createElement("calcite-block");
    //   blockTwo.heading = "Location";
    //   blockTwo.collapsible = true;
    //   blockTwo.open = true;
  
    //   const blockThree = document.createElement("calcite-block");
    //   blockThree.heading = "Business Information";
    //   blockThree.collapsible = true;
    //   blockThree.open = true;
  
    //   if (attributes["FileRoot"]) {
    //     const itemWebsite = document.createElement("calcite-button");
    //     itemWebsite.id = "detail-website-link";
    //     itemWebsite.iconEnd = "launch";
    //     itemWebsite.slot = "footer-actions";
    //     itemWebsite.scale = "l";
    //     itemWebsite.width = "full";
    //     itemWebsite.innerText = `StreetView Image`;
    //     itemWebsite.href = `https://www.eichcorp.com/views/${attributes["FileRoot"]}_pic.jpg`;
    //     itemWebsite.rel = `noref noreferrer`;
    //     itemWebsite.target = `blank`;
    //     panel.appendChild(itemWebsite);
    //   }
  
    //   const notice = document.createElement("calcite-notice");
    //   notice.active = true;
    //   notice.width = "full";
  
    //   const message = document.createElement("span");
    //   message.id = "overview-text";
    //   message.slot = "message";
    //   message.innerText = attributes["overview"]
    //     ? attributes["overview"]
    //     : "No overview available";
  
    //   notice.appendChild(message);
    //   blockOne.appendChild(notice);
  
    //   if (attributes["RestType"] && attributes["RestType"] >= 0) {
    //     const label = document.createElement("calcite-label");
    //     label.layout = "inline-space-between";
    //     label.innerText = "Restaurant Type";
    //     const span = document.createElement("span");
    //     span.id = "detail-type";
    //     // TODO use config to translate code to string
    //     var myText = `Type ${attributes["RestType"]}`;
    //     span.innerText = myText;
    //     label.append(span);
    //     blockOne.appendChild(label);
    //   }
  
    //   // ------------------------------------------------------------------------------------
    //   // Location
  
    //   if (attributes["Place_addr"]) {
    //     const label = document.createElement("calcite-label");
    //     label.layout = "inline-space-between";
    //     label.innerText = "Address";
    //     const span = document.createElement("span");
    //     span.id = "detail-total";
    //     span.innerText = `${attributes["Place_addr"]}`;
    //     label.append(span);
    //     blockTwo.appendChild(label);
    //   }
  
    //   if (attributes["Latitude"]) {
    //     const label = document.createElement("calcite-label");
    //     label.layout = "inline-space-between";
    //     label.innerText = "Latitude";
    //     const span = document.createElement("span");
    //     span.id = "detail-ft";
    //     span.innerText = `${attributes["Latitude"]}`;
    //     label.append(span);
    //     blockTwo.appendChild(label);
    //   }
  
    //   if (attributes["Longitude"]) {
    //     const label = document.createElement("calcite-label");
    //     label.layout = "inline-space-between";
    //     label.innerText = "Longitude";
    //     const span = document.createElement("span");
    //     span.id = "detail-pt";
    //     span.innerText = `${attributes["Longitude"]}`;
    //     label.append(span);
    //     blockTwo.appendChild(label);
    //   }
  
    //   // -----------------------------------------------------------------------------------
    //   // Business Information
  
    //   // TODO translate integer codes to strings using config.js
  
    //   if (attributes["Rating"] && attributes["Rating"] >=0) {
    //     const label = document.createElement("calcite-label");
    //     label.layout = "inline-space-between";
    //     label.innerText = "Rating";
    //     const span = document.createElement("span");
    //     span.id = "detail-housing";
    //     span.innerText = `${attributes["Rating"]} Stars(s)`;
    //     label.append(span);
    //     blockThree.appendChild(label);
    //   }
  
    //   if (attributes["RestType"] && attributes["Rating"] >=0) {
    //     const label = document.createElement("calcite-label");
    //     label.layout = "inline-space-between";
    //     label.innerText = "Restaurant Type";
    //     const span = document.createElement("span");
    //     span.id = "detail-housing";
    //     span.innerText = `Type ${attributes["RestType"]}`;
    //     label.append(span);
    //     blockThree.appendChild(label);
    //   }
  
    //   if (attributes["HasSeating"] && attributes["HasSeating"] >=0) {
    //     const label = document.createElement("calcite-label");
    //     label.layout = "inline-space-between";
    //     label.innerText = "Has Seating";
    //     const span = document.createElement("span");
    //     span.id = "detail-housing";
    //     span.innerText = `${
    //       parseInt(attributes["HasSeating"]) === 0 ? "Yes" : "No"
    //     }`;
    //     label.append(span);
    //     blockThree.appendChild(label);
    //   }
  
    //   // TODO come back to this NumSeats = 0 fails this if
    //   // if (attributes["NumSeats"]) {
    //     const label = document.createElement("calcite-label");
    //     label.layout = "inline-space-between";
    //     label.innerText = "Seats";
    //     const span = document.createElement("span");
    //     span.id = "detail-housing";
    //     span.innerText = `${attributes["NumSeats"]}`;
    //     label.append(span);
    //     blockThree.appendChild(label);
    //   // }
  
    //   // -----------------------------------------------------------------------------------
  
    //   panel.appendChild(blockOne);
    //   panel.appendChild(blockTwo);
    //   panel.appendChild(blockThree);
  
    //   flowNode.appendChild(panel);
    // } else {
    //   detailPanelNode.heading = handleCasing(attributes["NAME"]);
    //   detailPanelNode.summary = `${handleCasing(attributes["CITY"])}, ${
    //     attributes["STATE"]
    //   }`;
  
    //   document.getElementById(
    //     "detail-website-link"
    //   ).href = `http://${attributes["WEBSITE"]}`;
  
    //   document.getElementById("overview-text").innerText = attributes[
    //     "overview"
    //   ]
    //     ? attributes["overview"]
    //     : "No overview available";
  
    //   document.getElementById(
    //     "detail-type"
    //   ).innerText = `${attributes["schoolType"]}`;
  
    //   document.getElementById("detail-total").innerText = `${parseInt(
    //     attributes["TOT_ENROLL"]
    //   ).toLocaleString()}`;
  
    //   document.getElementById("detail-ft").innerText = `${parseInt(
    //     attributes["FT_ENROLL"] === -999 ? "0" : attributes["FT_ENROLL"]
    //   ).toLocaleString()}`;
  
    //   document.getElementById("detail-pt").innerText = `${parseInt(
    //     attributes["PT_ENROLL"] === -999 ? "0" : attributes["PT_ENROLL"]
    //   ).toLocaleString()}`;
  
    //   document.getElementById("detail-housing-capac").innerText = `${
    //     parseInt(attributes["DORM_CAP"]) !== -999
    //       ? parseInt(attributes["DORM_CAP"]).toLocaleString()
    //       : "N/A"
    //   }`;
    //   document.getElementById("detail-housing").innerText = `${
    //     parseInt(attributes["DORM_CAP"]) !== -999 ? "Yes" : "No"
    //   }`;
  
    //   document.getElementById("detail-address").innerText = `${handleCasing(
    //     attributes["ADDRESS"]
    //   )}, ${handleCasing(attributes["CITY"])}, ${attributes["STATE"]}`;
  
    //   document.getElementById("detail-website").innerText = `${
    //     attributes["WEBSITE"] ? attributes["WEBSITE"] : "N/A"
    //   }`;
  
    //   document.getElementById("detail-phone").innerText = `${
    //     attributes["TELEPHONE"] ? attributes["TELEPHONE"] : "N/A"
    //   }`;
    // }
    // view.goTo(
    //   {
    //     center: [result.geometry.longitude, result.geometry.latitude],
    //     zoom: 13,
    //   },
    //   { duration: 400 }
    // );
  }