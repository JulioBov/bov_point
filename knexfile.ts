import { Knex } from 'knex';
import enviroments from './src/enviroments';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    connectionString: enviroments.CONNECTION_PG,
    // ssl: { rejectUnauthorized: false },
  },
  useNullAsDefault: true,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
};

export default knexConfig;
