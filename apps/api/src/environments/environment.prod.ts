import { v4 } from 'uuid';

const database = {
  user: process.env['DB_USER'] || 'root',
  password: process.env['DB_PASS'] || 'root',
  host: '127.0.0.1', // not used by gcp in favor of socketPath (see MikroORM config)
  port: 3306, // not used by gcp in favor of socketPath (see MikroORM config)
  name: 'database-name',
};

export const environment = {
  production: true,
  database,
  jwtSecret: v4(),
  jwtExpire: 1000 * 60 * 60 * 24 * 7,
};
