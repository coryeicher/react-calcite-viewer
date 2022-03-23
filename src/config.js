export const appConfig = {
  webMapId: "1c03bf18ac7a4d4c8741dd43cb479076", // streetViewProto_03_classic
  defaultSchoolType: "all",
  // schoolTypes: {
  //   Cafe: [0],
  //   Restaurant: [1],
  //   "Take-out": [2],
  // },
  schoolTypes: [
    { 0: "Cafe"},
    { 1: "Restaurant"},
    { 2: "Take-out"},
  ],
  programTypes: {
    "0 Stars": [0],
    "1 Stars": [1],
    "2 Stars": [2],
    "3 Stars": [3],
    "4 Stars": [4],
    "5 Stars": [5],
  },
  pageNum: 25,
  collegeLayerUrl:
    "https://services3.arcgis.com/cWSjYIaxDaOe4Fsz/arcgis/rest/services/StreetView_SampleInput_EuroRest_20/FeatureServer",
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
  housing: { enabled: false, min: 0, max: 75 },
  defaultWhereClause: "",
};
