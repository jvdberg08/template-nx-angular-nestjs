const database = {
  user: 'root',
  password: 'root',
  host: '127.0.0.1',
  port: 3306,
  name: 'database-name',
};

export const environment = {
  production: true,
  database,
  jwtSecret: '123456789',
  jwtExpire: 1000 * 60 * 60 * 24 * 7,
};
