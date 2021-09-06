const knex = require("knex");

const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "pmpDb.sqlite3"
    }
})

module.exports = connectKnex
