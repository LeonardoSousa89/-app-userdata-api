/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
 production: {
    client: '',
    connection: {
      database: '',
      host:'',
      user:     '',
      password: '',
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
 },
 development: {
    client: 'postgresql',
    connection: {
      database: 'edata',
      user:     'postgres',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
 }
};
