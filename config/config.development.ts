import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'mysql' as Dialect,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'nestjs',
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
  jwtPrivateKeyRefresh: 'jwtPrivateKeyRefresh',
};
