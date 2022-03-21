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

  if (appState.housing?.enabled) {
    where += combineSQLStatements(where, `HasSeating=1`);
    where += combineSQLStatements(
      where,
      `NumSeats > ${appState.housing.min}`
    );
    where += combineSQLStatements(
      where,
      `NumSeats < ${appState.housing.max}`
    );
  }

  if (appState.activeProgramTypes.length > 0) {
    let schoolWhere = "";
    const values = appState.activeProgramTypes.flat();
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
  const schoolTypeNode = document.getElementById("schoolType");

  const schoolTypeValue = schoolTypeNode ? schoolTypeNode.value : undefined;
  if (schoolTypeValue && schoolTypeValue !== appConfig.defaultSchoolType) {
    const values = schoolTypeValue.split(",");
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
