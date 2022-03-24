import { appConfig } from "./config.js";
import { appState } from "./state.js";

export function handleCasing(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
}

export function whereClause() {
  let where = appConfig.defaultWhereClause;

  if (appState.seating?.enabled) {
    where += combineSQLStatements(where, `HasSeating=1`);
    where += combineSQLStatements(
      where,
      `NumSeats > ${appState.seating.min}`
    );
    where += combineSQLStatements(
      where,
      `NumSeats < ${appState.seating.max}`
    );
  }

  if (appState.activeRatingTypes.length > 0) {
    let schoolWhere = "";
    const values = appState.activeRatingTypes.flat();
    values.forEach(
      (value) =>
        (schoolWhere += combineSQLStatements(
          schoolWhere,
          `Rating = ${value}`,
          "OR"
        ))
    );
    where += combineSQLStatements(where, schoolWhere);
  }

  // TODO should be getting this from state instead
  const restaurantTypeNode = document.getElementById("restaurantType");

  const restaurantTypeValue = restaurantTypeNode ? restaurantTypeNode.value : undefined;
  if (restaurantTypeValue && restaurantTypeValue !== appConfig.defaultRestaurantType) {
    const values = restaurantTypeValue.split(",");
    let schoolWhere = "";
    values.forEach(
      (value) =>
        (schoolWhere += combineSQLStatements(
          schoolWhere,
          `RestType = ${value}`,
          "OR"
        ))
    );
    where += combineSQLStatements(where, schoolWhere);
  }

  return where;
}

function combineSQLStatements(where, sql, operator = "AND") {
  return where ? ` ${operator} (${sql})` : `(${sql})`;
}
