const knex = require("./knex");

function createSensorsData(sensorsData) {
  return knex("sensorsData").insert(sensorsData);
}

function getAllSensorsData() {
  return knex("sensorsData").select("*");
}

function createTable(tableName) {
  knex.hasTable(tableName).then(function (exists) {
    if (!exists) {
      return knex.createTable(tableName, function (table) {
        table.increments();
        table.string("temperature");
        table.string("pressure");
        table.string("humidity");
        table.timestamps();
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
