import { appConfig } from "./config.js";
// import { appState } from "./state.js";

export function handleCasing(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
}

export function whereClause(filters) {
  let where = appConfig.defaultWhereClause;

  if (filters.seatingEnabled) {
    where += combineSQLStatements(where, `HasSeating=1`);
    where += combineSQLStatements(
      where,
      `NumSeats > ${filters.seats.min}`
    );
    where += combineSQLStatements(
      where,
      `NumSeats < ${filters.seats.max}`
    );
  }

  if (filters.ratingTypes.length > 0) {
    let typeWhere = "";
    const values = filters.ratingType.flat();
    values.forEach(
      (value) =>
        (typeWhere += combineSQLStatements(
          typeWhere,
          `Rating = ${value}`,
          "OR"
        ))
    );
    where += combineSQLStatements(where, typeWhere);
  }

  // filters.restaurantTypes is comma delim string, but control
  //    does not support multi-select at this time
  if (filters.restaurantTypes && filters.restaurantTypes != appConfig.defaultRestaurantType) {
    const values = filters.restaurantTypes.split(",");
    let typeWhere = "";
    values.forEach(
      (value) =>
        (typeWhere += combineSQLStatements(
          typeWhere,
          `RestType = ${value}`,
          "OR"
        ))
    );
    where += combineSQLStatements(where, typeWhere);
  }

  return where;
}

function combineSQLStatements(where, sql, operator = "AND") {
  return where ? ` ${operator} (${sql})` : `(${sql})`;
}
