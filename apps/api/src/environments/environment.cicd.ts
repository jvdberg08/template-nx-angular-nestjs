const database = {
  user: 'root',
  password: 'root',
  host: 'mysql.dev',
  port: 3306,
  name: 'cicd-database',
};

export const environment = {
  production: false,
  database,
  jwtSecret: '123456789',
  jwtExpire: 1000 * 60 * 60 * 24 * 7,
};
