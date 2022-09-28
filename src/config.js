export const appConfig = {
  // https://eichcorp.maps.arcgis.com/home/item.html?id=e624fa4c6a6c42d2aa756d1a14715378
  webMapId: "e624fa4c6a6c42d2aa756d1a14715378", // streetViewProto_03_classic_repaired
  defaultRestaurantType: "All",
  restaurantTypes: [
    { 0: "Cafe"},
    { 1: "Restaurant"},
    { 2: "Take-out"},
  ],
  ratingTypes: [ 0, 1, 2, 3, 4, 5],
  pageNum: 25,
  queryLayerUrl:
    "https://services.arcgis.com/dzzxz7TyWArBNp4V/arcgis/rest/services/StreetView_SampleInput_EuroRest_20/FeatureServer",
  layerOutFields: [
    "ID",
    "PlaceName",
    "Place_addr",
    "Longitude",
    "Latitude",
    "FileRoot",
    "PlaceImage",
    "Rating",
    "RestType",
    "NumSeats",
    "HasSeating",
  ],
  seating: { enabled: false, min: 0, max: 75 },
  defaultWhereClause: "",
};
