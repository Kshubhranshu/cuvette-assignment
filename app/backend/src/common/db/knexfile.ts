import * as DotEnv from 'dotenv';
import knexSnakeCaseMapper from 'objection';
DotEnv.config();

/* in production env all the credentials will intialized from .env  */
export default {
  development: {
    client: 'postgresql',
    connection: {
      database: 'd2c694j63k4ib5',
      user: 'cnhlpdnkppjmti',
      password: 'b329b2151bc5166b39ac282000aa1634f6a3bfaab4f4d3ca2f8d3cc1a60785cc',
      port: 5432,
      host: 'ec2-52-45-179-101.compute-1.amazonaws.com',
      ssl: {
        rejectUnauthorized: false
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMapper
  }
};
