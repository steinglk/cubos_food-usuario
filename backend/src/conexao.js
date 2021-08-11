const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '123456',
        database: 'app_food',
        port: 5432
    }
});

module.exports = knex;