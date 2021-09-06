const knex = require("./knex");
const {createTableName} = require("../utils/createTableName");

function createSensorsData(sensorsData) {
  return knex(createTableName()).insert(sensorsData);
}

function getAllSensorsData() {
  return knex(createTableName()).select("*");
}

function createTable(tableName) {
  knex.schema.hasTable(tableName).then(function (exists) {
    if (!exists) {
      return knex.schema.createTable(tableName, function (table) {
        table.increments();
        table.integer("temperature");
        table.integer("pressure");
        table.integer("humidity");
        table.string("measurementDate");
      });
    }
  }).catch(err=>{
    console.log("Table creation error",err)
  });
}

module.exports = {
  createSensorsData,
  getAllSensorsData,
  createTable,
};
