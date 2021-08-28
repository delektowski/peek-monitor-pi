const knex = require("./knex");

function createSensorsData(sensorsData) {
  return knex("sensorsData").insert(sensorsData);
}

function getAllSensorsData() {
  return knex("sensorsData").select("*");
}

function createTable(tableName) {
  knex.schema.hasTable(tableName).then(function (exists) {
    if (!exists) {
      return knex.schema.createTable(tableName, function (table) {
        table.increments();
        table.string("temperature");
        table.string("pressure");
        table.string("humidity");
        table.timestamps();
      });
    }
  });
}

module.exports = {
  createSensorsData,
  getAllSensorsData,
  createTable,
};
