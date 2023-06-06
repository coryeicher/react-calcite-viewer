export const appConfig = {
  // https://eichcorporg.maps.arcgis.com/home/item.html?id=44f73ed2a9d74e219b40738a476c1bb6
  webMapId: "44f73ed2a9d74e219b40738a476c1bb6", // streetViewProto_03_classic_repaired
  defaultRestaurantType: "All",
  restaurantTypes: [
    { 0: "Cafe"},
    { 1: "Restaurant"},
    { 2: "Take-out"},
  ],
  ratingTypes: [ 0, 1, 2, 3, 4, 5],
  pageNum: 25,
  queryLayerUrl:
    "https://services2.arcgis.com/0jbKR5GTdHdCF61M/arcgis/rest/services/StreetView_SampleInput_EuroRest_20/FeatureServer",
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
