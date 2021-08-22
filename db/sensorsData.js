const knex = require("./knex");

function createSensorsData(car) {
    return knex("sensorsData").insert(car);
}

function getAllSensorsData() {
    return knex("sensorsData").select("*");
}

module.exports = {
    createSensorsData,
    getAllSensorsData
};
