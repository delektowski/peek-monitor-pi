const knex = require("./knex");

function createSensorsData(sensorsData) {
    return knex("sensorsData").insert(sensorsData);
}

function getAllSensorsData() {
    return knex("sensorsData").select("*");
}

module.exports = {
    createSensorsData,
    getAllSensorsData
};
